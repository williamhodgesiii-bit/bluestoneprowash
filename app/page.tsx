import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { Transformations } from "@/components/sections/Transformations";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteBand } from "@/components/sections/QuoteBand";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesTeaser />
      <Transformations />
      <Testimonials limit={3} />
      <ServiceArea />
      <QuoteBand />
    </>
  );
}
