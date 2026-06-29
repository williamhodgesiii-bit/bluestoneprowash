import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../motion/Reveal";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How It Works"
          title="A Simple Process, Start to Finish"
          intro="No drawn-out sales pitch. Four straightforward steps from your first call to a property that looks its best."
        />

        <div className="relative mt-16">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 lg:block" />

          <Stagger className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((s) => (
              <StaggerItem key={s.n} className="relative flex flex-col items-start">
                <div className="relative mb-6 flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-2xl bg-night-950 text-white shadow-lift">
                    <Icon name={s.icon} className="h-7 w-7" />
                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-brand-600 font-display text-xs font-extrabold text-white ring-4 ring-white">
                      {s.n}
                    </span>
                  </span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
