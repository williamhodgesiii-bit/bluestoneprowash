# Bluestone Pro Wash

Marketing website for **Bluestone Pro Wash** — pressure washing & exterior cleaning in Greater Birmingham, Alabama.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**. Fully static, image-optimized, SEO-ready, and tuned for deployment on Vercel.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

---

## Editing content (no code required)

Almost everything lives in **`lib/site.ts`** — one file:

| What | Where in `lib/site.ts` |
| --- | --- |
| Phone, email, hours, region, URL | `site` |
| Social profile links | `socials` (leave blank to hide an icon) |
| Services + descriptions | `services` |
| Before/after transformations | `transformations` |
| How-it-works steps | `processSteps` |
| "Why us" differentiators | `whyUs` |
| Reviews | `testimonials` |
| Service-area towns | `serviceAreas` |
| FAQs | `faqs` |

> **Reviews:** the testimonials are written from real review themes as placeholders.
> Replace them with verified Google reviews before launch. For the same reason, the
> structured-data block in `app/layout.tsx` intentionally ships **without** a star rating —
> add `aggregateRating` only once it reflects real, verifiable numbers.

---

## The quote form

The form in the "Get Your Free Quote" section works with **zero backend** out of the box: if no
endpoint is configured it opens the visitor's email app with the details pre-filled.

To collect submissions automatically, create a free [Formspree](https://formspree.io) form (or any
endpoint that accepts a JSON `POST`) and set an environment variable:

```bash
NEXT_PUBLIC_QUOTE_ENDPOINT="https://formspree.io/f/xxxxxxx"
```

---

## Images

Optimized assets live in `public/images` and `public/brand`. They were generated from the originals
with **`scripts/process-images.mjs`** (logo background removed via flood-fill, before/after composites
split into aligned pairs, photos auto-rotated and compressed).

> **Re-shoot note:** `public/images/truck-*.jpg` and `team-trailer.jpg` still show the **old
> "Birmingham Pro Wash"** branding, so they are **not used on the live site**. Swap in
> re-branded truck/team photos after the wrap is updated, then reference them in
> `components/sections/Gallery.tsx`.

To regenerate from a folder of source images:

```bash
SRC_DIR="/path/to/originals" node scripts/process-images.mjs
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project → Import** the repo. Framework preset auto-detects **Next.js** — no config needed.
3. (Optional) set environment variables:
   - `NEXT_PUBLIC_SITE_URL` — your final domain, e.g. `https://bluestoneprowash.com` (used for canonical URLs, sitemap, and social share images).
   - `NEXT_PUBLIC_QUOTE_ENDPOINT` — form submission endpoint (see above).
4. Deploy.

Until `NEXT_PUBLIC_SITE_URL` is set, metadata falls back to the live Vercel URL automatically, so
previews share correctly.

### Switching to the `.com` later

Add the custom domain in **Vercel → Project → Settings → Domains**, then set
`NEXT_PUBLIC_SITE_URL` to that domain and redeploy. Nothing else needs to change.

---

## Project structure

```
app/                 layout, page, globals.css, sitemap, robots, favicons
components/
  sections/          Header, Hero, Services, Transformations, … Footer
  ui/                Button, Container, Icon, Brandmark, CountUp, …
  motion/            Reveal / Stagger animation primitives
  BeforeAfter.tsx    draggable before/after slider
lib/                 site.ts (content), url.ts, utils.ts
public/              brand assets, optimized images, og.png
scripts/             image pipeline
```
