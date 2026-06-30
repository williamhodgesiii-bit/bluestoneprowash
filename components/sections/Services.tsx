import Link from "next/link";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../motion/Reveal";
import { services, site, type Service } from "@/lib/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex h-full flex-col border border-steel-200 bg-white p-6 transition-colors hover:border-brand-300 rounded-xl">
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-50 text-brand-600">
          <Icon name={service.icon} className="h-6 w-6" strokeWidth={2} />
        </span>
        <span className="kicker text-[0.68rem] text-steel-400">{service.surfaces.split(" · ")[0]}</span>
      </div>

      <h3 className="mt-5 text-xl font-extrabold tracking-tight text-ink">{service.name}</h3>
      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{service.blurb}</p>

      <ul className="mt-4 flex flex-col gap-2">
        {service.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-ink">
            <Icon name="Check" className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
            {p}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="mt-5 inline-flex items-center gap-1.5 border-t border-steel-100 pt-4 text-sm font-bold text-brand-700 hover:text-brand-600"
      >
        Get a quote for this
        <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export function Services() {
  return (
    <section className="cv bg-white py-14 sm:py-20">
      <Container>
        <SectionHeading
          kicker="What we clean"
          title="The right wash for every surface"
          intro="High pressure where it belongs, gentle soft-washing where it counts. We never blast a roof or split your siding — we match the method to the material."
        />

        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <ServiceCard service={s} />
            </StaggerItem>
          ))}

          {/* CTA tile sits right in the grid instead of floating beneath it */}
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col justify-between rounded-xl bg-brand-600 p-6 text-white">
              <div>
                <h3 className="text-xl font-extrabold">Not sure what you need?</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/85">
                  Tell us what&apos;s looking rough and we&apos;ll tell you the safe way to clean it —
                  and what it&apos;ll cost. No pressure.
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-bold text-brand-700 hover:bg-steel-100"
                >
                  Get a free quote <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 py-3 text-sm font-bold text-white hover:bg-white/10"
                >
                  <Icon name="Phone" className="h-4 w-4" /> {site.phoneDisplay}
                </a>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
