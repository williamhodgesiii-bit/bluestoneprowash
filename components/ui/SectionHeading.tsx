import { cn } from "@/lib/utils";
import { Reveal } from "../motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className={cn("eyebrow", onDark ? "text-spray" : "text-brand-600")}>
            <span className={cn("h-px w-7", onDark ? "bg-spray/60" : "bg-brand-600/50")} />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.05]",
            onDark ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={cn("mt-5 text-lg leading-relaxed", onDark ? "text-white/70" : "text-ink-soft")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
