import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { site } from "@/lib/site";

/**
 * Compact, high-contrast call-to-action used at the foot of most pages.
 * The full quote form lives on /contact — this just funnels people there
 * or to the phone.
 */
export function QuoteBand({
  title = "Ready for a free quote?",
  blurb = "Tell us what needs cleaning and we'll send a clear, upfront price, usually the same day.",
}: {
  title?: string;
  blurb?: string;
}) {
  return (
    <section className="bg-night-950 text-white">
      <Container className="flex flex-col items-center gap-6 py-8 text-center sm:py-12 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.4rem,3vw,2.3rem)] font-extrabold leading-[1.08]">{title}</h2>
          <p className="mt-3 leading-relaxed text-white/70">{blurb}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg" arrow>
            Get a free quote
          </Button>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-bold text-white transition-colors hover:border-white/70 hover:bg-white/10"
          >
            <Icon name="Phone" className="h-5 w-5 text-brand-300" /> {site.phoneDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}
