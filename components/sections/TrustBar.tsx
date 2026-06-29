import { Container } from "../ui/Container";
import { CountUp } from "../ui/CountUp";
import { Icon } from "../ui/Icon";
import { Reveal } from "../motion/Reveal";
import { stats } from "@/lib/site";

export function TrustBar() {
  return (
    <section className="cv relative z-10 bg-night-900 text-white">
      <div className="absolute inset-0 grid-texture opacity-40" />
      <Container className="relative py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-l-2 border-brand-600/60 pl-4">
              <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-sm font-medium text-white/60">{s.label}</div>
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
