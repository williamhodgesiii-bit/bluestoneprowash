import Image from "next/image";
import { Container } from "../ui/Container";
import { Icon, type IconName } from "../ui/Icon";
import { Reveal } from "../motion/Reveal";
import { site, story } from "@/lib/site";

const highlights: { icon: IconName; label: string; value: string }[] = [
  { icon: "MapPin", label: "Based in", value: "Greater Birmingham" },
  { icon: "Users", label: "Who shows up", value: "Anderson and the crew" },
  { icon: "BadgeCheck", label: "Our promise", value: "Happy or it's fixed, free" },
];

export function OurStory() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Photo + stamp */}
          <div className="lg:col-span-6">
            <Reveal className="relative">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lift">
                <Image
                  src="/images/team-trailer.jpg"
                  alt="The Bluestone Pro Wash crew in front of the company trailer in Birmingham"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
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
          <div className="lg:col-span-6">
            <span className="kicker text-brand-600">Who we are</span>
            <h2 className="mt-2 text-[clamp(1.5rem,3.6vw,2.5rem)] font-extrabold leading-[1.08] text-ink">
              The people who show up
            </h2>
            <div className="rule-blue mt-3" />
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink">{story.lead}</p>
            <p className="mt-3 leading-relaxed text-ink-soft">{story.body}</p>

            <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.label} className="rounded-xl border border-steel-200 bg-steel-50 p-3.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-brand-600 shadow-card">
                    <Icon name={h.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <dt className="mt-2.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{h.label}</dt>
                  <dd className="mt-0.5 text-sm font-bold leading-snug text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={site.phoneHref}
              className="mt-5 inline-flex items-center gap-2 text-lg font-bold text-brand-700 hover:text-brand-600"
            >
              <Icon name="Phone" className="h-5 w-5" /> Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
