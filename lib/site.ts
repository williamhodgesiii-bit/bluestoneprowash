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
  // Interim inbox during the rebrand; swap to a bluestoneprowash.com address later.
  email: "birminghamprowash@gmail.com",
  phoneDisplay: "(205) 547-1941",
  phoneE164: phone,
  phoneHref: `tel:${phone}`,
  smsHref: `sms:${phone}`,
  googleReviewsUrl: "https://www.google.com/search?q=birmingham+pro+wash",
  region: "Greater Birmingham, Alabama",
  established: 2022,
  hours: "Mon to Sat · 7am to 7pm",
  // Web3Forms public access key for the quote form — free, unlimited form→email.
  // This key is meant to live in client code (it only lets a submission be sent
  // to the inbox tied to it), so it's safe to commit. NOTE: this is a temporary
  // TEST key — submissions currently land in williamhodgesiii@gmail.com. Before
  // launch, swap in a key registered to birminghamprowash@gmail.com (the address
  // shown publicly on the site). Prefer setting NEXT_PUBLIC_WEB3FORMS_KEY in the
  // host; the literal fallback also works. While empty, the form gracefully opens
  // a prefilled email instead.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "60a8445f-9870-4f6d-a6bf-473ccdc93fec",
} as const;

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

export const serviceAreas: string[] = [
  "Birmingham",
  "Hoover",
  "Vestavia Hills",
  "Mountain Brook",
  "Homewood",
  "Pelham",
  "Helena",
  "Chelsea",
  "Alabaster",
  "Greystone",
  "Inverness",
  "Trussville",
  "Gardendale",
  "Calera",
];

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
