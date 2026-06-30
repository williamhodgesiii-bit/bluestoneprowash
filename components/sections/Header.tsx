"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Brandmark } from "../ui/Brandmark";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50">
      {/* Local-business utility strip — phone + hours, the way a real shop signs its door. */}
      <div className="hidden bg-night-950 text-white/80 lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-10 text-[0.8rem]">
          <span className="flex items-center gap-2">
            <Icon name="MapPin" className="h-3.5 w-3.5 text-brand-300" />
            Serving Greater Birmingham · {site.hours}
          </span>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Icon name="ShieldCheck" className="h-3.5 w-3.5 text-brand-300" /> Licensed &amp; insured
            </span>
            <a href={site.phoneHref} className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-brand-300">
              <Icon name="Phone" className="h-3.5 w-3.5 text-brand-300" /> {site.phoneDisplay}
            </a>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "border-b bg-white transition-shadow duration-300",
          scrolled || open ? "border-steel-200 shadow-[0_6px_24px_-18px_rgba(13,26,46,0.5)]" : "border-steel-100"
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Brandmark />

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "relative px-3.5 py-2 text-[0.95rem] font-semibold transition-colors",
                  isActive(l.href) ? "text-brand-700" : "text-ink-soft hover:text-ink"
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-brand-700">
              <Icon name="Phone" className="h-4 w-4 text-brand-600" />
              {site.phoneDisplay}
            </a>
            <Button href="/contact" size="sm">
              Get a Free Quote
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button href={site.phoneHref} size="sm" iconLeft="Phone" className="px-3.5">
              Call
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-steel-200 text-ink"
            >
              <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-steel-200 bg-white lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-5 py-2 sm:px-8">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-steel-100 py-3.5 text-base font-semibold last:border-0",
                    isActive(l.href) ? "text-brand-700" : "text-ink"
                  )}
                >
                  {l.label}
                  <Icon name="ArrowRight" className="h-4 w-4 text-steel-400" />
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 py-3">
                <Button href={site.phoneHref} variant="outline" iconLeft="Phone" onClick={() => setOpen(false)}>
                  Call Now
                </Button>
                <Button href="/contact" onClick={() => setOpen(false)}>
                  Free Quote
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
