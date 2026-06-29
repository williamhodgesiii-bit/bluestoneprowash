"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { services, site } from "@/lib/site";

const chips = ["Fully insured", "Soft-wash safe", "Free quotes", "Locally owned"];

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-fog-50 to-brand-50/40 pt-[72px]"
    >
      {/* soft brand glow + dot texture (glows desktop-only — large blur is costly on mobile) */}
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 hidden h-[34rem] w-[34rem] rounded-full bg-brand-300/25 blur-[100px] sm:block" />
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 hidden h-[26rem] w-[26rem] rounded-full bg-brand-200/30 blur-[100px] sm:block" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.6]"
        style={{
          backgroundImage: "radial-gradient(rgba(5,97,187,0.10) 1.3px, transparent 1.3px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(120% 80% at 70% 10%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 70% 10%, black, transparent 70%)",
        }}
      />

      <Container className="relative grid min-h-[calc(100svh-72px)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {/* Left: message */}
        <div className="lg:col-span-6 xl:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-ink-soft shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Greater Birmingham · Locally Owned · Fully Insured
          </motion.div>

          <h1 className="mt-6 text-[clamp(2.4rem,5.2vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-ink">
            <Word reduce={reduce} delay={0.12}>Professional Pressure Washing</Word>{" "}
            <Word reduce={reduce} delay={0.22}>
              &amp; <span className="text-gradient">Exterior Cleaning</span>
            </Word>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            From driveways and siding to roofs, windows, and gutters, we match the right method to
            every surface — cleaning your property safely, thoroughly, and on schedule.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#quote" size="lg" arrow>
              Request a Free Quote
            </Button>
            <Button href={site.phoneHref} size="lg" variant="outline" iconLeft="Phone">
              {site.phoneDisplay}
            </Button>
          </motion.div>

          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5"
          >
            {chips.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                <Icon name="Check" className="h-4 w-4 text-brand-600" strokeWidth={3} />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: services-at-a-glance card */}
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative"
          >
            {/* decorative panel glow */}
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/40 to-spray/10 blur-xl" />

            <div className="rounded-[1.5rem] border border-fog-200 bg-white/90 p-6 shadow-lift backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft/70">
                  What We Clean
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name="Droplets" className="h-5 w-5" />
                </span>
              </div>

              <ul className="mt-5 flex flex-col divide-y divide-fog-200">
                {services.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
                  >
                    <a
                      href="#services"
                      className="group flex items-center gap-4 py-3.5 transition-colors"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                        <Icon name={s.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-ink">{s.name}</span>
                        <span className="block truncate text-xs text-ink-soft/80">{s.surfaces}</span>
                      </span>
                      <Icon
                        name="ArrowRight"
                        className="h-4 w-4 shrink-0 text-fog-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand-500"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href="#quote"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-fog-100 py-3 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-50"
              >
                Get a free quote
                <Icon name="ArrowRight" className="h-4 w-4" />
              </a>
            </div>

            {/* floating trust badge */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease }}
              className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-fog-200 bg-white px-4 py-3 shadow-lift sm:-left-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white">
                <Icon name="ShieldCheck" className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-ink">Insured &amp; Local</div>
                <div className="text-xs text-ink-soft">Serving Birmingham since 2022</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Word({
  children,
  delay,
  reduce,
}: {
  children: React.ReactNode;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <span className="inline-block">
      <motion.span
        className="inline-block"
        initial={reduce ? false : { opacity: 0, y: "0.4em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
