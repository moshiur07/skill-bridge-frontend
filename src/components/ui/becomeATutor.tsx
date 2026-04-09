"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react";

interface BecomeATutorBannerProps {
  ctaLink?: string;
  learnMoreLink?: string;
}

export default function BecomeATutorBanner({
  ctaLink = "/become-tutor",
  learnMoreLink = "/about",
}: BecomeATutorBannerProps) {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orb 1 */}
        {/* <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div> */}

        {/* Gradient orb 2 */}
        {/* <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div> */}

        {/* Gradient orb 3 */}
        {/* <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div> */}

        {/* Grid pattern overlay */}
        {/* <div className="absolute inset-0 bg-grid-pattern opacity-5"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 w-fit mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Join Our Community
                </span>
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Share Your
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Expertise & Inspire
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Become a SkillBridge tutor and turn your knowledge into a
                  thriving income. Set your own schedule, connect with eager
                  learners worldwide, and make a real difference.
                </p>
              </div>

              {/* Benefits - Horizontal cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                  <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                      Flexible Earnings
                    </p>
                    <p className="text-xs text-slate-400">Set your own rates</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <div className="p-2 rounded-lg bg-cyan-500/20 flex-shrink-0">
                    <Users className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                      Global Reach
                    </p>
                    <p className="text-xs text-slate-400">Connect worldwide</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
                <Link
                  href="/become-tutor"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 flex items-center justify-center gap-2 text-center"
                >
                  <span>Get Started Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={learnMoreLink}
                  className="px-8 py-4 border border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-white/5 transition-all duration-300 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right side - Visual Element */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                {/* Floating cards */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Main illustration card */}
                  <div className="relative w-full max-w-sm">
                    {/* Card background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>

                    {/* Stats cards floating around */}
                    <div className="absolute -top-6 -right-6 p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 shadow-xl backdrop-blur-sm transform hover:scale-105 transition-transform">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-cyan-400">5K+</p>
                        <p className="text-xs text-slate-300">Active Tutors</p>
                      </div>
                    </div>

                    <div className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 shadow-xl backdrop-blur-sm transform hover:scale-105 transition-transform">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">
                          ₹50K+
                        </p>
                        <p className="text-xs text-slate-300">Avg Monthly</p>
                      </div>
                    </div>

                    <div className="absolute top-1/2 -right-8 p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 shadow-xl backdrop-blur-sm transform hover:scale-105 transition-transform">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">
                          4.9★
                        </p>
                        <p className="text-xs text-slate-300">Avg Rating</p>
                      </div>
                    </div>

                    {/* Center visual */}
                    <div className="relative z-10 p-8 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl mb-2">👨‍🏫</div>
                          <p className="text-slate-300 text-sm font-medium">
                            Start Teaching
                          </p>
                          <p className="text-slate-400 text-xs mt-1">
                            In Minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes grid {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-grid-pattern {
          background-image:
            linear-gradient(
              0deg,
              transparent 24%,
              rgba(100, 116, 139, 0.05) 25%,
              rgba(100, 116, 139, 0.05) 26%,
              transparent 27%,
              transparent 74%,
              rgba(100, 116, 139, 0.05) 75%,
              rgba(100, 116, 139, 0.05) 76%,
              transparent 77%,
              transparent
            ),
            linear-gradient(
              90deg,
              transparent 24%,
              rgba(100, 116, 139, 0.05) 25%,
              rgba(100, 116, 139, 0.05) 26%,
              transparent 27%,
              transparent 74%,
              rgba(100, 116, 139, 0.05) 75%,
              rgba(100, 116, 139, 0.05) 76%,
              transparent 77%,
              transparent
            );
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}
