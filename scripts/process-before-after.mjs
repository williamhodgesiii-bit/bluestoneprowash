// Before/after image pipeline for Bluestone Pro Wash.
//
// Takes the raw phone photos dropped in `before and after/` and turns each
// before|after pair into a matched set the drag slider can use: same EXIF-
// corrected orientation, the exact same dimensions, and the same centred crop
// so the two frames line up edge-to-edge as you drag the divider across.
//
// Run: node scripts/process-before-after.mjs
import sharp from "sharp";
import { mkdir, rm, readdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("before and after");
const BA = path.resolve("public/images/ba");

// Portrait 3:4 — every source is a portrait phone photo, so this frames them
// full with only a hair of centre-crop and keeps before/after identical.
const TARGET = [1080, 1440];

sharp.cache(false);
const log = (...a) => console.log("•", ...a);

// before file, after file, output base — ordered best-aligned first per category.
const pairs = [
  // Pressure washing
  ["pressure washing before 2.jpeg", "pressure washing after 2.jpeg", "driveway"],
  ["pressure washing before 1.jpeg", "pressure washing after 1.jpeg", "concrete"],
  // Soft washing
  ["soft washing one before.jpeg", "soft washing one after.jpeg", "siding"],
  ["soft washing two before.jpeg", "soft washing two after.jpeg", "fence"],
  // Window cleaning
  ["window cleaning before 2.jpeg", "window cleaning after 2.jpeg", "sunroom"],
  ["window cleaning before.jpeg", "window cleaning after.jpeg", "windows"],
  // Gutters
  ["gutters before.jpeg", "gutters after.jpeg", "gutters"],
];

const [tw, th] = TARGET;

// Simple centred cover-crop: the phone photos in a pair share the same framing,
// so an identical centre crop keeps the before/after halves lined up.
async function make(srcName, outName, extract) {
  let s = sharp(path.join(SRC, srcName)).rotate(); // honour EXIF orientation
  if (extract) s = s.extract(extract); // pre-crop to an explicit aligned window
  await s
    .resize(tw, th, { fit: "cover", position: "centre" })
    .sharpen({ sigma: 1 })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(BA, outName));
  log(outName);
}

// Wipe the previous before/after set so nothing stale lingers.
await mkdir(BA, { recursive: true });
for (const f of await readdir(BA)) {
  if (f.endsWith(".jpg")) await rm(path.join(BA, f));
}

for (const [before, after, base] of pairs) {
  await make(before, `${base}-before.jpg`);
  await make(after, `${base}-after.jpg`);
}

// Roof washing is a pair of free-flight drone frames (4608x2592) rather than
// matched phone photos: the drone drifted ~72px left and ~318px down between
// shots. These explicit 3:4 windows re-register the two frames so the dormers,
// garage, and courtyard stay continuous under the divider.
await make("roof washing before.jpeg", "roof-before.jpg", { left: 1494, top: 100, width: 1620, height: 2160 });
await make("Roof Washing after.jpeg", "roof-after.jpg", { left: 1422, top: 418, width: 1620, height: 2160 });

console.log("\n✅ before/after pipeline complete");
