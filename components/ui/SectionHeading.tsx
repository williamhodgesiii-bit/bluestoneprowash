import { cn } from "@/lib/utils";
import { Reveal } from "../motion/Reveal";

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {kicker && (
        <span className={cn("kicker", onDark ? "text-brand-300" : "text-brand-600")}>
          {kicker}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 text-[clamp(1.75rem,3.6vw,2.7rem)] font-extrabold leading-[1.06]",
          onDark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      <div className={cn("rule-blue mt-4", align === "center" && "mx-auto", onDark && "bg-brand-400")} />
      {intro && (
        <p className={cn("mt-4 text-[1.05rem] leading-relaxed", onDark ? "text-white/70" : "text-ink-soft")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
