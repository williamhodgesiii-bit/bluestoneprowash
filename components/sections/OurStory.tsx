import Image from "next/image";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal } from "../motion/Reveal";
import { site, story } from "@/lib/site";

const highlights = [
  { icon: "MapPin", label: "Born and raised", value: "Greater Birmingham" },
  { icon: "Users", label: "Who shows up", value: "The owners, not a crew of strangers" },
  { icon: "ShieldCheck", label: "Peace of mind", value: "Fully insured, every job" },
];

export function OurStory() {
  return (
    <section className="cv bg-white py-10 sm:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Photo + stamp */}
          <div className="lg:col-span-5">
            <Reveal className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift">
                <Image
                  src="/images/action-waterfed-pole.jpg"
                  alt="A Bluestone Pro Wash technician cleaning second-story windows with a water-fed pole"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="stamp absolute -bottom-4 -right-3 rotate-[-4deg] bg-white px-4 py-2 text-center text-brand-700 shadow-card sm:-right-5">
                <div className="text-lg leading-none">EST. 2022</div>
                <div className="mt-1 text-[0.6rem] tracking-[0.2em] text-ink-soft">BIRMINGHAM, AL</div>
              </div>
            </Reveal>
          </div>

          {/* Story */}
          <div className="lg:col-span-7">
            <span className="kicker text-brand-600">Our story</span>
            <h2 className="mt-3 text-[clamp(1.75rem,3.6vw,2.7rem)] font-extrabold leading-[1.06] text-ink">
              A local crew, not a call center
            </h2>
            <div className="rule-blue mt-4" />
            <p className="mt-6 text-[1.15rem] font-semibold leading-relaxed text-ink">{story.lead}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">{story.body}</p>

            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.label} className="rounded-xl border border-steel-200 bg-steel-50 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-brand-600 shadow-card">
                    <Icon name={h.icon} className="h-5 w-5" />
                  </span>
                  <dt className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">{h.label}</dt>
                  <dd className="mt-0.5 text-sm font-bold leading-snug text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={site.phoneHref}
              className="mt-8 inline-flex items-center gap-2 text-lg font-bold text-brand-700 hover:text-brand-600"
            >
              <Icon name="Phone" className="h-5 w-5" /> Talk to us — {site.phoneDisplay}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
