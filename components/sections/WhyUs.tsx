import Image from "next/image";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { whyUs } from "@/lib/site";

export function WhyUs() {
  return (
    <section id="why" className="relative scroll-mt-24 bg-fog-100 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visual */}
          <div className="lg:col-span-5">
            <Reveal className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-lift">
                <Image
                  src="/images/action-surface-cleaner.jpg"
                  alt="Bluestone Pro Wash technician restoring a driveway with a surface cleaner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/55 via-transparent to-transparent" />
              </div>

              {/* Floating guarantee badge */}
              <div className="absolute -bottom-6 -right-3 w-[230px] rounded-2xl border border-fog-200 bg-white p-5 shadow-lift sm:-right-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Icon name="BadgeCheck" className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="font-display text-lg font-extrabold leading-none text-ink">100%</div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Satisfaction Guarantee</div>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                  Not happy with a spot? We come back and make it right — no charge.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Reasons */}
          <div className="lg:col-span-7">
            <span className="eyebrow text-brand-600">
              <span className="h-px w-7 bg-brand-600/50" /> Why Bluestone
            </span>
            <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.05] text-ink">
              Why Homeowners<br className="hidden sm:block" /> Choose Bluestone
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              We bring the right equipment, careful methods, and genuine respect for your property to
              every job — whether it&apos;s a single driveway or a whole-home wash.
            </p>

            <Stagger className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              {whyUs.map((d) => (
                <StaggerItem key={d.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-card">
                    <Icon name={d.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight text-ink">{d.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
