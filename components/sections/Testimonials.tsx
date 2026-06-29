import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { SocialIcon } from "../ui/SocialIcon";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { site, testimonials } from "@/lib/site";

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
              ? "A few words from homeowners who trusted us with their property."
              : "We let our work — and our customers — speak for us. Our reviews live on Google, and we're glad to share references right in your neighborhood."
          }
        />

        {hasReviews ? (
          <>
            <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
              {testimonials.map((t) => (
                <StaggerItem key={t.name}>
                  <figure className="relative flex h-full flex-col rounded-2xl border border-fog-200 bg-fog-50 p-7 transition-shadow duration-500 hover:shadow-card">
                    <div className="flex gap-0.5 text-brand-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="Star" className="h-4 w-4 fill-brand-500" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 flex items-center justify-between border-t border-fog-200 pt-5">
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 font-display text-base font-extrabold text-white">
                          {t.name.charAt(0)}
                        </span>
                        <div>
                          <div className="font-bold text-ink">{t.name}</div>
                          <div className="text-sm text-ink-soft">{t.location}, AL</div>
                        </div>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-card">
                        {t.service}
                      </span>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>
            {site.googleReviewsUrl && (
              <Reveal className="mt-10 flex justify-center">
                <Button href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" variant="outline" arrow>
                  Read more reviews on Google
                </Button>
              </Reveal>
            )}
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
                {site.googleReviewsUrl ? (
                  <Button href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" arrow>
                    Read Our Google Reviews
                  </Button>
                ) : (
                  <Button href="#quote" arrow>
                    Ask Us for References
                  </Button>
                )}
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
