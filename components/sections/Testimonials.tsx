import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { SocialIcon } from "../ui/SocialIcon";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { site, testimonials } from "@/lib/site";

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 text-amber-400 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="Star" className="h-4 w-4 fill-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const hasReviews = testimonials.length > 0;

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Reviews"
          title="What Our Customers Say"
          intro={
            hasReviews
              ? "Real, verified reviews from homeowners who trusted us with their property."
              : "We let our work — and our customers — speak for us. Our reviews live on Google, and we're glad to share references in your neighborhood."
          }
        />

        {hasReviews ? (
          <>
            <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Stars className="scale-110" />
              <p className="text-sm font-semibold text-ink-soft">
                <span className="font-display text-base font-extrabold text-ink">5.0</span> · Verified
                Google reviews
              </p>
            </Reveal>

            <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <StaggerItem key={t.name} className="h-full">
                  <figure className="relative flex h-full flex-col rounded-2xl border border-fog-200 bg-fog-50 p-7 transition-shadow duration-500 hover:shadow-card">
                    <div className="flex items-center justify-between">
                      <Stars />
                      <SocialIcon name="google" className="h-5 w-5 text-ink-soft/50" />
                    </div>
                    <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-fog-200 pt-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-600 font-display text-base font-extrabold text-white">
                        {t.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-ink">{t.name}</div>
                        <div className="text-xs text-ink-soft">
                          {t.tag ? `${t.tag} · ` : ""}Verified Google review
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-10 flex justify-center">
              <Button href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" variant="outline" arrow>
                Read more reviews on Google
              </Button>
            </Reveal>
          </>
        ) : (
          <Reveal className="mx-auto mt-12 max-w-2xl">
            <div className="rounded-2xl border border-fog-200 bg-fog-50 p-8 text-center shadow-card sm:p-10">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-brand-600 shadow-card">
                <SocialIcon name="google" className="h-7 w-7" />
              </span>
              <p className="mx-auto mt-6 max-w-md text-ink">
                Reading reviews from real neighbors is the best way to know what to expect. Take a look at
                ours, or just ask and we&apos;ll point you to recent work nearby.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" arrow>
                  Read Our Google Reviews
                </Button>
                <Button href={site.phoneHref} variant="outline" iconLeft="Phone">
                  {site.phoneDisplay}
                </Button>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
