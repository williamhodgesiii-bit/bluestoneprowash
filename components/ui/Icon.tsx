import {
  Droplets,
  Waves,
  Home,
  PanelsTopLeft,
  Shovel,
  PhoneCall,
  ClipboardCheck,
  Truck,
  Sparkles,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Tag,
  Phone,
  Star,
  Check,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Mail,
  MoveHorizontal,
  Users,
  type LucideIcon,
} from "lucide-react";

const registry = {
  Droplets,
  Waves,
  Home,
  PanelsTopLeft,
  Shovel,
  PhoneCall,
  ClipboardCheck,
  Truck,
  Sparkles,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Tag,
  Phone,
  Star,
  Check,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Mail,
  MoveHorizontal,
  Users,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

export function Icon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
