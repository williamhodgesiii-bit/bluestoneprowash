"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { BeforeAfter } from "../BeforeAfter";
import { transformationCategories } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Transformations() {
  // Which service tab is open, and which pair within it is showing.
  const [catIdx, setCatIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);

  const category = transformationCategories[catIdx];
  const item = category.items[itemIdx];
  const count = category.items.length;
  const multi = count > 1;
  const key = `${catIdx}-${itemIdx}`;

  // Switching category always resets to that category's first (strongest) pair.
  const selectCategory = (i: number) => {
    setCatIdx(i);
    setItemIdx(0);
  };
  const step = (dir: number) => setItemIdx((prev) => (prev + dir + count) % count);

  return (
    <section id="transformations" className="bg-night-950 py-10 text-white sm:py-14">
      <Container>
        {/*
         * Portrait slider takes the left column and is vertically centered; the
         * copy lives in the right column, clustered around the same centerline —
         * heading + tabs pinned just above it, caption + CTA just below. On mobile
         * the blocks stack in reading order: heading → tabs → slider → caption.
         */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6">
          {/* Heading + category tabs */}
          <div className="lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:self-end">
            <span className="kicker text-brand-300">Before &amp; after</span>
            <h2 className="mt-3 text-[clamp(1.5rem,3.2vw,2.4rem)] font-extrabold leading-[1.08]">
              Grab the slider. See for yourself.
            </h2>
            <div className="rule-blue mt-4 bg-brand-400" />
            <p className="mt-3 max-w-md text-[0.97rem] leading-relaxed text-white/70 sm:text-[1.02rem]">
              Real homes around Birmingham. No stock photos. Pick a service, then drag the handle
              across to watch the grime come off.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {transformationCategories.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => selectCategory(i)}
                  aria-pressed={i === catIdx}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-bold transition-colors",
                    i === catIdx
                      ? "border-brand-500 bg-brand-600 text-white"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-white/35 hover:text-white"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider + paging */}
          <div className="lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-2 lg:self-center">
            <div className="mx-auto w-full max-w-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <BeforeAfter
                    before={item.before}
                    after={item.after}
                    alt={item.title}
                    priority={catIdx === 0 && itemIdx === 0}
                    sizes="(max-width: 512px) 90vw, 460px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Page between pairs — only when a category has more than one */}
              {multi && (
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous result"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white/35 hover:text-white"
                  >
                    <Icon name="ChevronLeft" className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {category.items.map((_, j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() => setItemIdx(j)}
                        aria-label={`Show result ${j + 1} of ${count}`}
                        aria-current={j === itemIdx}
                        className={cn(
                          "h-2 rounded-full transition-all",
                          j === itemIdx ? "w-6 bg-brand-400" : "w-2 bg-white/30 hover:bg-white/50"
                        )}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next result"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white/35 hover:text-white"
                  >
                    <Icon name="ChevronRight" className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Caption + CTA */}
          <div className="lg:col-start-7 lg:col-span-6 lg:row-start-2 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <span className="kicker text-[0.68rem] text-brand-300">{category.label}</span>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-md leading-relaxed text-white/70">{item.caption}</p>
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
