import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Reveal } from "../motion/Reveal";
import { serviceAreas } from "@/lib/site";

function Track({ reverse = false }: { reverse?: boolean }) {
  const row = [...serviceAreas, ...serviceAreas];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
      <div
        className="flex shrink-0 items-center gap-3 pr-3 [animation:marquee_42s_linear_infinite] [will-change:transform]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((city, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-steel-300 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-ink shadow-card"
          >
            <Icon name="MapPin" className="h-4 w-4 text-brand-600" />
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ServiceArea() {
  return (
    <section id="area" className="bg-steel-50 py-8 sm:py-14">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker text-brand-600">Where we work</span>
          <h2 className="mt-3 text-[clamp(1.5rem,3.6vw,2.7rem)] font-extrabold leading-[1.06] text-ink">
            All over Greater Birmingham
          </h2>
          <div className="rule-blue mx-auto mt-3 sm:mt-5" />
          <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft sm:mt-5 sm:text-[1.05rem]">
            From Over the Mountain to Shelby County. Here are some of the towns we&apos;re in every week.
          </p>
        </div>
      </Container>

      {/* Two ticker rows scrolling opposite ways */}
      <div className="mt-6 flex flex-col gap-3 sm:mt-8">
        <Track />
        <Track reverse />
      </div>

      <Container>
        <Reveal className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-4 rounded-xl border border-steel-200 bg-white p-5 text-center shadow-card sm:mt-8 sm:flex-row sm:p-6 sm:text-left">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
            <Icon name="MessageSquare" className="h-6 w-6" />
          </span>
          <p className="flex-1 text-ink">
            <span className="font-bold">Don&apos;t see your town?</span>{" "}
            We probably cover it. Give us a shout and we&apos;ll confirm in minutes.
          </p>
          <Button href="/contact" arrow>
            Check my area
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
