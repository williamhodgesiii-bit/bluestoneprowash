import Image from "next/image";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal } from "../motion/Reveal";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-steel-50">
      <Container className="grid items-stretch gap-6 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
        {/* Message */}
        <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-center">
          <Reveal>
            <span className="kicker text-brand-600">Pressure &amp; soft washing · Birmingham, AL</span>
            <h1 className="mt-3 text-[clamp(2.15rem,4.8vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink">
              Make it look <span className="marker">new</span> again.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-4 sm:text-lg">
              Driveways, roofs, siding, windows, and gutters, washed the right way by a local crew
              that shows up on time, picks the safe method for every surface, and cleans up before we leave.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" arrow>
                Get a free quote
              </Button>
              <Button href={site.phoneHref} size="lg" variant="outline" iconLeft="Phone">
                {site.phoneDisplay}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Crew */}
        <div className="lg:col-span-6 lg:flex lg:items-center">
          <Reveal delay={0.08} className="relative w-full">
            <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-steel-200 bg-white shadow-lift">
              <Image
                src="/images/team-trailer.jpg"
                alt="The Bluestone Pro Wash crew in Birmingham"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                priority
                className="scale-[1.2] object-cover object-[50%_35%]"
              />
            </figure>

            {/* Honest little proof badge — solid, not glowing */}
            <div className="absolute -bottom-4 -left-3 hidden items-center gap-2.5 rounded-xl border border-steel-200 bg-white px-4 py-3 shadow-card sm:-left-5 sm:flex">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
                <Icon name="ShieldCheck" className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-ink">Locally owned</div>
                <div className="text-xs text-ink-soft">Birmingham since 2022</div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
