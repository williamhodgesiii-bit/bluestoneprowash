"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Icon } from "./ui/Icon";

/**
 * Draggable before/after comparison slider.
 * - Base layer = AFTER (clean). Top layer = BEFORE, clipped to the right of the handle.
 * - Drag the squeegee handle (pointer/touch) or use arrow keys (focused) to wipe clean.
 */
export function BeforeAfter({
  before,
  after,
  alt,
  priority = false,
}: {
  before: string;
  after: string;
  alt: string;
  priority?: boolean;
}) {
  const [pos, setPos] = useState(52);
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[1200/820] w-full touch-none select-none overflow-hidden rounded-[1.25rem] bg-night-900 shadow-lift ring-1 ring-black/5"
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setActive(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => active && updateFromClientX(e.clientX)}
      onPointerUp={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
    >
      {/* AFTER (base) */}
      <Image
        src={after}
        alt={`${alt} — after cleaning`}
        fill
        sizes="(max-width: 768px) 100vw, 70vw"
        priority={priority}
        className="object-cover"
        draggable={false}
      />

      {/* BEFORE (clipped to the right of the handle) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image
          src={before}
          alt={`${alt} — before cleaning`}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          priority={priority}
          className="object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-night-950/10" />
      </div>

      {/* Corner labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white shadow-md">
        After
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-night-950/70 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
        Before
      </span>

      {/* Divider + handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white/90 shadow-[0_0_18px_rgba(54,182,255,0.7)]" />
        <button
          type="button"
          role="slider"
          aria-label={`${alt}: reveal before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
            if (e.key === "Home") setPos(2);
            if (e.key === "End") setPos(98);
          }}
          className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-brand-700 shadow-[0_8px_24px_rgba(8,32,66,0.45)] ring-1 ring-black/5 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spray active:scale-95"
        >
          <Icon name="MoveHorizontal" className="h-5 w-5" />
          <span className="absolute -inset-2 -z-10 rounded-full bg-spray/30 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      </div>

      {/* Hint */}
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-night-950/55 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/80 opacity-100 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0">
        Drag to compare
      </span>
    </div>
  );
}
