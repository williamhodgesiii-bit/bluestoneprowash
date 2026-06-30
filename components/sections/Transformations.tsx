"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { BeforeAfter } from "../BeforeAfter";
import { transformations } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Transformations() {
  const [active, setActive] = useState(0);
  const current = transformations[active];

  return (
    <section id="transformations" className="cv bg-night-950 py-10 text-white sm:py-14">
      <Container>
        {/* Title left, intro + tabs right so the band isn't half-empty */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="kicker text-brand-300">Before &amp; after</span>
            <h2 className="mt-3 text-[clamp(1.75rem,3.6vw,2.7rem)] font-extrabold leading-[1.06]">
              Grab the slider. See for yourself.
            </h2>
            <div className="rule-blue mt-4 bg-brand-400" />
          </div>
          <div>
            <p className="text-[1.05rem] leading-relaxed text-white/70">
              Real homes around Birmingham — no stock photos. Drag the handle across to watch the
              grime come off.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {transformations.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-bold transition-colors",
                    i === active
                      ? "border-brand-500 bg-brand-600 text-white"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-white/35 hover:text-white"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slider + info */}
        <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <BeforeAfter before={current.before} after={current.after} alt={current.title} priority={active === 0} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-2xl font-extrabold tracking-tight text-white">{current.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{current.caption}</p>
                <Button href="/contact" className="mt-6" arrow>
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
