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
  googleReviewsUrl: "https://maps.app.goo.gl/HAa1yaTWTmxESdw29",
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
export const contentUpdated = "2026-10-13";

// Empty entries are hidden automatically (footer + schema sameAs).
// `icon` keys come from components/ui/SocialIcon.tsx, not the lucide registry.
export const socials: { label: string; icon: string; href: string }[] = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/BluestoneProWash" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/bluestoneprowash" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/bluestone-pro-wash-llc/" },
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

export type Faq = { q: string; a: string };

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
  // Service-specific questions, shown on the service's own page and emitted as
  // FAQPage structured data + in /llms.txt. Keep answers plain and specific.
  faqs: Faq[];
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
    faqs: [
      {
        q: "Will pressure washing damage my concrete?",
        a: "Not when it's done right. On driveways and sidewalks we use a surface cleaner, which spins the water in an even circle so you don't end up with the stripes and etched lines you get from holding a wand too close. Pavers, older brick, and softer stone get turned down to a lower pressure.",
      },
      {
        q: "Can you get oil stains and rust off my driveway?",
        a: "Most of the time we can make a big difference. Fresh oil drips and most rust spots come out well with the right pre-treatment. Stains that have soaked in for years may lighten instead of disappearing completely, and we'll tell you that before we start so there are no surprises.",
      },
      {
        q: "How long does it take?",
        a: "A typical two-car driveway takes one to two hours. Add the sidewalk, a patio, or a pool deck and most homes still get finished in a single visit.",
      },
      {
        q: "Will it hurt my grass or plants?",
        a: "No. On concrete we're mostly using water, and anything we use around the yard gets rinsed off. We also wet down nearby plants before we start and rinse them again when we're done.",
      },
      {
        q: "How often should I pressure wash my driveway?",
        a: "Every one to two years for most Birmingham homes. Driveways under big trees or on the shady side of the house turn green faster and may need it every year.",
      },
      {
        q: "Do you clean pavers and stamped concrete?",
        a: "Yes. We use lower pressure so we don't blow out the joint sand or wear down the finish. If the joints look low once everything's clean, we'll point it out so you know.",
      },
    ],
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
    faqs: [
      {
        q: "What is soft washing?",
        a: "It's how we clean the outside of a house. Instead of high pressure, we apply a cleaning solution at about the pressure of a garden hose, let it kill the mold, mildew, and algae, and then rinse it all off. Because the growth is actually killed and not just knocked loose, your siding stays clean a lot longer.",
      },
      {
        q: "Is it safe for vinyl, Hardie board, and stucco?",
        a: "Yes, that's what it's made for. High pressure can force water behind vinyl siding, chip paint off Hardie board, and crack stucco. A soft wash cleans all three without putting that kind of force on them.",
      },
      {
        q: "What's the green stuff on the side of my house?",
        a: "Almost always algae or mildew. Birmingham's humidity and all the shade from our trees give it the perfect place to grow, which is why it usually shows up first on the north side of a house where the sun hits least.",
      },
      {
        q: "Is it safe for my plants and pets?",
        a: "Yes. We wet down your plants before we start and rinse them again after. We just ask that pets stay inside until we're finished and everything's been rinsed.",
      },
      {
        q: "How long will my house stay clean?",
        a: "Most homes look good for a year or more. Houses with heavy shade or a lot of trees close by can start to show growth sooner, which is why most people book a soft wash once a year.",
      },
      {
        q: "Do I need to be home?",
        a: "Not usually. We just need the windows and doors closed and access to an outdoor water spigot. We'll let you know when we get there and when we're done.",
      },
    ],
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
    faqs: [
      {
        q: "What are the black streaks on my roof?",
        a: "It's a type of algae called Gloeocapsa magma. It feeds on the limestone filler in asphalt shingles and spreads across the roof over time. It's extremely common here because of our heat and humidity.",
      },
      {
        q: "Do you pressure wash roofs?",
        a: "Never. High pressure strips the protective granules off shingles, shortens the life of the roof, and can void the manufacturer's warranty. We soft wash roofs with low pressure and a cleaning solution that kills the algae instead of blasting it.",
      },
      {
        q: "Will the moss come off the same day?",
        a: "The black streaks usually clean up the same day. Thick moss is different. We kill it during the wash, and it dries out and loosens over the next few weeks until the rain washes it off.",
      },
      {
        q: "How long does a roof wash last?",
        a: "Usually two to four years. Roofs under heavy tree cover or in a lot of shade tend to be on the shorter end of that.",
      },
      {
        q: "Do you clean metal and tile roofs?",
        a: "Yes. We clean asphalt shingle, tile, and metal roofs, and we adjust the method to the material.",
      },
      {
        q: "Will you walk on my roof?",
        a: "Only when it's safe to. We don't walk on brittle or worn shingles, and on a lot of roofs we can do most of the work from a ladder or the ground.",
      },
    ],
  },
  {
    id: "window-cleaning",
    name: "Window Cleaning",
    icon: "PanelsTopLeft",
    blurb:
      "Streak-free, spot-free exterior glass using a purified water-fed pole system — every window dries crystal clear.",
    points: ["Exterior windows & glass doors", "Service plans available", "Spot-free pure water"],
    surfaces: "Windows · Glass doors · Sunrooms",
    image: {
      src: "/images/service-window-cleaning.jpg",
      alt: "Bluestone Pro Wash crew cleaning an arched window with a water-fed pole",
    },
    faqs: [
      {
        q: "What is a water-fed pole?",
        a: "It's a long pole with a brush on the end that sprays purified water. The water has had all the minerals filtered out, so there's nothing left behind to spot or streak when it dries. It also lets us clean second-story windows safely from the ground.",
      },
      {
        q: "Do you clean the inside of the windows?",
        a: "Not right now. We focus on the outside, since that's where the pollen, dirt, and hard water build up. The inside of most windows just doesn't get dirty the same way.",
      },
      {
        q: "Do you clean screens?",
        a: "We can. Screen cleaning is priced separately, so just let us know if you'd like it and we'll add it to your quote.",
      },
      {
        q: "Why do my windows streak when I clean them myself?",
        a: "Tap water has minerals in it, and most cleaners leave a little soap behind. When the glass dries, both of those show up as streaks and spots. Purified water doesn't leave anything behind.",
      },
      {
        q: "Can you remove hard water spots?",
        a: "Light spots and film usually come right off. Heavy mineral buildup that's etched into the glass may not come out all the way, and we'll be upfront about that before we start.",
      },
      {
        q: "How often should I have my windows cleaned?",
        a: "We recommend two to four times a year. Between pollen season, storms, and hard water, windows around here get dirty faster than most people expect.",
      },
      {
        q: "Do you offer window cleaning service plans?",
        a: "Yes. If you want your windows to stay clean all year, we can set you up on a service plan so you're not having to remember to call us. Ask when you get your quote and we'll put one together for your home.",
      },
    ],
  },
  {
    id: "gutter-cleaning",
    name: "Gutter Cleaning",
    icon: "Shovel",
    blurb:
      "Full debris removal plus an exterior gutter-face brightening so your drainage works and your fascia looks new again.",
    points: ["Debris flush & clear", "Downspout check", "Gutter-face whitening"],
    surfaces: "Gutters · Downspouts · Fascia",
    faqs: [
      {
        q: "What's included in a gutter cleaning?",
        a: "We clear the leaves and debris out of every gutter, flush the downspouts to make sure water runs through, and clean up the mess on the ground before we leave.",
      },
      {
        q: "How often should gutters be cleaned?",
        a: "Twice a year for most homes: once in late spring after the pollen and oak tassels come down, and once in late fall after the leaves drop. If you have a lot of pine trees close to the house, you may need it more often.",
      },
      {
        q: "What is gutter face brightening?",
        a: "It's cleaning the outside of the gutters. Over time they pick up black streaks people call \"tiger stripes\" that a regular wash won't take off. We clean the gutter faces by hand so they match the rest of the house again.",
      },
      {
        q: "How can I tell if my gutters are clogged?",
        a: "Water spilling over the edge during a rain is the most obvious sign. Others are gutters that sag or pull away from the house, stains on the siding underneath, and plants growing out of the gutter.",
      },
      {
        q: "What if my downspout is clogged underground?",
        a: "We'll flush it and let you know if it still won't drain. If the clog is in the underground pipe, we'll tell you what we found so you know what needs to happen next.",
      },
    ],
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
          "Cloudy, filmed-over sunroom glass brought back to crystal clarity.",
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
