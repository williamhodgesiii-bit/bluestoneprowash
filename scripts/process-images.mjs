// One-off image pipeline for Bluestone Pro Wash.
// Run: node scripts/process-images.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = process.env.SRC_DIR; // backup folder with original assets
const OUT = path.resolve("public/images");
const BRAND = path.resolve("public/brand");
const BA = path.join(OUT, "ba");

await mkdir(OUT, { recursive: true });
await mkdir(BRAND, { recursive: true });
await mkdir(BA, { recursive: true });

const f = (name) => path.join(SRC, name);
sharp.cache(false);

const log = (...a) => console.log("•", ...a);

// ---------- 1. LOGO: flood-fill outer background -> transparent ----------
async function transparentLogo() {
  const input = f("BBFE0608-89A8-4C03-9E3C-68A65CFF42D9.jpeg");
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info; // C=4
  const idx = (x, y) => (y * W + x) * C;

  // sample average corner color
  const corners = [[2, 2], [W - 3, 2], [2, H - 3], [W - 3, H - 3]];
  let cr = 0, cg = 0, cb = 0;
  for (const [x, y] of corners) { const i = idx(x, y); cr += data[i]; cg += data[i + 1]; cb += data[i + 2]; }
  cr /= 4; cg /= 4; cb /= 4;
  log(`logo bg corner color ~ rgb(${cr | 0},${cg | 0},${cb | 0}) size ${W}x${H}`);

  const TOL = 26; // tolerance from bg color
  const near = (i) => Math.abs(data[i] - cr) < TOL && Math.abs(data[i + 1] - cg) < TOL && Math.abs(data[i + 2] - cb) < TOL;

  // BFS flood fill from every border pixel
  const visited = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) { stack.push(x, 0); stack.push(x, H - 1); }
  for (let y = 0; y < H; y++) { stack.push(0, y); stack.push(W - 1, y); }
  while (stack.length) {
    const y = stack.pop(), x = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const p = y * W + x;
    if (visited[p]) continue;
    const i = p * C;
    if (!near(i)) continue;
    visited[p] = 1;
    data[i + 3] = 0; // transparent
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }
  // soft feather: pixels adjacent to a transparent pixel that are still fairly light -> partial alpha
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x, i = p * C;
      if (visited[p]) continue;
      const lightish = data[i] > 205 && data[i + 1] > 205 && data[i + 2] > 205;
      if (!lightish) continue;
      if (visited[p - 1] || visited[p + 1] || visited[p - W] || visited[p + W]) data[i + 3] = 150;
    }
  }

  const cut = sharp(Buffer.from(data), { raw: { width: W, height: H, channels: 4 } }).png();
  await cut.clone().trim({ threshold: 10 }).resize({ width: 900 }).toFile(path.join(BRAND, "logo.png"));
  // white wordmark-friendly: also export a generous padded square for favicon/OG source
  await sharp(input).resize(512, 512, { fit: "contain", background: "#ffffff" }).png().toFile(path.join(BRAND, "logo-square.png"));
  log("logo.png (transparent, trimmed) + logo-square.png");
}

// ---------- 2. Auto-rotate + compress truck photos ----------
async function photo(srcName, outName, { width = 1800, height, quality = 80, rotate = false } = {}) {
  let s = sharp(f(srcName));
  if (rotate) s = s.rotate(); // apply EXIF orientation
  const resizeOpts = height ? { width, height, fit: "cover", position: "attention" } : { width, withoutEnlargement: true };
  await s.resize(resizeOpts).jpeg({ quality, mozjpeg: true }).toFile(path.join(OUT, outName));
  log(outName);
}

// ---------- 3. Split before/after composites ----------
// axis: "v" => left|right, "h" => top|bottom. firstIsBefore => first half is the "before".
async function splitBA(srcName, base, axis, { firstIsBefore = true, target = [1200, 820] } = {}) {
  const { data, info } = await sharp(f(srcName)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const bright = (x, y) => { const i = (y * W + x) * C; return data[i] + data[i + 1] + data[i + 2]; };

  let dividerPos, half1, half2;
  if (axis === "v") {
    // find darkest column in middle band
    let best = Infinity, bestX = (W / 2) | 0;
    for (let x = (W * 0.35) | 0; x < (W * 0.65) | 0; x++) {
      let sum = 0; for (let y = 0; y < H; y += 4) sum += bright(x, y);
      if (sum < best) { best = sum; bestX = x; }
    }
    dividerPos = bestX;
    const pad = Math.round(W * 0.012);
    half1 = { left: 0, top: 0, width: Math.max(1, bestX - pad), height: H };
    half2 = { left: Math.min(W - 1, bestX + pad), top: 0, width: Math.max(1, W - bestX - pad), height: H };
  } else {
    let best = Infinity, bestY = (H / 2) | 0;
    for (let y = (H * 0.35) | 0; y < (H * 0.65) | 0; y++) {
      let sum = 0; for (let x = 0; x < W; x += 4) sum += bright(x, y);
      if (sum < best) { best = sum; bestY = y; }
    }
    dividerPos = bestY;
    const pad = Math.round(H * 0.012);
    half1 = { left: 0, top: 0, width: W, height: Math.max(1, bestY - pad) };
    half2 = { left: 0, top: Math.min(H - 1, bestY + pad), width: W, height: Math.max(1, H - bestY - pad) };
  }
  log(`${base}: ${axis} split @ ${dividerPos} (of ${axis === "v" ? W : H})`);

  const beforeReg = firstIsBefore ? half1 : half2;
  const afterReg = firstIsBefore ? half2 : half1;
  const [tw, th] = target;
  const make = async (region, suffix) => {
    await sharp(f(srcName)).extract(region)
      .resize(tw, th, { fit: "cover", position: "centre" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(BA, `${base}-${suffix}.jpg`));
  };
  await make(beforeReg, "before");
  await make(afterReg, "after");
}

// ===== RUN =====
await transparentLogo();

// hero + action photos
await photo("image-1782506331092.png", "hero-roof-softwash.jpg", { width: 2000, quality: 82 }); // dramatic roof spray
await photo("image-1782506330133.png", "action-surface-cleaner.jpg", { width: 1400, quality: 82 });
await photo("image-1782506332327.png", "action-window-door.jpg", { width: 1400, quality: 82 });
await photo("image-1782506338331.webp", "action-waterfed-pole.jpg", { width: 1400, quality: 82 });
await photo("image-1782506327411.webp", "team-trailer.jpg", { width: 2000, quality: 82 });
await photo("image-1782506329019.webp", "house-showcase.jpg", { width: 2000, quality: 82 });
await photo("IMG_6294.jpeg", "truck-1.jpg", { width: 1800, quality: 80, rotate: true });
await photo("IMG_6296.jpeg", "truck-2.jpg", { width: 1800, quality: 80, rotate: true });

// before / after composites
await splitBA("image-1782506334584.webp", "driveway", "v", { firstIsBefore: true });   // left dirty | right clean
await splitBA("image-1782506336391.webp", "roof", "h", { firstIsBefore: true });        // top dirty | bottom clean
await splitBA("image-1782506335484.webp", "sunroom", "h", { firstIsBefore: true });     // top dirty | bottom clean
await splitBA("image-1782506337364.webp", "aerial", "h", { firstIsBefore: true });      // top dirty | bottom clean

console.log("\n✅ image pipeline complete");
