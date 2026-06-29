import { Container } from "../ui/Container";
import { CountUp } from "../ui/CountUp";
import { Icon } from "../ui/Icon";
import { Reveal } from "../motion/Reveal";

const items = [
  { display: <CountUp value={2022} />, label: "Serving Birmingham since" },
  { display: <CountUp value={5} decimals={1} display="5.0" suffix="★" />, label: "Average star rating" },
  { display: <CountUp value={100} suffix="%" />, label: "Satisfaction guaranteed" },
  { display: <CountUp value={5} />, label: "Specialized services" },
];

export function TrustBar() {
  return (
    <section className="relative z-10 bg-night-900 text-white">
      <div className="absolute inset-0 grid-texture opacity-40" />
      <Container className="relative py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08} className="border-l-2 border-brand-600/60 pl-4">
              <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {it.display}
              </div>
              <div className="mt-1.5 text-sm font-medium text-white/60">{it.label}</div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-center text-sm font-medium text-white/55">
          <span className="flex items-center gap-2"><Icon name="ShieldCheck" className="h-4 w-4 text-spray" /> Fully insured crews</span>
          <span className="flex items-center gap-2"><Icon name="MapPin" className="h-4 w-4 text-spray" /> Locally owned &amp; operated</span>
          <span className="flex items-center gap-2"><Icon name="BadgeCheck" className="h-4 w-4 text-spray" /> Upfront, honest pricing</span>
          <span className="flex items-center gap-2"><Icon name="Sparkles" className="h-4 w-4 text-spray" /> Safe for every surface</span>
        </Reveal>
      </Container>
    </section>
  );
}
