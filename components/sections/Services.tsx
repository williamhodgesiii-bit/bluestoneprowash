import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../motion/Reveal";
import { services, type Service } from "@/lib/site";
import { cn } from "@/lib/utils";

function ServiceCard({ service, large }: { service: Service; large?: boolean }) {
  return (
    <a
      href="#quote"
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fog-200 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift",
        large ? "sm:p-8" : ""
      )}
    >
      {/* hover spray glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-400/0 blur-2xl transition-all duration-500 group-hover:bg-brand-400/20" />

      <div className="relative flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
          <Icon name={service.icon} className="h-7 w-7" strokeWidth={2} />
        </span>
        <Icon
          name="ArrowUpRight"
          className="h-5 w-5 text-fog-300 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
        />
      </div>

      <h3 className="relative mt-6 text-2xl font-extrabold tracking-tight text-ink">
        {service.name}
      </h3>
      <p className="relative mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{service.blurb}</p>

      <ul className="relative mt-5 flex flex-col gap-2">
        {service.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-ink">
            <Icon name="Check" className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
            {p}
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex items-center gap-2 border-t border-fog-200 pt-4 text-xs font-semibold uppercase tracking-wider text-ink-soft/70">
        <Icon name="Droplets" className="h-3.5 w-3.5 text-brand-400" />
        {service.surfaces}
      </div>
    </a>
  );
}

export function Services() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <section id="services" className="relative scroll-mt-24 bg-fog-50 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our Services"
            title={<>Cleaning Services<br className="hidden sm:block" /> for Every Surface</>}
            intro="Five specialized services, each matched to the surface it's cleaning — so your home gets the care it needs, not a one-size-fits-all approach."
          />
        </div>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <ServiceCard service={s} large />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {rest.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
