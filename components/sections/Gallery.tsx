import Image from "next/image";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";

const shots = [
  { src: "/images/house-showcase.jpg", alt: "Freshly cleaned Birmingham home exterior", tag: "House Washing", ratio: "aspect-[16/10]" },
  { src: "/images/action-window-door.jpg", alt: "Streak-free window and glass-door cleaning", tag: "Window Cleaning", ratio: "aspect-[4/5]" },
  { src: "/images/ba/roof-after.jpg", alt: "Algae-free roof after a soft wash", tag: "Roof Washing", ratio: "aspect-[3/2]" },
  { src: "/images/action-waterfed-pole.jpg", alt: "Water-fed pole reaching second-story windows", tag: "Pure-Water System", ratio: "aspect-[3/2]" },
  { src: "/images/ba/driveway-after.jpg", alt: "Restored concrete driveway", tag: "Pressure Washing", ratio: "aspect-[4/5]" },
  { src: "/images/ba/sunroom-after.jpg", alt: "Crystal-clear sunroom glass", tag: "Glass Detailing", ratio: "aspect-[16/10]" },
];

export function Gallery() {
  return (
    <section className="relative bg-fog-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Work"
          intro="A look at recent jobs around Greater Birmingham — siding, roofs, glass, and concrete."
        />

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <figure className={`group relative overflow-hidden rounded-2xl shadow-card ${s.ratio}`}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/75 via-night-950/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-1 items-center gap-2 p-5 text-white opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-spray" />
                  <span className="text-sm font-bold uppercase tracking-wide">{s.tag}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
