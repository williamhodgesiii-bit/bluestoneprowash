import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Transformations } from "@/components/sections/Transformations";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Faq } from "@/components/sections/Faq";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Footer } from "@/components/sections/Footer";
import { MobileCallBar } from "@/components/sections/MobileCallBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Transformations />
        <Process />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <ServiceArea />
        <Faq />
        <QuoteCTA />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
