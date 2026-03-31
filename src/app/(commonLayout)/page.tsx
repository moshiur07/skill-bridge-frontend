import AboutFeatureds from "@/components/about3";
import { Faq5 } from "@/components/faq5";
import HeroBanner from "@/components/modules/home/hero";
import TutorBanner from "@/components/modules/home/tutorBanner";

import Testimonial01 from "@/components/shadcn-space/blocks/testimonial-02/testimonial";

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <div className="bg-linear-60 from-[#461D7C] to-[#E9B200] lg:px-12 px-5 py-5">
        <AboutFeatureds />
        <Faq5 />
        <Testimonial01 />
        <TutorBanner />
      </div>
    </div>
  );
};

export default HomePage;
