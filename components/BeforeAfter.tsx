"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "./ui/Icon";

/**
 * Draggable before/after slider.
 * Position is driven through a CSS custom property (`--pos`) updated imperatively
 * on pointer move — so dragging never triggers a React re-render (smooth on mobile).
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
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const dragging = useRef(false);
  const pos = useRef(52);

  const setPos = (pct: number) => {
    const clamped = Math.min(98, Math.max(2, pct));
    pos.current = clamped;
    containerRef.current?.style.setProperty("--pos", `${clamped}%`);
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(clamped)));
  };

  const fromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(((clientX - rect.left) / rect.width) * 100);
  };

  return (
    <div
      ref={containerRef}
      style={{ ["--pos" as string]: "52%" } as React.CSSProperties}
      className="group relative aspect-[1200/820] w-full touch-none select-none overflow-hidden rounded-[1.25rem] bg-night-900 shadow-lift ring-1 ring-black/5"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) fromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {/* AFTER (base) */}
      <Image
        src={after}
        alt={`${alt} — after cleaning`}
        fill
        sizes="(max-width: 768px) 100vw, 70vw"
        priority={priority}
        className="pointer-events-none object-cover"
        draggable={false}
      />

      {/* BEFORE (clipped to the right of the handle) */}
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: "inset(0 0 0 var(--pos))" }}>
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
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-night-950/70 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/90">
        Before
      </span>

      {/* Divider + handle */}
      <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: "var(--pos)", transform: "translateX(-50%)" }}>
        <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(13,26,46,0.15)]" />
        <button
          ref={handleRef}
          type="button"
          role="slider"
          aria-label={`${alt}: reveal before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={52}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos(pos.current - 4);
            if (e.key === "ArrowRight") setPos(pos.current + 4);
            if (e.key === "Home") setPos(2);
            if (e.key === "End") setPos(98);
          }}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-brand-700 shadow-[0_8px_24px_rgba(13,26,46,0.45)] ring-1 ring-black/5 transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 active:scale-95"
        >
          <Icon name="MoveHorizontal" className="h-5 w-5" />
        </button>
      </div>

      {/* Hint */}
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-night-950/55 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/80 transition-opacity duration-500 group-hover:opacity-0">
        Drag to compare
      </span>
    </div>
  );
}
