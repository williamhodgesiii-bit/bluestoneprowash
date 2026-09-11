// Web icon pipeline for Bluestone Pro Wash.
// Run: node scripts/make-icons.mjs
//
// The browser tab, iOS home screen and Android launcher all draw the icon on a
// surface we do not control (white tab strips, dark tab strips, black wallpaper).
// A transparent PNG of the blue mark disappears or reads as a dark smudge on
// half of them, so every generated icon here is the mark knocked out in WHITE on
// a solid brand-blue tile — one shape that holds up on any background.
//
// Source art is public/brand/logo.png (the stacked lockup). We crop to the mark
// above the wordmark, then derive coverage from the red channel: the mark's blue
// is ~#0061bc (R≈0) and everything else in the art is white (R=255), so
// alpha = 255 - red gives a clean, antialiasing-preserving mask of just the ink.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("public/brand/logo.png");
const APP = path.resolve("app");
const BRAND_DIR = path.resolve("public/brand");

// --color-brand-600 in app/globals.css — "the wrap blue", and the manifest theme.
const BRAND = { r: 5, g: 97, b: 187, alpha: 1 };

// Mark bounds inside logo.png (763x640), measured from the blue ink: the wordmark
// below it is black, so it is excluded by cropping at y=416.
const MARK = { left: 37, top: 0, width: 647, height: 416 };

// The source fills are a touch soft, so raw coverage tops out around 240-254
// instead of 255 and leaves a faint haze in the empty corners. Snapping those
// two tails to solid/clear gives crisp white ink on flat blue while leaving the
// real antialiasing ramp between them untouched.
const INK_FLOOR = 10;
const INK_CEIL = 240;

// Breathing room around the mark, as a fraction of the tile per side.
const PAD = 0.06;
// Android masks icons to arbitrary shapes and only guarantees the centre 80%
// circle. The mark's diagonal has to fit inside that circle, not just its box.
const MASKABLE_PAD = 0.17;

const log = (...a) => console.log("•", ...a);

/** The mark as white ink on transparency, at source resolution. */
async function whiteMark() {
  const { data, info } = await sharp(SRC)
    .extract(MARK)
    .flatten({ background: "#ffffff" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const span = INK_CEIL - INK_FLOOR;
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const coverage = 255 - data[i * channels]; // red channel -> ink coverage
    out[i * 4] = 255;
    out[i * 4 + 1] = 255;
    out[i * 4 + 2] = 255;
    out[i * 4 + 3] = Math.max(0, Math.min(255, Math.round(((coverage - INK_FLOOR) * 255) / span)));
  }
  log(`mark ${width}x${height} from ${path.basename(SRC)}`);
  return { raw: { width, height, channels: 4 }, buffer: out };
}

/** One square tile: white mark centred on the brand blue. */
async function tile(mark, size, pad = PAD) {
  const box = Math.max(1, Math.round(size * (1 - 2 * pad)));
  const art = await sharp(mark.buffer, { raw: mark.raw })
    .resize({ width: box, height: box, fit: "inside", kernel: "lanczos3" })
    .png()
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: BRAND } })
    .composite([{ input: art, gravity: "centre" }]);
}

/**
 * Pack RGBA tiles into a multi-size .ico. Each entry is a bottom-up 32-bit DIB
 * with the doubled height the ICO header expects, plus a zeroed AND mask (the
 * alpha channel carries transparency on every browser that still reads .ico).
 */
function ico(images) {
  const dibs = images.map(({ size, rgba }) => {
    const stride = size * 4;
    const xor = Buffer.alloc(stride * size);
    for (let y = 0; y < size; y++) {
      const src = (size - 1 - y) * stride; // DIB rows run bottom-up
      for (let x = 0; x < size; x++) {
        const s = src + x * 4;
        const d = y * stride + x * 4;
        xor[d] = rgba[s + 2]; // B
        xor[d + 1] = rgba[s + 1]; // G
        xor[d + 2] = rgba[s]; // R
        xor[d + 3] = rgba[s + 3]; // A
      }
    }
    const header = Buffer.alloc(40);
    header.writeUInt32LE(40, 0);
    header.writeInt32LE(size, 4);
    header.writeInt32LE(size * 2, 8); // XOR + AND masks stacked
    header.writeUInt16LE(1, 12); // planes
    header.writeUInt16LE(32, 14); // bpp
    header.writeUInt32LE(xor.length, 20);
    const and = Buffer.alloc((((size + 31) >> 5) << 2) * size); // 1bpp, 4-byte aligned rows
    return { size, body: Buffer.concat([header, xor, and]) };
  });

  const dir = Buffer.alloc(6 + dibs.length * 16);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2); // type: icon
  dir.writeUInt16LE(dibs.length, 4);
  let offset = dir.length;
  dibs.forEach((d, i) => {
    const e = 6 + i * 16;
    dir.writeUInt8(d.size >= 256 ? 0 : d.size, e);
    dir.writeUInt8(d.size >= 256 ? 0 : d.size, e + 1);
    dir.writeUInt8(0, e + 2); // palette colours
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // planes
    dir.writeUInt16LE(32, e + 6); // bpp
    dir.writeUInt32LE(d.body.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += d.body.length;
  });
  return Buffer.concat([dir, ...dibs.map((d) => d.body)]);
}

async function main() {
  await mkdir(BRAND_DIR, { recursive: true });
  const mark = await whiteMark();

  // Browser tab / rel=icon, and the iOS home screen (which masks its own corners
  // and needs an opaque square).
  await (await tile(mark, 512)).png().toFile(path.join(APP, "icon.png"));
  log("app/icon.png 512");
  await (await tile(mark, 180)).png().toFile(path.join(APP, "apple-icon.png"));
  log("app/apple-icon.png 180");

  // Legacy tab icon + Google's search result favicon.
  const sizes = [16, 32, 48, 64];
  const images = [];
  for (const size of sizes) {
    const rgba = await (await tile(mark, size)).ensureAlpha().raw().toBuffer();
    images.push({ size, rgba });
  }
  await writeFile(path.join(APP, "favicon.ico"), ico(images));
  log(`app/favicon.ico ${sizes.join("/")}`);

  // Installed-app icons referenced by app/manifest.ts.
  await (await tile(mark, 192)).png().toFile(path.join(BRAND_DIR, "app-icon-192.png"));
  await (await tile(mark, 512)).png().toFile(path.join(BRAND_DIR, "app-icon-512.png"));
  await (await tile(mark, 512, MASKABLE_PAD)).png().toFile(path.join(BRAND_DIR, "app-icon-maskable.png"));
  log("public/brand/app-icon-{192,512,maskable}.png");
}

await main();
