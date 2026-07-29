import type { IconName } from "@/components/ui/Icon";

/**
 * Single source of truth for Bluestone Pro Wash content.
 * Edit phone / email / areas / reviews here — everything updates site-wide.
 */

// E.164 form of the business number — keep phoneDisplay below in sync.
const phone = "+12055471941";

export const site = {
  name: "Bluestone Pro Wash",
  shortName: "Bluestone",
  tagline: "Pressure Washing & Exterior Cleaning in Greater Birmingham",
  description:
    "Pressure washing, soft washing, roof cleaning, window and gutter cleaning across Greater Birmingham. Locally owned and careful with every surface.",
  // Production domain (registered via Cloudflare Registrar, served by Vercel).
  // This is the canonical, primary host: the apex bluestoneprowash.com 308-
  // redirects to www, so www is what we declare everywhere for SEO consistency.
  // NEXT_PUBLIC_SITE_URL can override this per-environment; see lib/url.ts.
  url: "https://www.bluestoneprowash.com",
  // Google Workspace mailbox on the business domain (MX → smtp.google.com).
  email: "info@bluestoneprowash.com",
  phoneDisplay: "(205) 547-1941",
  phoneE164: phone,
  phoneHref: `tel:${phone}`,
  smsHref: `sms:${phone}`,
  googleReviewsUrl: "https://www.google.com/search?q=birmingham+pro+wash",
  region: "Greater Birmingham, Alabama",
  // Approximate center of the service area (Birmingham) and how far we travel,
  // for LocalBusiness geo + service-area structured data. Coarse by design —
  // this is a mobile service that comes to you, not a walk-in storefront.
  geo: { latitude: 33.5186, longitude: -86.8104, serviceRadiusKm: 64 },
  established: 2022,
  hours: "Mon to Sat · 7am to 7pm",
  // Web3Forms public access key for the quote form — free, unlimited form→email.
  // This key is meant to live in client code (it only lets a submission be sent
  // to the inbox tied to it), so it is safe to commit — like the GA ID above.
  //
  // Web3Forms delivers to the address the key was REGISTERED to; the recipient
  // cannot be overridden from the payload. This key is registered to
  // info@bluestoneprowash.com, so that mailbox receives every lead. If you ever
  // rotate it, create the new key under that SAME address — otherwise leads land
  // somewhere else no matter what `email` above says. You can also override this
  // per-environment with NEXT_PUBLIC_WEB3FORMS_KEY in Vercel (no code change).
  //
  // A non-empty key here is also what takes the form live: while it is empty the
  // quote form frosts into its "coming soon" state (see QuoteForm.tsx).
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "60a8445f-9870-4f6d-a6bf-473ccdc93fec",
} as const;

/**
 * Date the public content last meaningfully changed (new services, fresh
 * before/after sets, rewritten copy). Feeds the sitemap's <lastmod>.
 *
 * Bump this whenever you edit the content in this file. Google only honors
 * <lastmod> when it's verifiably accurate, so we set a real date here instead of
 * wiring it to the build clock — a build-time "now" would claim every page
 * changed on every deploy and train search engines to ignore the signal.
 * Format: YYYY-MM-DD.
 */
export const contentUpdated = "2026-07-29";

// Empty entries are hidden automatically (footer + schema sameAs).
// `icon` keys come from components/ui/SocialIcon.tsx, not the lucide registry.
export const socials: { label: string; icon: string; href: string }[] = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/BirminghamProWash" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/bluestoneprowash" },
  // TODO(client): paste the Google Business Profile review link when live.
  { label: "Leave a Google review", icon: "google", href: "" },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  id: string;
  name: string;
  icon: IconName;
  blurb: string;
  points: string[];
  surfaces: string;
  featured?: boolean;
  // Optional crew-in-action photo shown on the service's own page.
  image?: { src: string; alt: string };
};

export const services: Service[] = [
  {
    id: "pressure-washing",
    name: "Pressure Washing",
    icon: "Droplets",
    blurb:
      "High-pressure deep cleaning that strips years of grime, oil and algae from hard surfaces — restoring concrete to like-new.",
    points: ["Driveways & sidewalks", "Patios & pool decks", "Brick & retaining walls"],
    surfaces: "Concrete · Pavers · Brick · Stone",
    featured: true,
  },
  {
    id: "soft-washing",
    name: "Soft Washing",
    icon: "Waves",
    blurb:
      "Low-pressure, solution-based cleaning that safely kills mold, mildew and algae at the root without damaging delicate surfaces.",
    points: ["House siding & stucco", "Vinyl, wood & Hardie", "Fences & outdoor structures"],
    surfaces: "Siding · Stucco · Painted wood",
    featured: true,
    image: {
      src: "/images/service-soft-washing.jpg",
      alt: "Bluestone Pro Wash crew soft washing a covered porch",
    },
  },
  {
    id: "roof-washing",
    name: "Roof Washing",
    icon: "Home",
    blurb:
      "Gentle soft-wash roof treatment that removes the black streaks (Gloeocapsa algae) and moss shingle manufacturers warn against.",
    points: ["Asphalt shingle safe", "Kills algae & moss", "Extends roof lifespan"],
    surfaces: "Shingle · Tile · Metal",
    featured: true,
  },
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    icon: "PanelsTopLeft",
    blurb:
      "Streak-free, spot-free glass using a purified water-fed pole system — every window dries crystal clear, inside and out.",
    points: ["Interior & exterior", "Screens & tracks", "Spot-free pure water"],
    surfaces: "Windows · Glass doors · Sunrooms",
    image: {
      src: "/images/service-window-cleaning.jpg",
      alt: "Bluestone Pro Wash crew cleaning an arched window with a water-fed pole",
    },
  },
  {
    id: "gutter-cleaning",
    name: "Gutter Cleaning",
    icon: "Shovel",
    blurb:
      "Full debris removal plus an exterior gutter-face brightening so your drainage works and your fascia looks new again.",
    points: ["Debris flush & clear", "Downspout check", "Gutter-face whitening"],
    surfaces: "Gutters · Downspouts · Fascia",
  },
];

export type Transformation = {
  title: string;
  caption: string;
  before: string;
  after: string;
};

export type TransformationCategory = {
  id: string;
  label: string;
  items: Transformation[];
};

/**
 * Before/after results, grouped by service so the tabs read as the real
 * categories. Each category holds one or more matched pairs; the section lets
 * you page through the pairs inside the active category. Order the items with
 * the strongest, best-aligned pair first — that's the one shown by default.
 * Image files come from `scripts/process-before-after.mjs`.
 */
export const transformationCategories: TransformationCategory[] = [
  {
    id: "pressure-washing",
    label: "Pressure Washing",
    items: [
      {
        title: "Sloped driveway restoration",
        caption:
          "A steep concrete drive stripped of algae, dirt, and tire staining from the garage all the way down.",
        before: "/images/ba/driveway-before.jpg",
        after: "/images/ba/driveway-after.jpg",
      },
      {
        title: "Concrete pad deep clean",
        caption:
          "Rust and years of organic staining pulled out of a wide concrete pad with a surface cleaner.",
        before: "/images/ba/concrete-before.jpg",
        after: "/images/ba/concrete-after.jpg",
      },
    ],
  },
  {
    id: "roof-washing",
    label: "Roof Washing",
    items: [
      {
        title: "Full roof soft wash",
        caption:
          "An aerial look at a complete roof treatment — black Gloeocapsa algae lifted and the shingles brightened edge to edge.",
        before: "/images/ba/roof-before.jpg",
        after: "/images/ba/roof-after.jpg",
      },
    ],
  },
  {
    id: "soft-washing",
    label: "Soft Washing",
    items: [
      {
        title: "Algae-stained siding",
        caption:
          "Green algae and mildew rinsed off delicate siding with a gentle, low-pressure soft wash.",
        before: "/images/ba/siding-before.jpg",
        after: "/images/ba/siding-after.jpg",
      },
      {
        title: "Fence and siding refresh",
        caption:
          "A weathered wood fence and the house behind it brought back to life, grime and gray washed away.",
        before: "/images/ba/fence-before.jpg",
        after: "/images/ba/fence-after.jpg",
      },
    ],
  },
  {
    id: "window-cleaning",
    label: "Window Cleaning",
    items: [
      {
        title: "Sunroom glass detailing",
        caption:
          "Cloudy, filmed-over sunroom glass brought back to crystal clarity, inside and out.",
        before: "/images/ba/sunroom-before.jpg",
        after: "/images/ba/sunroom-after.jpg",
      },
      {
        title: "Window and glass cleaning",
        caption:
          "Streaks, dust, and hard-water film cleared for spot-free, see-through panes.",
        before: "/images/ba/windows-before.jpg",
        after: "/images/ba/windows-after.jpg",
      },
    ],
  },
  {
    id: "gutter-cleaning",
    label: "Gutter Cleaning",
    items: [
      {
        title: "Gutter face brightening",
        caption:
          "Black streaks and grime scrubbed off the gutter face and fascia until the trim looks new again.",
        before: "/images/ba/gutters-before.jpg",
        after: "/images/ba/gutters-after.jpg",
      },
    ],
  },
];

export type Step = { n: string; title: string; body: string; icon: IconName };

export const processSteps: Step[] = [
  {
    n: "01",
    title: "Reach out",
    body: "Call, text, or send the quick form. Tell us what needs cleaning. That's it.",
    icon: "PhoneCall",
  },
  {
    n: "02",
    title: "Fast, free quote",
    body: "We assess and send a clear, upfront price. No pressure, no hidden fees, no surprises.",
    icon: "ClipboardCheck",
  },
  {
    n: "03",
    title: "We get to work",
    body: "Our team shows up on time with pro-grade gear and the right method for every surface.",
    icon: "Truck",
  },
  {
    n: "04",
    title: "Spotless results",
    body: "We walk it with you. If it's not right, we make it right. Guaranteed.",
    icon: "Sparkles",
  },
];

export type Differentiator = { title: string; body: string; icon: IconName };

export const whyUs: Differentiator[] = [
  {
    title: "Locally owned",
    body: "Born and raised in Birmingham. You're hiring neighbors who take real pride in this community.",
    icon: "MapPin",
  },
  {
    title: "Right method, every surface",
    body: "High pressure where it belongs, gentle soft-wash where it counts. We never blast a roof.",
    icon: "ShieldCheck",
  },
  {
    title: "We answer the phone",
    body: "Call or text and you reach the people doing the work, not a call center.",
    icon: "PhoneCall",
  },
  {
    title: "Satisfaction guaranteed",
    body: "If a spot isn't right when we finish, we come back and fix it. Simple as that.",
    icon: "BadgeCheck",
  },
  {
    title: "On time and tidy",
    body: "We respect your schedule and your landscaping, and we clean up before we leave.",
    icon: "Clock",
  },
  {
    title: "Upfront pricing",
    body: "Clear quotes before we start. The number we say is the number you pay.",
    icon: "Tag",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  tag?: string; // optional service label, only when the review names it
};

/* Real 5-star Google reviews. Add more in this same shape any time. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We have used this company several times to pressure wash our driveway, sidewalk, and patio with great results. Last summer we decided to use their roof cleaning service. Our roof is nearly 20 years old and it was looking pretty bad. The results were stunning. The roof looked almost new.",
    name: "Patty Sisk",
    tag: "Roof Cleaning",
  },
  {
    quote:
      "I had a wonderful experience with Anderson at Birmingham Pro Wash. His team pressure washed my driveway, sidewalks, and back patio. They were prompt and worked diligently. I will continue to use him for all my pressure washing needs and will refer him to clients in my real estate business.",
    name: "Audrey Brewer",
    tag: "Pressure Washing",
  },
  {
    quote:
      "This crew of young men did a great job. They were courteous and polite. They did a great job with helping me move furniture etc. out of the way and back in place. I would and will recommend them to others.",
    name: "Jack Hampton",
  },
  {
    quote:
      "I would highly recommend these young men! They pressured washed my driveway and pool deck! They did an amazing job! Thank you guys!!! Want to hire them for the roof next!",
    name: "Michele Hawkins",
    tag: "Pressure Washing",
  },
  {
    quote:
      "Was very pleased with my experience with Pro Wash. Everything was done in an excellent way. The owners were very pleasant and wanted to please. Would definitely use them again and would recommend them to my friends.",
    name: "Dorothy Lewis",
  },
];

export type Location = {
  slug: string; // /service-areas/<slug>
  name: string;
  county: string;
  region: string; // grouping label, e.g. "Over the Mountain"
  zips: string[];
  neighborhoods: string[];
  adjacent: string[]; // slugs of nearby towns, for cross-linking
  lat: number;
  lng: number;
  intro: string; // unique 2–3 sentence lead for the town's page
};

/**
 * Towns we serve, each with its own /service-areas/<slug> page. The data here is
 * real and specific per town (county, ZIPs, neighborhoods, nearby areas). That
 * genuine local detail is what keeps each page useful instead of a thin,
 * near-duplicate "doorway" page. Add a town by adding an entry — the nav
 * dropdown, footer, sitemap, and llms.txt all read from this list.
 *
 * NOTE: neighborhood/ZIP data is a best-knowledge draft; spot-check before you
 * lean on it in ads.
 */
export const locations: Location[] = [
  {
    slug: "birmingham",
    name: "Birmingham",
    county: "Jefferson County",
    region: "Jefferson County",
    zips: ["35203", "35205", "35209", "35222"],
    neighborhoods: ["Forest Park", "Highland Park", "Avondale", "Crestwood"],
    adjacent: ["homewood", "mountain-brook", "vestavia-hills", "gardendale"],
    lat: 33.5186,
    lng: -86.8104,
    intro:
      "Birmingham's older neighborhoods — the historic homes of Forest Park and Highland Park, the bungalows of Avondale and Crestwood — carry decades of grime, algae, and oxidation. We pressure-wash city driveways, sidewalks, and brick, and soft-wash siding and roofs across the Magic City without stripping original materials.",
  },
  {
    slug: "hoover",
    name: "Hoover",
    county: "Jefferson & Shelby County",
    region: "Over the Mountain",
    zips: ["35226", "35244", "35242", "35216"],
    neighborhoods: ["Bluff Park", "Green Valley", "Ross Bridge", "Trace Crossings"],
    adjacent: ["vestavia-hills", "homewood", "pelham", "birmingham"],
    lat: 33.4054,
    lng: -86.8114,
    intro:
      "Hoover's shaded Over-the-Mountain lots and its mix of brick, Hardie, and vinyl homes green up fast in Alabama humidity. We soft-wash roofs and siding from Bluff Park to Ross Bridge and Trace Crossings, and pressure-wash the long, sloped driveways these hillside properties are known for.",
  },
  {
    slug: "vestavia-hills",
    name: "Vestavia Hills",
    county: "Jefferson County",
    region: "Over the Mountain",
    zips: ["35216", "35243", "35242"],
    neighborhoods: ["Cahaba Heights", "Liberty Park", "Rocky Ridge"],
    adjacent: ["mountain-brook", "homewood", "hoover", "birmingham"],
    lat: 33.4488,
    lng: -86.7877,
    intro:
      "Vestavia Hills sits under heavy tree cover on Shades Mountain, so roofs and north-facing siding pick up black streaking and moss quickly. We soft-wash shingles and exterior walls across Cahaba Heights and Rocky Ridge, and brighten the concrete drives and pool decks these established homes are built around.",
  },
  {
    slug: "mountain-brook",
    name: "Mountain Brook",
    county: "Jefferson County",
    region: "Over the Mountain",
    zips: ["35223", "35213", "35253"],
    neighborhoods: ["Crestline", "English Village", "Mountain Brook Village", "Cherokee Bend"],
    adjacent: ["homewood", "vestavia-hills", "birmingham"],
    lat: 33.5007,
    lng: -86.7522,
    intro:
      "Mountain Brook's brick Tudors and stone homes under a dense canopy are exactly the surfaces that need a gentle touch. We soft-wash roofs, brick, and painted trim across Crestline, English Village, and Cherokee Bend — low pressure only — and carefully clean stone and aggregate walkways.",
  },
  {
    slug: "homewood",
    name: "Homewood",
    county: "Jefferson County",
    region: "Over the Mountain",
    zips: ["35209", "35229"],
    neighborhoods: ["Edgewood", "West Homewood", "Hollywood"],
    adjacent: ["mountain-brook", "vestavia-hills", "birmingham"],
    lat: 33.4718,
    lng: -86.8003,
    intro:
      "Homewood's close-set bungalows in Edgewood and Hollywood share driveways, fences, and siding that show mildew fast in the shade. We soft-wash siding and roofs and pressure-wash the narrow drives and sidewalks that define these walkable Over-the-Mountain streets.",
  },
  {
    slug: "pelham",
    name: "Pelham",
    county: "Shelby County",
    region: "Shelby County",
    zips: ["35124"],
    neighborhoods: ["Ballantrae", "Chandalar", "Oak Mountain"],
    adjacent: ["hoover", "helena", "alabaster"],
    lat: 33.2857,
    lng: -86.81,
    intro:
      "Pelham homes backing up to Oak Mountain and the Cahaba get plenty of shade, pollen, and organic staining. We soft-wash siding and roofs in Ballantrae and Chandalar and pressure-wash driveways, patios, and pool decks across this Shelby County city.",
  },
  {
    slug: "helena",
    name: "Helena",
    county: "Shelby County",
    region: "Shelby County",
    zips: ["35080"],
    neighborhoods: ["Old Town Helena", "Hillsboro", "Ballantrae"],
    adjacent: ["pelham", "alabaster", "hoover"],
    lat: 33.2887,
    lng: -86.8436,
    intro:
      "Helena's newer subdivisions and its historic Old Town sit along Buck Creek, where humidity keeps siding and roofs prone to green algae. We soft-wash homes in Hillsboro and Ballantrae and pressure-wash the wide driveways and sidewalks common in this growing Shelby County city.",
  },
  {
    slug: "chelsea",
    name: "Chelsea",
    county: "Shelby County",
    region: "Highway 280 · Shelby",
    zips: ["35043"],
    neighborhoods: ["Chelsea Park", "Foothills"],
    adjacent: ["greystone", "inverness", "hoover"],
    lat: 33.3395,
    lng: -86.6383,
    intro:
      "Chelsea's larger lots and newer construction along Highway 280 mean big roofs, long driveways, and plenty of Hardie and brick to keep clean. We soft-wash roofs and siding in Chelsea Park and the Foothills and pressure-wash the expansive concrete these properties are known for.",
  },
  {
    slug: "alabaster",
    name: "Alabaster",
    county: "Shelby County",
    region: "Shelby County",
    zips: ["35007", "35114"],
    neighborhoods: ["Kentwood", "Weatherly", "Meadowbrook"],
    adjacent: ["pelham", "helena", "calera"],
    lat: 33.2443,
    lng: -86.8164,
    intro:
      "Alabaster's established neighborhoods like Kentwood and Weatherly and its newer builds all face the same Alabama algae and mildew. We soft-wash siding and roofs and pressure-wash driveways, walkways, and patios across this Shelby County city.",
  },
  {
    slug: "greystone",
    name: "Greystone",
    county: "Shelby County",
    region: "Highway 280 · Shelby",
    zips: ["35242"],
    neighborhoods: ["Greystone Legacy", "Greystone Farms"],
    adjacent: ["inverness", "hoover", "chelsea"],
    lat: 33.4176,
    lng: -86.6961,
    intro:
      "The Greystone community off Highway 280 is full of large custom homes with big roofs, stone, and stucco that call for a careful, low-pressure wash. We soft-wash roofs and delicate exteriors across Greystone Legacy and Greystone Farms and brighten the long drives and aggregate walkways these estates feature.",
  },
  {
    slug: "inverness",
    name: "Inverness",
    county: "Shelby County",
    region: "Highway 280 · Shelby",
    zips: ["35242", "35243"],
    neighborhoods: ["Inverness", "Lake Heather"],
    adjacent: ["greystone", "hoover", "vestavia-hills"],
    lat: 33.4176,
    lng: -86.7139,
    intro:
      "The Inverness area along US-280 mixes lakeside homes and wooded lots where roofs and siding streak with algae under heavy shade. We soft-wash shingles and exteriors around Lake Heather and pressure-wash the driveways and patios common throughout this 280-corridor community.",
  },
  {
    slug: "trussville",
    name: "Trussville",
    county: "Jefferson & St. Clair County",
    region: "North Jefferson",
    zips: ["35173", "35235"],
    neighborhoods: ["Cahaba Project", "Trussville Springs"],
    adjacent: ["birmingham", "gardendale"],
    lat: 33.6198,
    lng: -86.6088,
    intro:
      "Trussville's historic Cahaba Project homes and the newer builds in Trussville Springs weather the same North Jefferson humidity and pollen. We soft-wash roofs and siding and pressure-wash the driveways, sidewalks, and patios that keep this Cahaba River community looking sharp.",
  },
  {
    slug: "gardendale",
    name: "Gardendale",
    county: "Jefferson County",
    region: "North Jefferson",
    zips: ["35071", "35073"],
    neighborhoods: ["Mount Olive", "Fieldstown"],
    adjacent: ["birmingham", "trussville"],
    lat: 33.6598,
    lng: -86.8114,
    intro:
      "Gardendale's brick ranches and newer homes north of Birmingham collect the usual algae, mildew, and driveway staining over time. We soft-wash siding and roofs around Mount Olive and Fieldstown and pressure-wash concrete drives, walkways, and patios throughout this North Jefferson city.",
  },
  {
    slug: "calera",
    name: "Calera",
    county: "Shelby County",
    region: "Shelby County",
    zips: ["35040"],
    neighborhoods: ["Camden Cove", "Timberline"],
    adjacent: ["alabaster"],
    lat: 33.1026,
    lng: -86.7536,
    intro:
      "Calera's fast-growing subdivisions like Camden Cove and Timberline are full of new Hardie and vinyl homes that green up quickly in the Shelby County humidity. We soft-wash siding and roofs and pressure-wash the fresh concrete driveways and sidewalks these new-construction neighborhoods are built on.",
  },
];

// Names only — the shape every existing consumer (footer, schema areaServed,
// service-page copy, llms.txt, FAQ) already expects. Derived so it never drifts.
export const serviceAreas: string[] = locations.map((l) => l.name);

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What's the difference between pressure washing and soft washing?",
    a: "Pressure washing uses high-pressure water for hard surfaces like concrete and brick. Soft washing uses low pressure with specialized cleaning solutions to safely treat delicate surfaces like roofs and siding, killing mold and algae at the root without causing damage. We choose the right method for every surface.",
  },
  {
    q: "Will soft washing damage my roof or plants?",
    a: "No. Soft washing is the method shingle manufacturers actually recommend. We use low pressure and biodegradable solutions, pre-wet and rinse surrounding landscaping, and never walk on brittle shingles, so we protect both your roof and your yard.",
  },
  {
    q: "How much does it cost?",
    a: "Every property is different, so we give clear, upfront quotes with no hidden fees. Most quotes are fast and free. Just reach out with what you need cleaned and we'll take it from there.",
  },
  {
    q: "Do I need to be home?",
    a: "Usually not for exterior work, as long as we have access to the areas and an outdoor water spigot. We'll confirm the details when we schedule, and we'll let you know when we arrive and finish.",
  },
  {
    q: "How often should I have my home cleaned?",
    a: "For most Birmingham homes, an annual exterior soft wash keeps mold and algae in check, and driveways benefit from a wash every 1 to 2 years. Roofs typically need treatment every 2 to 4 years depending on tree cover and shade.",
  },
  {
    q: "What areas around Birmingham do you serve?",
    a: "We're based in Birmingham and cover the Greater Birmingham metro — including Hoover, Vestavia Hills, Mountain Brook, Homewood, Pelham, Helena, Chelsea, Alabaster, Greystone, Inverness, Trussville, Gardendale, and Calera. If you're nearby and don't see your town listed, just ask.",
  },
  {
    q: "How fast can I get a quote?",
    a: "Most quotes are same-day. Call or text us, or send the quick form on our contact page, and we'll reply with a clear, upfront price — no obligation.",
  },
  {
    q: "Are you locally owned?",
    a: "Yes. Bluestone Pro Wash is locally owned and operated in Birmingham and has been running since 2022. The people who answer the phone are the same crew who show up and do the work.",
  },
];

/* Plain-spoken promises for the trust strip — no animated counters. */
export const trustPoints: { label: string; icon: IconName }[] = [
  { label: "Locally owned in Birmingham", icon: "MapPin" },
  { label: "Satisfaction guaranteed", icon: "BadgeCheck" },
  { label: "Free, no-pressure quotes", icon: "Tag" },
  { label: "The right wash for every surface", icon: "Droplets" },
];

/* A short, human story we reuse on the home + about pages. */
export const story = {
  lead: "Bluestone Pro Wash started in 2022 as a one-man operation. Today it's a small crew of local college students — three at Auburn, one at Troy, all studying accounting and finance — owned and run by Anderson O'Neal.",
  body: "We grew up here and graduated from Oak Mountain High School, so we take pride in serving the community we call home. A few years and a lot of jobs in, there's not much we haven't run into — and people like working with a team that's young, hardworking, and easy to reach, while still delivering professional results every time.",
};
