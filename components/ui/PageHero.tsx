import { Container } from "./Container";
import { Reveal } from "../motion/Reveal";

export function PageHero({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-steel-100 bg-steel-50">
      <Container className="py-8 sm:py-14">
        <Reveal className="max-w-3xl">
          <span className="kicker text-brand-600">{kicker}</span>
          <h1 className="mt-3 text-[clamp(1.8rem,4.8vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink">
            {title}
          </h1>
          <div className="rule-blue mt-4" />
          {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
