import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../motion/Reveal";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="cv bg-steel-50 py-10 sm:py-14">
      <Container>
        <SectionHeading
          align="center"
          kicker="How it works"
          title="Four steps, no runaround"
          intro="No drawn-out sales pitch and no surprise charges, just a straight line from your first call to a property that looks its best."
        />

        <div className="relative mt-9">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-steel-200 lg:block" />

          <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((s) => (
              <StaggerItem key={s.n} className="relative flex flex-col items-start">
                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-night-900 text-white shadow-card ring-4 ring-steel-50">
                  <Icon name={s.icon} className="h-6 w-6" />
                </div>
                <span className="font-display text-sm font-extrabold text-brand-600">STEP {s.n}</span>
                <h3 className="mt-1 text-xl font-extrabold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
