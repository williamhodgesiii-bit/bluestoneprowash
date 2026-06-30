import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { SocialIcon } from "../ui/SocialIcon";
import { navLinks, serviceAreas, services, site, socials } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const activeSocials = socials.filter((s) => s.href);

  return (
    <footer className="bg-night-950 text-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image
              src="/brand/logo-light.png"
              alt="Bluestone Pro Wash"
              width={200}
              height={167}
              className="h-auto w-[140px]"
            />
            <p className="mt-5 max-w-xs leading-relaxed text-white/60">
              Pressure washing and exterior cleaning across Greater Birmingham. Locally owned and
              careful with every surface.
            </p>
            <Button href="/contact" className="mt-6" arrow>
              Get a free quote
            </Button>

            {activeSocials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {activeSocials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <SocialIcon name={s.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white/40">Services</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href="/services" className="text-white/75 transition-colors hover:text-brand-300">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white/40">Explore</h3>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link href="/" className="text-white/75 transition-colors hover:text-brand-300">
                  Home
                </Link>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 transition-colors hover:text-brand-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white/40">Get in touch</h3>
            <ul className="mt-5 flex flex-col gap-4 text-white/75">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 transition-colors hover:text-brand-300">
                  <Icon name="Phone" className="h-4 w-4 text-brand-400" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-brand-300">
                  <Icon name="Mail" className="h-4 w-4 text-brand-400" /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Clock" className="h-4 w-4 text-brand-400" /> {site.hours}
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MapPin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{site.region}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Areas strip */}
        <div className="mt-9 border-t border-white/10 pt-8">
          <p className="text-sm leading-relaxed text-white/45">
            <span className="font-semibold text-white/70">Service area: </span>
            {serviceAreas.join(" · ")} &amp; surrounding communities.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Icon name="MapPin" className="h-4 w-4 text-brand-400" /> Locally owned in Birmingham
          </p>
        </div>
      </Container>
    </footer>
  );
}
