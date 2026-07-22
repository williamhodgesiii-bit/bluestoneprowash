import Image from "next/image";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";

// The finished "after" side of recent jobs. Uniform 4:5 tiles keep the grid
// tidy; tags name the service so each result is easy to place.
const shots = [
  { src: "/images/ba/driveway-after.jpg", alt: "Restored concrete driveway after pressure washing", tag: "Pressure Washing" },
  { src: "/images/ba/roof-after.jpg", alt: "Algae-free shingle roof after a soft wash", tag: "Roof Washing" },
  { src: "/images/ba/siding-after.jpg", alt: "Clean vinyl siding after a soft wash", tag: "Soft Washing" },
  { src: "/images/ba/sunroom-after.jpg", alt: "Crystal-clear sunroom glass after cleaning", tag: "Glass & Sunrooms" },
  { src: "/images/ba/fence-after.jpg", alt: "Brightened wood fence and siding after cleaning", tag: "Fence Cleaning" },
  { src: "/images/ba/gutters-after.jpg", alt: "Brightened gutters and clean fascia", tag: "Gutter Cleaning" },
  { src: "/images/ba/concrete-after.jpg", alt: "Clean concrete pad after pressure washing", tag: "Concrete Cleaning" },
  { src: "/images/ba/windows-after.jpg", alt: "Streak-free window glass after cleaning", tag: "Window Cleaning" },
];

export function Gallery() {
  return (
    <section className="bg-white py-8 sm:py-14">
      <Container>
        <SectionHeading
          kicker="Our work"
          title="The finished results"
          intro="Real Birmingham homes we've cleaned — driveways, roofs, siding, glass, and gutters, all done in-house."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 4) * 0.05}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-black/5">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-night-950/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 text-xs font-bold uppercase tracking-wide text-white sm:p-4 sm:text-sm">
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
