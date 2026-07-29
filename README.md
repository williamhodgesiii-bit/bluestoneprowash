# Bluestone Pro Wash

Marketing website for **Bluestone Pro Wash** — pressure washing & exterior cleaning in Greater Birmingham, Alabama.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion**. Fully static, image-optimized, SEO-ready, and tuned for deployment on Vercel.

Multi-page layout so visitors aren't stuck scrolling one endless homepage:

| Route | What's there |
| --- | --- |
| `/` | Short, quote-forward home: hero, services teaser, before/after slider, reviews, service-area ticker |
| `/services` | The five services in detail, how-it-works steps, and FAQs |
| `/work` | Draggable before/after slider + recent-work gallery |
| `/about` | The local-crew story, why-us, and service area |
| `/contact` | The free-quote form + call/text/email |

The colors come straight off the logo and truck wrap — cobalt blue, charcoal, heather gray, white. No neon, gradients, or stock "tech" textures.

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

> **Reviews:** the testimonials are real five-star Google reviews. The structured-data
> block in `app/layout.tsx` derives its `aggregateRating` and `review` entries from this
> same list, so keep it in sync with the live Google profile when adding or removing
> reviews.

---

## The quote form

The form in the "Get Your Free Quote" section posts to [Web3Forms](https://web3forms.com) —
free, unlimited, and no backend to run.

**The form is live.** Its access key — registered to `info@bluestoneprowash.com` — is
committed as the default in `lib/site.ts`, so submissions email that mailbox in production
with no extra setup. The form frosts into a "coming soon" state (phone + `info@` shown in
its place) only when the key is empty; it switches itself on the moment a key exists, with
no code change to remember.

To rotate the key or point a deployment at a different inbox:

1. Go to [web3forms.com](https://web3forms.com) and create an access key **using
   `info@bluestoneprowash.com`**. The key is emailed to that address.
2. Either replace the default in `lib/site.ts`, or set it in **Vercel → Project → Settings →
   Environment Variables** (Production) to override without a code change:

   ```bash
   NEXT_PUBLIC_WEB3FORMS_KEY="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
   ```
3. Redeploy (`NEXT_PUBLIC_*` values are baked in at build time).

> ⚠️ **Web3Forms delivers to whichever address the key was registered to**, and that
> recipient cannot be overridden from the form payload. Changing `site.email` alone does
> **not** redirect submissions — the key itself has to belong to the destination inbox.

### Keeping leads out of spam

Web3Forms sends each lead from **`noreply@web3forms.com`**, not from our own domain. That
matters, because mail arriving at `info@bluestoneprowash.com` that *looks* like it came
from Bluestone Pro Wash but was sent by an outside server is precisely the pattern Google
Workspace treats as domain spoofing — early test submissions were filed as spam for that
reason.

Two halves keep the inbox clean:

**1. The payload (already done, in `QuoteForm.tsx`).** Nothing in the email claims to be
the business. `from_name` and `replyto` are both the customer who filled in the form, so
the From and Reply-To headers agree, and the subject is plain ASCII (`Quote request: Jane
Smith - Roof Cleaning`) rather than sales phrasing with typographic dashes. Keep it that
way — setting `from_name` back to a variant of "Bluestone Pro Wash" re-creates the spoof
signal and re-buries the leads.

**2. The mailbox (one-time, and worth doing).** Filters beat heuristics, so tell Google
that this sender is wanted:

- In Gmail for `info@bluestoneprowash.com`: **Settings → Filters and Blocked Addresses →
  Create a new filter**, `From: noreply@web3forms.com`, then tick **Never send it to
  Spam** (and **Always mark it as important** / apply a `Leads` label if useful).
- Google Workspace admins can do the same account-wide under **Admin console → Apps →
  Google Workspace → Gmail → Spam, Phishing and Malware → Email allowlist / Spam
  bypass**, adding `noreply@web3forms.com`.
- If a lead has already landed in spam, open it and hit **Not spam** — that trains the
  mailbox too.

After a code change here, submit one live test and confirm it arrives in the inbox rather
than spam before considering the form done.

---

## Analytics

Google Analytics 4 is wired up with Next.js's official
[`@next/third-parties`](https://nextjs.org/docs/app/guides/third-party-libraries#google-analytics)
integration (`components/analytics/Analytics.tsx`, rendered from `app/layout.tsx`).
It loads `gtag.js` efficiently and auto-tracks page views across client-side
navigations — no extra analytics library needed.

The live property's Measurement ID (`G-RFR5MEWBSX`) is committed as the default,
so tracking works on the production site with no extra setup. It runs **only on
the production deployment** — `npm run dev` and Vercel Preview deploys never send
hits, so the GA property stays clean.

### Pointing at a different GA property (optional)

The ID is read from `NEXT_PUBLIC_GA_MEASUREMENT_ID` first and only falls back to
the committed default. To send data to a different property, set that variable in
**Vercel → Project → Settings → Environment Variables** (Production) and redeploy
(`NEXT_PUBLIC_*` values are baked in at build time).

Preview the tag locally with a production build:

```bash
npm run build && npm run start   # http://localhost:3000 — view source for gtag/js
```

### Verify it's live

After deploying, open **[GA4 → Reports → Realtime](https://analytics.google.com)**
and load `https://www.bluestoneprowash.com` in another tab — you should appear as
an active user within a few seconds. Or check the page source for a
`googletagmanager.com/gtag/js?id=G-RFR5MEWBSX` script tag.

See `.env.example` for the full list of environment variables the site reads.

---

## Images

Optimized assets live in `public/images` and `public/brand`. They were generated from the originals
with **`scripts/process-images.mjs`** (logo background removed via flood-fill, before/after composites
split into aligned pairs, photos auto-rotated and compressed).

> **Re-shoot note:** `public/images/truck-1.jpg` and `truck-2.jpg` still show the **old
> "Birmingham Pro Wash"** branding, so they are **not used on the live site**. Swap in
> re-branded truck photos after the wrap is updated, then reference them in
> `components/sections/Gallery.tsx`. (`team-trailer.jpg` is already used on the About
> page — swap it there too once a re-branded crew photo exists.)

To regenerate from a folder of source images:

```bash
SRC_DIR="/path/to/originals" node scripts/process-images.mjs
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project → Import** the repo. Framework preset auto-detects **Next.js** — no config needed.
3. (Optional) set environment variables:
   - `NEXT_PUBLIC_SITE_URL` — the production domain, `https://bluestoneprowash.com` (used for canonical URLs, sitemap, and social share images). If unset, the site falls back to the same domain hard-coded in `lib/site.ts`, so SEO output is correct either way.
   - `NEXT_PUBLIC_WEB3FORMS_KEY` — quote form access key (see [The quote form](#the-quote-form)).
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4 Measurement ID (see [Analytics](#analytics) below).
4. Deploy.

## Custom domain: bluestoneprowash.com

The domain is registered with **Cloudflare Registrar** and served by **Vercel**.
All SEO output (canonicals, sitemap, robots, Open Graph, JSON-LD) already points at
`https://bluestoneprowash.com` via `lib/site.ts` → `lib/url.ts`.

### One-time DNS setup

1. **Vercel** → Project → **Settings → Domains** → add `bluestoneprowash.com` **and**
   `www.bluestoneprowash.com`. `www` is the primary; Vercel 308-redirects the apex
   `bluestoneprowash.com` → `www` automatically (this matches the canonical host in
   `lib/site.ts`). Vercel will display the exact DNS records it wants — use those
   values if they differ from the typical ones below.
2. **Cloudflare** → dash.cloudflare.com → `bluestoneprowash.com` → **DNS → Records**:

   | Type | Name | Content | Proxy status |
   | --- | --- | --- | --- |
   | A | `@` | `76.76.21.21` | **DNS only** (gray cloud) |
   | CNAME | `www` | *(use the exact per-project target Vercel shows, e.g. `xxxx.vercel-dns-0NN.com`)* | **DNS only** (gray cloud) |

   > Vercel now issues a unique per-project CNAME target (shown in the Domains
   > screen) instead of the generic `cname.vercel-dns.com`; the legacy value and
   > apex IP `76.76.21.21` still work. Copy whatever Vercel displays.

   > ⚠️ **Proxy status must be "DNS only" (gray cloud), not "Proxied" (orange).**
   > Proxying through Cloudflare in front of Vercel causes SSL errors / redirect
   > loops and blocks Vercel from issuing its certificate. Delete any conflicting
   > A/AAAA/CNAME records Cloudflare auto-created for `@` or `www`.
3. Back in Vercel's Domains screen, wait for both domains to show **Valid
   Configuration** (usually minutes; propagation can take up to an hour). Vercel
   provisions the SSL certificate automatically.
4. Verify: `https://www.bluestoneprowash.com` loads, and `https://bluestoneprowash.com`
   redirects to it.

---

## Project structure

```
app/                 layout + globals.css + sitemap/robots/favicons
  page.tsx           home
  services/          /services
  work/              /work
  about/             /about
  contact/           /contact
components/
  sections/          Header, Hero, Services, Transformations, … Footer
  ui/                Button, Container, Icon, Brandmark, PageHero, …
  motion/            Reveal / Stagger animation primitives
  BeforeAfter.tsx    draggable before/after slider
lib/                 site.ts (content), url.ts, utils.ts
public/              brand assets, optimized images, og.png
scripts/             image pipeline
```
