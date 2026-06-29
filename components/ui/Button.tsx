import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type Variant = "primary" | "light" | "outline" | "outlineDark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_12px_34px_-10px_rgba(5,97,187,0.65)] hover:bg-brand-500 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(5,97,187,0.75)]",
  light:
    "bg-white text-ink shadow-[0_12px_30px_-12px_rgba(8,32,66,0.4)] hover:-translate-y-0.5 hover:bg-fog-100",
  outline:
    "border-2 border-brand-600/25 text-brand-700 hover:border-brand-600 hover:bg-brand-50",
  outlineDark:
    "border border-white/25 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/55",
  ghost: "text-ink hover:text-brand-600",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  icon?: string;
  iconLeft?: string;
  arrow?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  iconLeft,
  arrow,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} className="h-[1.05em] w-[1.05em]" />}
      {children}
      {arrow && (
        <Icon
          name="ArrowRight"
          className="h-[1.05em] w-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
      {icon && <Icon name={icon} className="h-[1.05em] w-[1.05em]" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
