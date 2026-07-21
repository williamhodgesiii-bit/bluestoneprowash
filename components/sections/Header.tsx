"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brandmark } from "../ui/Brandmark";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { navLinks, services, site } from "@/lib/site";
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

  // While the menu is open: lock the page behind it and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href;
  const closeMenu = () => setOpen(false);

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
              <Icon name="BadgeCheck" className="h-3.5 w-3.5 text-brand-300" /> Satisfaction guaranteed
            </span>
            <a href={site.phoneHref} className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-brand-300">
              <Icon name="Phone" className="h-3.5 w-3.5 text-brand-300" /> {site.phoneDisplay}
            </a>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative z-20 border-b bg-white transition-shadow duration-300",
          scrolled || open ? "border-steel-200 shadow-[0_6px_24px_-18px_rgba(13,26,46,0.5)]" : "border-steel-100"
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Brandmark onClick={closeMenu} />

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const active =
                l.href === "/services"
                  ? pathname === "/services" || pathname.startsWith("/services/")
                  : isActive(l.href);

              // Services gets a hover/focus dropdown of the individual service pages.
              if (l.href === "/services") {
                return (
                  <div key={l.href} className="group relative">
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-1 px-3.5 py-2 text-[0.95rem] font-semibold transition-colors",
                        active ? "text-brand-700" : "text-ink-soft hover:text-ink"
                      )}
                    >
                      {l.label}
                      <Icon
                        name="ChevronDown"
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                      />
                      {active && (
                        <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />
                      )}
                    </Link>
                    {/* pt-2 keeps a hover bridge so the menu doesn't drop on the gap */}
                    <div className="invisible absolute left-0 top-full z-30 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="min-w-[16rem] rounded-xl border border-steel-200 bg-white p-2 shadow-lift">
                        {services.map((s) => (
                          <Link
                            key={s.id}
                            href={`/services/${s.id}`}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-steel-50 hover:text-brand-700"
                          >
                            <Icon name={s.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                            {s.name}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="mt-1 flex items-center gap-2.5 rounded-lg border-t border-steel-100 px-3 py-2 text-sm font-bold text-brand-700 transition-colors hover:bg-steel-50"
                        >
                          <Icon name="ArrowRight" className="h-4 w-4 shrink-0" />
                          All services
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3.5 py-2 text-[0.95rem] font-semibold transition-colors",
                    active ? "text-brand-700" : "text-ink-soft hover:text-ink"
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-brand-700">
              <Icon name="Phone" className="h-4 w-4 text-brand-600" />
              {site.phoneDisplay}
            </a>
            <Button href="/contact" size="sm">
              Get a free quote
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
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 touch-manipulation place-items-center rounded-lg border border-steel-200 text-ink transition-colors active:bg-steel-100"
            >
              <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tap-away catcher — first tap outside the panel just closes the menu. */}
      {open && (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={closeMenu}
          className="fixed inset-0 z-0 cursor-default lg:hidden"
        />
      )}

      {/* Mobile menu — an overlay (no page reflow) animated with transform + opacity only. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full z-10 origin-top border-b border-steel-200 bg-white shadow-[0_18px_30px_-22px_rgba(13,26,46,0.55)] transition duration-200 ease-out lg:hidden",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-5 py-2 sm:px-8">
          {navLinks.map((l) => {
            if (l.href === "/services") {
              const active = pathname === "/services" || pathname.startsWith("/services/");
              return (
                <div key={l.href} className="border-b border-steel-100">
                  <Link
                    href={l.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex touch-manipulation items-center justify-between py-3.5 text-base font-semibold",
                      active ? "text-brand-700" : "text-ink"
                    )}
                  >
                    {l.label}
                    <Icon name="ArrowRight" className="h-4 w-4 text-steel-400" />
                  </Link>
                  <div className="flex flex-col gap-0.5 pb-3 pl-3">
                    {services.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.id}`}
                        onClick={closeMenu}
                        className={cn(
                          "flex touch-manipulation items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium",
                          pathname === `/services/${s.id}` ? "text-brand-700" : "text-ink-soft"
                        )}
                      >
                        <Icon name={s.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={cn(
                  "flex touch-manipulation items-center justify-between border-b border-steel-100 py-3.5 text-base font-semibold last:border-0",
                  isActive(l.href) ? "text-brand-700" : "text-ink"
                )}
              >
                {l.label}
                <Icon name="ArrowRight" className="h-4 w-4 text-steel-400" />
              </Link>
            );
          })}
          <div className="grid grid-cols-2 gap-2 py-3">
            <Button href={site.phoneHref} variant="outline" iconLeft="Phone" onClick={closeMenu}>
              Call now
            </Button>
            <Button href="/contact" onClick={closeMenu}>
              Free quote
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
