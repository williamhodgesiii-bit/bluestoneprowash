import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section className="cv relative bg-fog-100 py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Good To Know"
            title="Questions, Answered"
            intro="A few things homeowners ask before booking. Still curious? Just give us a call."
          />
        </div>

        <div className="lg:col-span-8">
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group rounded-2xl border border-fog-200 bg-white px-6 shadow-card transition-colors open:border-brand-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fog-100 text-brand-600 transition-all duration-300 group-open:rotate-180 group-open:bg-brand-600 group-open:text-white">
                      <Icon name="ChevronDown" className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </summary>
                  <p className="pb-6 pr-10 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
