import Image from "next/image";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { whyUs } from "@/lib/site";

export function WhyUs() {
  return (
    <section id="why" className="cv bg-white py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visual */}
          <div className="lg:col-span-5">
            <Reveal className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift">
                <Image
                  src="/images/action-surface-cleaner.jpg"
                  alt="A Bluestone Pro Wash technician restoring a driveway with a surface cleaner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Solid guarantee card — no glow */}
              <div className="absolute -bottom-5 -right-3 w-[230px] rounded-xl border border-steel-200 bg-white p-5 shadow-lift sm:-right-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
                    <Icon name="BadgeCheck" className="h-6 w-6" />
                  </span>
                  <div className="font-display text-base font-extrabold leading-tight text-ink">
                    Our handshake guarantee
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                  If a spot isn&apos;t right when we finish, we come back and fix it — no charge.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Reasons */}
          <div className="lg:col-span-7">
            <span className="kicker text-brand-600">Why Bluestone</span>
            <h2 className="mt-3 text-[clamp(1.75rem,3.6vw,2.7rem)] font-extrabold leading-[1.06] text-ink">
              Neighbors hire us back
            </h2>
            <div className="rule-blue mt-5" />
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
              We bring the right gear, careful methods, and a real respect for your property to every
              job — whether it&apos;s a single driveway or a whole-home wash.
            </p>

            <Stagger className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {whyUs.map((d) => (
                <StaggerItem key={d.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name={d.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight text-ink">{d.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{d.body}</p>
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
