import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { SocialIcon } from "../ui/SocialIcon";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { site, testimonials } from "@/lib/site";

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 text-amber-400 ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="Star" className="h-4 w-4 fill-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials({ limit, bg = "steel" }: { limit?: number; bg?: "white" | "steel" }) {
  const list = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className={`cv py-14 sm:py-20 ${bg === "steel" ? "bg-steel-50" : "bg-white"}`}>
      <Container>
        <SectionHeading
          kicker="Reviews"
          title="What the neighbors say"
          intro="Real, verified five-star reviews from Birmingham homeowners who trusted us with their property."
        />

        <Stagger className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <figure className="flex h-full flex-col rounded-xl border border-steel-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <Stars />
                  <SocialIcon name="google" className="h-5 w-5 text-steel-400" />
                </div>
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-steel-100 pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 font-display text-base font-extrabold text-white">
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

        <Reveal className="mt-9 flex justify-center">
          <Button href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" variant="outline" arrow>
            Read more reviews on Google
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
