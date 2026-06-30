import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Horizontal nav lockup: blue mark + typeset wordmark.
 * Keeps the wordmark crisp & legible at small sizes (the stacked logo art
 * is used full-size in the footer instead).
 */
export function Brandmark({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Bluestone Pro Wash home" className={cn("group flex items-center gap-2.5", className)}>
      <Image
        src={onDark ? "/brand/icon-light.png" : "/brand/icon.png"}
        alt=""
        width={48}
        height={48}
        priority
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.15rem] font-extrabold leading-none tracking-tight sm:text-[1.28rem]",
            onDark ? "text-white" : "text-ink"
          )}
        >
          BLUESTONE
        </span>
        <span
          className={cn(
            "mt-[3px] text-[0.6rem] font-bold uppercase tracking-[0.34em]",
            onDark ? "text-brand-300" : "text-brand-600"
          )}
        >
          Pro Wash
        </span>
      </span>
    </Link>
  );
}
