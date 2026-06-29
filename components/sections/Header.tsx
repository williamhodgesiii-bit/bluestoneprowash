"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Brandmark } from "../ui/Brandmark";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        // Solid on mobile (cheap to paint while scrolling); frosted only on desktop.
        "fixed inset-x-0 top-0 z-50 border-b bg-white transition-all duration-300 lg:bg-white/85 lg:backdrop-blur-xl",
        scrolled || open
          ? "border-fog-200 shadow-[0_4px_30px_-14px_rgba(8,32,66,0.3)]"
          : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Brandmark />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors duration-300 hover:text-brand-700"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-brand-700">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-600">
              <Icon name="Phone" className="h-4 w-4" />
            </span>
            {site.phoneDisplay}
          </a>
          <Button href="#quote" size="sm" arrow>
            Free Quote
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button href={site.phoneHref} size="sm" iconLeft="Phone" className="px-3">
            Call
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-fog-200 text-ink transition-colors"
          >
            <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
          >
            <div className="mx-4 mb-4 rounded-2xl border border-fog-200 bg-white p-4 shadow-lift">
              <nav className="flex flex-col">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-fog-100"
                  >
                    {l.label}
                    <Icon name="ArrowUpRight" className="h-4 w-4 text-brand-500" />
                  </a>
                ))}
              </nav>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button href={site.phoneHref} variant="outline" iconLeft="Phone" onClick={() => setOpen(false)}>
                  Call Now
                </Button>
                <Button href="#quote" onClick={() => setOpen(false)} arrow>
                  Free Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
