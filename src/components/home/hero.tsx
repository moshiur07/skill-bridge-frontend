import Image from "next/image";
import { Button } from "../ui/button";

const HeroBanner = () => {
  return (
    <div>
      {/* <section className="relative  bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden"> */}
      <section className="relative  bg-gradient-to-br from-[#7549B1] to-[#E9B200] overflow-hidden">
        {/* Organic Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Left curved line decoration */}
          <svg
            className="absolute left-0 top-0 h-full w-64 text-teal-400/30"
            viewBox="0 0 200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 0 Q 100 200 0 400 T 0 800"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 30 0 Q 130 200 30 400 T 30 800"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 z-10">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#FDD023] leading-tight">
                Connect with Expert{" "}
                <span className="text-[#461D7C]">tutors</span> Master Any Skill
              </h1>
              <p className="text-lg text-gray-800 max-w-md">
                Find the perfect tutor for your learning goals. Browse hundreds
                of qualified experts, book sessions instantly, and start
                learning today.
              </p>
              <Button
                size="lg"
                className=" text-[18px]  hover:cursor-pointer   bg-slate-800 hover:bg-slate-700"
              >
                Find your tutor
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </div>

            {/* Right Images with Blob Shapes */}
            <div className="relative h-[500px] lg:h-[600px]">
              {/* First Image - Top Left with Teal Blob */}
              <div className="absolute top-0 left-0 w-[280px] h-[280px] lg:w-[340px] lg:h-[340px] z-20">
                {/* Teal Blob Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-300 to-teal-400 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-[morph_8s_ease-in-out_infinite]"></div>

                {/* Image Container */}
                <div className="absolute inset-6 overflow-hidden rounded-full">
                  <Image
                    src="https://images.pexels.com/photos/4261793/pexels-photo-4261793.jpeg"
                    alt="Language teacher"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Video call icon */}
                <div className="absolute top-4 right-4 bg-white p-2.5 rounded-xl shadow-lg z-10">
                  <svg
                    className="w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              </div>

              {/* Second Image - Bottom Right with Yellow Blob */}
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] z-10">
                {/* Yellow Blob Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-[morph_10s_ease-in-out_infinite_reverse]"></div>

                {/* Image Container */}
                <div className="absolute inset-8 overflow-hidden rounded-full">
                  <Image
                    src="https://images.pexels.com/photos/5212675/pexels-photo-5212675.jpeg"
                    alt="Language student"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Video call icon */}
                <div className="absolute top-16 left-8 bg-white p-2.5 rounded-xl shadow-lg z-10">
                  <svg
                    className="w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012-2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-12 right-24 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
              </div>
              <div className="absolute top-20 right-12 flex flex-col gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
