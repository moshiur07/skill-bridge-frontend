import About3 from "@/components/about3";
import { Faq5 } from "@/components/faq5";
import { Footer7 } from "@/components/footer7";
import HeroBanner from "@/components/home/hero";
import { Navbar5 } from "@/components/navbar5";
import Testimonial01 from "@/components/shadcn-space/blocks/testimonial-02/testimonial";

const HomePage = () => {
  return (
    <div>
      {/* 
          -> Navbar 
          -> Banner
          -> Tutor from top unis(uni logos)
          -> how skillbridge works/ why skillbridge
          -> featured tutors
          -> testimonials
          -> become a tutor
          -> become a tutor 
      */}
      {/* <Banner /> */}
      <Navbar5 />
      <HeroBanner />
      <About3 />
      <Faq5 />
      <Testimonial01 />
      <Footer7 />
    </div>
  );
};

export default HomePage;
