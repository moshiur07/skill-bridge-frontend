import AboutFeatureds from "@/components/about3";
import { Faq5 } from "@/components/faq5";
import HeroBanner from "@/components/modules/home/hero";

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
      */}
      {/* <Banner /> */}
      {/* <Navbar5 /> */}
      <HeroBanner />
      <div className="bg-linear-60 from-[#461D7C] to-[#E9B200]">
        <AboutFeatureds />
        <Faq5 />
        <Testimonial01 />
        {/*  become a tutor */}
      </div>
    </div>
  );
};

export default HomePage;
