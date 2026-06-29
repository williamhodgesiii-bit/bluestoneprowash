import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../motion/Reveal";
import { testimonials } from "@/lib/site";

function Stars() {
  return (
    <div className="flex gap-0.5 text-brand-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="Star" className="h-4 w-4 fill-brand-500" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Neighbors Talk"
            title="Birmingham Keeps Coming Back"
            intro="Real feedback from homeowners who trusted us with their property — and told their neighbors about it."
          />
          <div className="inline-flex items-center gap-3 rounded-2xl border border-fog-200 bg-fog-50 px-5 py-3 shadow-card">
            <span className="font-display text-3xl font-extrabold text-ink">5.0</span>
            <div>
              <Stars />
              <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">Average rating</div>
            </div>
          </div>
        </div>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-fog-200 bg-fog-50 p-7 transition-shadow duration-500 hover:shadow-card">
                <Icon name="Quote" className="h-8 w-8 text-brand-200" />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-fog-200 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 font-display text-base font-extrabold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <div className="font-bold text-ink">{t.name}</div>
                      <div className="text-sm text-ink-soft">{t.location}, AL</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-card">
                    {t.service}
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
