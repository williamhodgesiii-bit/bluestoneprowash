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
    <section id="transformations" className="bg-night-950 py-8 text-white sm:py-12">
      <Container>
        {/*
         * Slider takes the left column at full height; the copy lives beside it
         * in the right column — heading + tabs pinned to the top, caption + CTA
         * pinned to the bottom — so the band stays short and the right side
         * never sits half-empty. On mobile the three blocks simply stack in
         * reading order: heading → slider → caption.
         */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          {/* Heading + category tabs — top of the right column */}
          <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:self-start">
            <span className="kicker text-brand-300">Before &amp; after</span>
            <h2 className="mt-3 text-[clamp(1.5rem,3.2vw,2.4rem)] font-extrabold leading-[1.08]">
              Grab the slider. See for yourself.
            </h2>
            <div className="rule-blue mt-4 bg-brand-400" />
            <p className="mt-4 text-[1.02rem] leading-relaxed text-white/70">
              Real homes around Birmingham. No stock photos. Drag the handle across to watch the
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

          {/* Slider — left column, spanning the full height of the copy */}
          <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-2 lg:self-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <BeforeAfter
                  before={current.before}
                  after={current.after}
                  alt={current.title}
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption + CTA — bottom of the right column */}
          <div className="lg:col-start-8 lg:col-span-5 lg:row-start-2 lg:self-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  {current.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-white/70">{current.caption}</p>
              </motion.div>
            </AnimatePresence>
            <Button href="/contact" className="mt-5" arrow>
              Get a free quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
