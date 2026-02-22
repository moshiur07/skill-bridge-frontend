"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-[#FDD023] bg-transparent px-8 py-4 font-semibold text-[#FDD023] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#FDD023] hover:text-[#461D7C] hover:shadow-[0_0_30px_rgba(253,208,35,0.4)] focus:outline-none focus:ring-4 focus:ring-[#FDD023]/50"
    >
      <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
      <span className="text-base sm:text-lg">Go Back</span>
    </button>
  );
}
