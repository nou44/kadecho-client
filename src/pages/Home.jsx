import Hero from "../components/home/Hero";
import Collections from "../components/Collections/Collections";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import Services from "../components/Services/Services";
import CTASection from "../components/cta/CTASection";
import PromoSlider from "../components/PromoSlider";
import WaveDivider from "../components/WaveDivider";

export default function Home() {
  return (
    <>
      <Hero />

      <PromoSlider />

      <Collections />

      <WaveDivider />

      <WhyChoose />

     <WaveDivider />

      <FeaturedProjects />

      <Services />
      <CTASection />
    </>
  );
}