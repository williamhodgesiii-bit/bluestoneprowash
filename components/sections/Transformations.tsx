"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { BeforeAfter } from "../BeforeAfter";
import { transformations } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Transformations() {
  const [active, setActive] = useState(0);
  const current = transformations[active];

  return (
    <section id="transformations" className="relative scroll-mt-24 overflow-hidden bg-night-950 py-20 text-white sm:py-28">
      <div className="absolute inset-0 grid-texture opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <Container className="relative">
        <div className="max-w-2xl">
          <span className="eyebrow text-spray">
            <span className="h-px w-7 bg-spray/60" /> Before &amp; After
          </span>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.05] text-white">
            See the Before &amp; After
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Real homes around Birmingham. Drag the slider to compare the before and after for yourself.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {transformations.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                i === active
                  ? "border-brand-500 bg-brand-600 text-white shadow-[0_8px_24px_-8px_rgba(5,97,187,0.8)]"
                  : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Slider + info */}
        <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <BeforeAfter before={current.before} after={current.after} alt={current.title} priority={active === 0} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-spray">
                  <Icon name="Sparkles" className="h-3.5 w-3.5" /> {current.label}
                </div>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white">{current.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{current.caption}</p>
                <Button href="#quote" className="mt-6" arrow>
                  Get a Free Quote
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
