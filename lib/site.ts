/**
 * Single source of truth for Bluestone Pro Wash content.
 * Edit phone / email / areas / reviews here — everything updates site-wide.
 */

export const site = {
  name: "Bluestone Pro Wash",
  shortName: "Bluestone",
  tagline: "Birmingham's Pressure Washing & Exterior Cleaning Pros",
  description:
    "Professional pressure washing, soft washing, roof cleaning, window and gutter cleaning across Greater Birmingham. Locally owned, fully insured, satisfaction guaranteed.",
  // TODO(client): confirm public email + finalize domain before .com launch
  url: "https://bluestoneprowash.com",
  email: "info@bluestoneprowash.com",
  phoneDisplay: "(205) 547-1941",
  phoneHref: "tel:+12055471941",
  smsHref: "sms:+12055471941",
  region: "Greater Birmingham, Alabama",
  established: 2022,
  hours: "Mon–Sat · 7am – 7pm",
} as const;

// TODO(client): paste real profile URLs — empty entries are hidden automatically.
export const socials: { label: string; icon: string; href: string }[] = [
  { label: "Facebook", icon: "facebook", href: "" },
  { label: "Instagram", icon: "instagram", href: "" },
  { label: "Leave a Google review", icon: "google", href: "" },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Transformations", href: "#transformations" },
  { label: "Our Process", href: "#process" },
  { label: "Why Us", href: "#why" },
  { label: "Service Area", href: "#area" },
];

export type Service = {
  id: string;
  name: string;
  icon: string; // lucide icon name
  blurb: string;
  points: string[];
  surfaces: string;
  featured?: boolean;
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
  id: string;
  label: string;
  title: string;
  caption: string;
  before: string;
  after: string;
};

export const transformations: Transformation[] = [
  {
    id: "driveway",
    label: "Driveway",
    title: "Concrete Driveway Restoration",
    caption: "Years of embedded dirt, tire marks and organic staining — lifted in a single visit.",
    before: "/images/ba/driveway-before.jpg",
    after: "/images/ba/driveway-after.jpg",
  },
  {
    id: "roof",
    label: "Roof",
    title: "Soft-Wash Roof Cleaning",
    caption: "Black algae streaks safely removed without ever stepping on a brittle shingle.",
    before: "/images/ba/roof-before.jpg",
    after: "/images/ba/roof-after.jpg",
  },
  {
    id: "aerial",
    label: "Rooftop",
    title: "Full Roof Algae Treatment",
    caption: "An overhead look at a complete Gloeocapsa algae treatment, edge to edge.",
    before: "/images/ba/aerial-before.jpg",
    after: "/images/ba/aerial-after.jpg",
  },
  {
    id: "sunroom",
    label: "Glass",
    title: "Sunroom & Glass Detailing",
    caption: "Hard-water film and grime cleared for true spot-free clarity.",
    before: "/images/ba/sunroom-before.jpg",
    after: "/images/ba/sunroom-after.jpg",
  },
];

export type Step = { n: string; title: string; body: string; icon: string };

export const processSteps: Step[] = [
  {
    n: "01",
    title: "Reach Out",
    body: "Call, text, or send the quick form. Tell us what needs cleaning — that's it.",
    icon: "PhoneCall",
  },
  {
    n: "02",
    title: "Fast Free Quote",
    body: "We assess and send a clear, upfront price. No pressure, no hidden fees, no surprises.",
    icon: "ClipboardCheck",
  },
  {
    n: "03",
    title: "We Get To Work",
    body: "Our team shows up on time with pro-grade gear and the right method for every surface.",
    icon: "Truck",
  },
  {
    n: "04",
    title: "Spotless Results",
    body: "We walk it with you. If it's not right, we make it right — guaranteed.",
    icon: "Sparkles",
  },
];

export type Differentiator = { title: string; body: string; icon: string };

export const whyUs: Differentiator[] = [
  {
    title: "Locally Owned",
    body: "Born and raised in Birmingham. You're hiring neighbors who take real pride in this community.",
    icon: "MapPin",
  },
  {
    title: "Right Method, Every Surface",
    body: "High pressure where it belongs, gentle soft-wash where it counts. We never blast a roof.",
    icon: "ShieldCheck",
  },
  {
    title: "Fully Insured",
    body: "Comprehensive coverage on every job, so your property and our team are always protected.",
    icon: "FileCheck",
  },
  {
    title: "Satisfaction Guaranteed",
    body: "If a spot isn't right when we finish, we come back and fix it. Simple as that.",
    icon: "BadgeCheck",
  },
  {
    title: "On-Time & Tidy",
    body: "We respect your schedule and your landscaping — and we clean up before we leave.",
    icon: "Clock",
  },
  {
    title: "Upfront Pricing",
    body: "Clear quotes before we start. The number we say is the number you pay.",
    icon: "Tag",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  service: string;
};

/* TODO(client): swap for verified Google reviews. These reflect real review themes. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Our driveway and patio look brand new — I genuinely can't believe it's the same concrete. They even did our neighbor's after she saw the difference.",
    name: "Sarah M.",
    location: "Hoover",
    service: "Pressure Washing",
  },
  {
    quote:
      "The black streaks on our roof are completely gone and they never got on the roof or near the landscaping. Professional, careful, and on time.",
    name: "David R.",
    location: "Vestavia Hills",
    service: "Roof Washing",
  },
  {
    quote:
      "Every window dried perfectly clear — no streaks, no spots. Polite, hardworking crew. We've already booked them again for the spring.",
    name: "Jennifer L.",
    location: "Mountain Brook",
    service: "Window Cleaning",
  },
  {
    quote:
      "Quick quote, fair price, and the house siding looks years younger. This is how a local business should be run.",
    name: "Mark T.",
    location: "Pelham",
    service: "Soft Washing",
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
    a: "Pressure washing uses high-pressure water for hard surfaces like concrete and brick. Soft washing uses low pressure with specialized cleaning solutions to safely treat delicate surfaces like roofs and siding — killing mold and algae at the root without causing damage. We choose the right method for every surface.",
  },
  {
    q: "Will soft washing damage my roof or plants?",
    a: "No. Soft washing is the method shingle manufacturers actually recommend. We use low pressure and biodegradable solutions, pre-wet and rinse surrounding landscaping, and never walk on brittle shingles — protecting both your roof and your yard.",
  },
  {
    q: "How much does it cost?",
    a: "Every property is different, so we give clear, upfront quotes with no hidden fees. Most quotes are fast and free — just reach out with what you need cleaned and we'll take it from there.",
  },
  {
    q: "Do I need to be home?",
    a: "Usually not for exterior work, as long as we have access to the areas and an outdoor water spigot. We'll confirm the details when we schedule, and we'll let you know when we arrive and finish.",
  },
  {
    q: "How often should I have my home cleaned?",
    a: "For most Birmingham homes, an annual exterior soft wash keeps mold and algae in check, and driveways benefit from a wash every 1–2 years. Roofs typically need treatment every 2–4 years depending on tree cover and shade.",
  },
];

export const stats = [
  { value: 2022, label: "Locally owned since", suffix: "" },
  { value: 5, label: "Star-rated service", suffix: "★", decimals: 1, display: "5.0" },
  { value: 100, label: "Satisfaction guaranteed", suffix: "%" },
  { value: 5, label: "Exterior services", suffix: "" },
] as const;
