import Link from "next/link";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { services } from "@/lib/site";

/** Compact services row for the home page — full detail lives on /services. */
export function ServicesTeaser() {
  return (
    <section className="cv bg-white py-8 sm:py-14">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="kicker text-brand-600">What we clean</span>
            <h2 className="mt-3 text-[clamp(1.5rem,3.6vw,2.7rem)] font-extrabold leading-[1.06] text-ink">
              One crew for the whole exterior
            </h2>
            <div className="rule-blue mt-4" />
          </div>
          <Button href="/services" variant="outline" arrow className="shrink-0">
            See all services
          </Button>
        </div>

        <Stagger className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <Link
                href="/services"
                className="group flex h-full flex-col rounded-xl border border-steel-200 bg-white p-5 transition-colors hover:border-brand-300"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="mt-4 font-extrabold leading-tight text-ink">{s.name}</span>
                <span className="mt-1 text-xs text-ink-soft">{s.surfaces}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-6 text-sm text-ink-soft">
          Not sure which you need?{" "}
          <Link href="/contact" className="font-bold text-brand-700 hover:text-brand-600">
            Tell us about the job
          </Link>{" "}
          and we&apos;ll point you the right way.
        </Reveal>
      </Container>
    </section>
  );
}
