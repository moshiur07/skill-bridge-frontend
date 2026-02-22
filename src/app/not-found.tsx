import Link from "next/link";
import { Home } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#461D7C] via-[#7549B1] to-[#461D7C]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7549B1]/30 via-transparent to-[#E9B200]/20 animate-pulse" />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        {/* 404 Text with glow effect */}
        <div className="mb-8 text-center">
          <h1 className="text-[120px] font-bold leading-none tracking-tighter text-[#FDD023] drop-shadow-[0_0_30px_rgba(253,208,35,0.5)] sm:text-[180px] lg:text-[240px]">
            404
          </h1>
          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-transparent via-[#E9B200] to-transparent mx-auto" />
        </div>

        {/* Message */}
        <div className="mb-12 max-w-md text-center">
          <h2 className="mb-4 text-2xl font-semibold text-[#FCECAE] sm:text-3xl lg:text-4xl">
            Page Not Found
          </h2>
          <p className="text-base text-[#FCECAE]/80 sm:text-lg">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
        </div>

        {/* Noise Background Container for Buttons */}
        <div className="relative rounded-2xl bg-[#461D7C]/40 p-8 backdrop-blur-sm border border-[#7549B1]/50 shadow-2xl">
          {/* Noise overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Buttons Container */}
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            {/* Go Home Button */}
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#E9B200] to-[#FDD023] px-8 py-4 font-semibold text-[#461D7C] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(233,178,0,0.6)] focus:outline-none focus:ring-4 focus:ring-[#FDD023]/50"
            >
              <Home className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              <span className="text-base sm:text-lg">Go to Home</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#FDD023] to-[#E9B200] opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            {/* Go Back Button */}
            <BackButton />
          </div>
        </div>

        {/* Decorative floating elements */}
        <div
          className="absolute top-20 left-10 h-20 w-20 rounded-full bg-[#E9B200]/20 blur-xl animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-20 right-10 h-32 w-32 rounded-full bg-[#FDD023]/20 blur-xl animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-40 right-20 h-16 w-16 rounded-full bg-[#FCECAE]/20 blur-xl animate-bounce"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />
      </div>
    </div>
  );
}
