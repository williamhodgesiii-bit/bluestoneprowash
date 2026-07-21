"use client";

import { useEffect, useRef } from "react";

/*
 * Scroll reveal — built to never hide content it can't bring back.
 *
 * The previous version rendered everything at opacity:0 and leaned on Framer
 * Motion's `whileInView` to fade it in. On phones that observer's first
 * callback frequently never lands on a cold load, so whole sections — the
 * white ones especially — stayed blank until a refresh or a back-navigation
 * forced a repaint. That's the bug this file fixes.
 *
 * The rule now: content is visible unless we're certain we can animate it back.
 *   - The server render is plain and visible. No JS, no observer, no reduced
 *     motion → the page still shows.
 *   - On mount we measure synchronously. Anything already on screen is left
 *     exactly as rendered (this is the case that used to go blank), so the
 *     first paint is never empty.
 *   - Only elements we've confirmed are off screen get hidden, then an
 *     IntersectionObserver fades them in as they scroll into view.
 */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function canAnimate() {
  return (
    typeof window !== "undefined" &&
    typeof IntersectionObserver !== "undefined" &&
    !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

// Is the element on screen *right now*? Measured at mount, after layout has
// settled, this is far more reliable on mobile than an observer's first async
// callback. A zero-box element (not yet laid out) counts as visible so we
// never hide something we couldn't measure.
function onScreen(el: HTMLElement) {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return true;
  return r.top < vh && r.bottom > 0;
}

// Nothing stays hidden longer than this, no matter what the observer does.
const REVEAL_SAFETY_MS = 2500;

function revealWhenSeen(el: HTMLElement, show: () => void) {
  // Three triggers, first one wins:
  //   1. IntersectionObserver, with a positive bottom margin so the fade has
  //      already started by the time the element crosses into view (no flash
  //      of blank space at the fold).
  //   2. A passive scroll/resize fallback doing a plain rect check — if the
  //      observer's callback is dropped mid-flick (it happens on phones), the
  //      next scroll event still reveals the content.
  //   3. A safety timer: even if BOTH of the above are throttled away
  //      (battery saver, in-app webviews), everything is visible within a
  //      couple of seconds. Text can never stay stuck invisible.
  let done = false;
  let raf = 0;

  const finish = () => {
    if (done) return;
    done = true;
    cleanup();
    show();
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          finish();
          break;
        }
      }
    },
    { rootMargin: "0px 0px 12% 0px" }
  );
  io.observe(el);

  const check = () => {
    raf = 0;
    if (onScreen(el)) finish();
  };
  const onScrollOrResize = () => {
    if (!raf) raf = requestAnimationFrame(check);
  };
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });

  const timer = setTimeout(finish, REVEAL_SAFETY_MS);

  function cleanup() {
    io.disconnect();
    window.removeEventListener("scroll", onScrollOrResize);
    window.removeEventListener("resize", onScrollOrResize);
    if (raf) cancelAnimationFrame(raf);
    clearTimeout(timer);
  }
  return cleanup;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate() || onScreen(el)) return;

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity 0.5s ${EASE} ${delay}s, transform 0.5s ${EASE} ${delay}s`;

    return revealWhenSeen(el, () => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate() || onScreen(el)) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    if (items.length === 0) return;

    items.forEach((item, i) => {
      const d = 0.02 + i * 0.06;
      item.style.opacity = "0";
      item.style.transform = "translateY(14px)";
      item.style.transition = `opacity 0.45s ${EASE} ${d}s, transform 0.45s ${EASE} ${d}s`;
    });

    return revealWhenSeen(el, () => {
      for (const item of items) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }
    });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal-item="" className={className}>
      {children}
    </div>
  );
}
