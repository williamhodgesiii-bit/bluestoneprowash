import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { site, faqs } from "@/lib/site";

export function Faq({ bg = "white" }: { bg?: "white" | "steel" }) {
  return (
    <section className={`cv py-10 sm:py-14 ${bg === "steel" ? "bg-steel-50" : "bg-white"}`}>
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            kicker="Good to know"
            title="Questions, answered"
            intro="A few things folks ask before booking. Still curious? Just give us a call."
          />
          <a
            href={site.phoneHref}
            className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-brand-700 hover:text-brand-600"
          >
            <Icon name="Phone" className="h-5 w-5" /> {site.phoneDisplay}
          </a>
        </div>

        <div className="lg:col-span-8">
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="group rounded-xl border border-steel-200 bg-white px-5 open:border-brand-300">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.05rem] font-bold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-steel-100 text-brand-600 transition-transform duration-200 group-open:rotate-180">
                      <Icon name="ChevronDown" className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </summary>
                  <p className="pb-5 pr-8 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
