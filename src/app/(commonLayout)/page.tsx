import { Footer7 } from "@/components/footer7";
import HeroBanner from "@/components/home/hero";
import { Navbar5 } from "@/components/navbar5";

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
      <Footer7 />
    </div>
  );
};

export default HomePage;
