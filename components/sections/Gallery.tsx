import Image from "next/image";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";

const shots = [
  { src: "/images/house-showcase.jpg", alt: "Freshly cleaned Birmingham home exterior", tag: "House Washing", ratio: "aspect-[16/10]" },
  { src: "/images/action-window-door.jpg", alt: "Streak-free window and glass-door cleaning", tag: "Window Cleaning", ratio: "aspect-[4/5]" },
  { src: "/images/ba/siding-after.jpg", alt: "Algae-free vinyl siding after a soft wash", tag: "Soft Washing", ratio: "aspect-[4/5]" },
  { src: "/images/action-waterfed-pole.jpg", alt: "Water-fed pole reaching second-story windows", tag: "Pure-Water System", ratio: "aspect-[3/2]" },
  { src: "/images/ba/driveway-after.jpg", alt: "Restored concrete driveway", tag: "Pressure Washing", ratio: "aspect-[3/4]" },
  { src: "/images/ba/gutters-after.jpg", alt: "Brightened gutters and clean fascia", tag: "Gutter Cleaning", ratio: "aspect-[4/5]" },
];

export function Gallery() {
  return (
    <section className="bg-white py-8 sm:py-14">
      <Container>
        <SectionHeading
          kicker="Our work"
          title="Recent jobs around town"
          intro="A look at recent work across Greater Birmingham: siding, roofs, glass, and concrete."
        />

        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 3) * 0.06} className="break-inside-avoid">
              <figure className={`group relative overflow-hidden rounded-xl ${s.ratio}`}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/75 via-night-950/0 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-bold uppercase tracking-wide text-white">
                  {s.tag}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
