import Image from "next/image";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal } from "../motion/Reveal";
import { site } from "@/lib/site";

const chips = ["Fully insured", "Free quotes", "Locally owned", "Soft-wash safe"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-steel-50">
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* Message */}
        <div className="lg:col-span-6">
          <Reveal>
            <span className="kicker text-brand-600">Pressure &amp; soft washing · Birmingham, AL</span>
            <h1 className="mt-4 text-[clamp(2.5rem,5.4vw,4rem)] font-extrabold leading-[1.0] tracking-[-0.02em] text-ink">
              Make it look <span className="marker">new</span> again.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Driveways, roofs, siding, windows, and gutters — washed the right way by a local crew
              that shows up on time, picks the safe method for every surface, and cleans up before we leave.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" arrow>
                Get a Free Quote
              </Button>
              <Button href={site.phoneHref} size="lg" variant="outline" iconLeft="Phone">
                {site.phoneDisplay}
              </Button>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
              {chips.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                  <Icon name="Check" className="h-4 w-4 text-brand-600" strokeWidth={3} />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Photo */}
        <div className="lg:col-span-6">
          <Reveal delay={0.08} className="relative">
            <figure className="relative overflow-hidden rounded-2xl bg-night-900 shadow-lift">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/hero-roof-softwash.jpg"
                  alt="A Bluestone Pro Wash technician soft-washing algae off a shingle roof"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-night-950/85 to-transparent px-5 pb-4 pt-10 text-sm font-medium text-white/90">
                <Icon name="MapPin" className="h-4 w-4 text-brand-300" />
                Soft-washing a roof the safe way — no high pressure on shingles.
              </figcaption>
            </figure>

            {/* Honest little proof badge — solid, not glowing */}
            <div className="absolute -bottom-4 -left-3 flex items-center gap-2.5 rounded-xl border border-steel-200 bg-white px-4 py-3 shadow-card sm:-left-5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
                <Icon name="ShieldCheck" className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-ink">Insured &amp; local</div>
                <div className="text-xs text-ink-soft">Birmingham since 2022</div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
