import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Reveal } from "../motion/Reveal";
import { serviceAreas } from "@/lib/site";

export function ServiceArea() {
  const marquee = [...serviceAreas, ...serviceAreas];

  return (
    <section id="area" className="relative scroll-mt-24 overflow-hidden bg-brand-50 py-20 sm:py-28">
      {/* dotted map texture */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(5,97,187,0.14) 1.4px, transparent 1.4px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(120% 90% at 50% 30%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 30%, black, transparent 75%)",
        }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-brand-600">
            <Icon name="MapPin" className="h-4 w-4" /> Where We Work
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold uppercase leading-[0.98] text-ink">
            Proudly Cleaning Greater Birmingham
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            From Over the Mountain to Shelby County, we bring the same pro-grade results to every driveway,
            roof and storefront we touch.
          </p>
        </div>
      </Container>

      {/* City marquee */}
      <div className="relative mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 items-center gap-4 pr-4 [animation:marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
          {marquee.map((city, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink shadow-card"
            >
              <Icon name="MapPin" className="h-4 w-4 text-brand-500" />
              {city}
            </span>
          ))}
        </div>
      </div>

      <Container className="relative">
        <Reveal className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-brand-200 bg-white/70 p-7 text-center shadow-card backdrop-blur-sm sm:flex-row sm:text-left">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
            <Icon name="MessageSquare" className="h-6 w-6" />
          </span>
          <p className="flex-1 text-ink">
            <span className="font-bold">Don&apos;t see your town?</span>{" "}
            We likely cover it. Reach out and we&apos;ll confirm in minutes.
          </p>
          <Button href="#quote" arrow>
            Check My Area
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
