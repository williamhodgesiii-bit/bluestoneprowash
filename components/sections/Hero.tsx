"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { site } from "@/lib/site";

const headline = [
  { t: "Make" },
  { t: "Your" },
  { t: "Home" },
  { t: "Look" },
  { t: "Brand", accent: true },
  { t: "New", accent: true },
  { t: "Again." },
];

const chips = ["Fully Insured", "Safe Soft-Wash Methods", "Locally Owned", "100% Satisfaction"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-night-950 text-white">
      {/* Background image with parallax */}
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src="/images/hero-roof-softwash.jpg"
          alt="Bluestone Pro Wash technician soft washing a Birmingham roof"
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </motion.div>

      {/* Overlays for legibility + brand depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-night-950 via-night-950/88 to-night-900/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-transparent to-night-950/70" />
      <div className="absolute inset-0 -z-10 spotlight opacity-80" />
      {/* Brand diagonal accent (echoes the truck wrap) */}
      <div className="absolute -right-24 top-0 -z-10 hidden h-full w-[42%] skew-x-[-12deg] bg-gradient-to-b from-brand-600/20 to-transparent md:block" />

      <Container className="relative flex min-h-[100svh] flex-col justify-center pb-24 pt-28">
        <motion.div style={{ y: reduce ? 0 : overlayY, opacity: reduce ? 1 : fade }} className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 py-1.5 pl-2 pr-4 backdrop-blur-md"
          >
            <span className="flex items-center gap-0.5 rounded-full bg-brand-600 px-2 py-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="Star" className="h-3 w-3 fill-white text-white" />
              ))}
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/90">Five-Star Rated · Birmingham, AL</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.7rem,7vw,5.4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
            {headline.map((w, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className={`inline-block ${w.accent ? "text-gradient" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w.t}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            Professional pressure washing, soft washing &amp; exterior cleaning that safely lifts years of
            dirt, mold and algae — so your property shows its very best.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#quote" size="lg" arrow>
              Get My Free Quote
            </Button>
            <Button href={site.phoneHref} size="lg" variant="outlineDark" iconLeft="Phone">
              {site.phoneDisplay}
            </Button>
          </motion.div>

          {/* Trust chips */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
          >
            {chips.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm font-medium text-white/75">
                <Icon name="Check" className="h-4 w-4 text-spray" strokeWidth={3} />
                {c}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: reduce ? 1 : fade }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/55 md:flex"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <motion.span
            animate={reduce ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-spray"
          />
        </span>
      </motion.div>
    </section>
  );
}
