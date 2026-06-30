"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "./ui/Icon";

/**
 * Draggable before/after slider.
 *
 * The reveal position lives in a CSS custom property (`--pos`) written
 * imperatively from pointer events, so dragging never triggers a React
 * re-render. Two details keep it smooth on a phone:
 *   1. The pointer is captured on the way *down*, so the gesture stays ours for
 *      the whole drag — it can't get dropped before reaching either edge.
 *   2. Position writes are coalesced into a single requestAnimationFrame, so a
 *      flood of pointermove events still repaints at most once per frame.
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
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);

  const dragging = useRef(false); // divider is following the pointer
  const armed = useRef(false); // finger is down; deciding drag vs. page scroll
  const startX = useRef(0);
  const startY = useRef(0);
  const pos = useRef(52);

  const frame = useRef(0);
  const queuedX = useRef(0);

  // Apply the latest queued X once per animation frame.
  const flush = () => {
    frame.current = 0;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const pct = Math.min(100, Math.max(0, ((queuedX.current - rect.left) / rect.width) * 100));
    pos.current = pct;
    el.style.setProperty("--pos", `${pct}%`);
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(pct)));
  };

  const queueFromClientX = (clientX: number) => {
    queuedX.current = clientX;
    if (!frame.current) frame.current = requestAnimationFrame(flush);
  };

  // Discrete keyboard steps — applied straight away.
  const nudge = (pct: number) => {
    const clamped = Math.min(100, Math.max(0, pct));
    pos.current = clamped;
    containerRef.current?.style.setProperty("--pos", `${clamped}%`);
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(clamped)));
  };

  const beginDrag = () => {
    dragging.current = true;
    if (beforeRef.current) beforeRef.current.style.willChange = "clip-path";
  };

  const stopDrag = (el: HTMLElement | null, pointerId: number) => {
    dragging.current = false;
    armed.current = false;
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    if (beforeRef.current) beforeRef.current.style.willChange = "";
    try {
      el?.releasePointerCapture(pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      style={{ ["--pos" as string]: "52%" } as React.CSSProperties}
      className="group relative aspect-[1200/820] w-full touch-pan-y select-none overflow-hidden rounded-[1.25rem] bg-night-900 shadow-lift ring-1 ring-black/5"
      onPointerDown={(e) => {
        startX.current = e.clientX;
        startY.current = e.clientY;
        // Own the whole gesture up-front so no moves get dropped near the edges.
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
        if (e.pointerType === "mouse") {
          beginDrag();
          queueFromClientX(e.clientX);
        } else {
          // Touch/pen: wait until we know it's a sideways drag, so a vertical
          // swipe over the slider still scrolls the page instead of jumping it.
          armed.current = true;
        }
      }}
      onPointerMove={(e) => {
        if (dragging.current) {
          queueFromClientX(e.clientX);
          return;
        }
        if (!armed.current) return;
        const dx = e.clientX - startX.current;
        const dy = e.clientY - startY.current;
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return; // too small to read intent
        if (Math.abs(dy) > Math.abs(dx)) {
          // Vertical intent → it's a page scroll. Hand the gesture back.
          stopDrag(e.currentTarget, e.pointerId);
          return;
        }
        armed.current = false;
        beginDrag();
        queueFromClientX(e.clientX);
      }}
      onPointerUp={(e) => stopDrag(e.currentTarget, e.pointerId)}
      onPointerCancel={(e) => stopDrag(e.currentTarget, e.pointerId)}
      onLostPointerCapture={() => {
        // Safety net if the browser yanks capture (e.g. it took over scrolling).
        dragging.current = false;
        armed.current = false;
        if (frame.current) {
          cancelAnimationFrame(frame.current);
          frame.current = 0;
        }
        if (beforeRef.current) beforeRef.current.style.willChange = "";
      }}
    >
      {/* AFTER (base) */}
      <Image
        src={after}
        alt={`${alt}, after cleaning`}
        fill
        sizes="(max-width: 768px) 100vw, 70vw"
        priority={priority}
        className="pointer-events-none object-cover"
        draggable={false}
      />

      {/* BEFORE (clipped to the right of the handle) */}
      <div ref={beforeRef} className="pointer-events-none absolute inset-0" style={{ clipPath: "inset(0 0 0 var(--pos))" }}>
        <Image
          src={before}
          alt={`${alt}, before cleaning`}
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
            if (e.key === "ArrowLeft") nudge(pos.current - 4);
            if (e.key === "ArrowRight") nudge(pos.current + 4);
            if (e.key === "Home") nudge(0);
            if (e.key === "End") nudge(100);
          }}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full bg-white text-brand-700 shadow-[0_8px_24px_rgba(13,26,46,0.45)] ring-1 ring-black/5 transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 active:scale-95"
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
