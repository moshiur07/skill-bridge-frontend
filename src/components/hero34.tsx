import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Hero34Props {
  className?: string;
}

const Hero34 = ({ className }: Hero34Props) => {
  return (
    <section className={cn("", className)}>
      <div className="border-2 h-[80vh]">
        <div className="grid items-center gap-8  lg:grid-cols-2 w-full">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-4xl text-[#E9B200] font-bold text-pretty lg:text-6xl">
              Connect with Expert{" "}
              <span className="text-[#FCECAE] font-extrabold">tutors</span>,
              Master Any Skill
            </h1>
            <p className="mb-8 max-w-xl text-gray-300 lg:text-xl">
              Find the perfect tutor for your learning goals. Browse hundreds of
              qualified experts, book sessions instantly, and start learning
              today.
            </p>
            <Link href={"/tutors"}>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button className="bg-[#FCECAE] text-1xl text-[#461D7C] hover:text-white hover:cursor-pointer">
                  Find Your Tutor
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Link>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/5212675/pexels-photo-5212675.jpeg"
              alt="placeholder hero"
              className="h-56 w-1xl rounded-b-4xl"
            />
            <img
              src="https://images.pexels.com/photos/4261793/pexels-photo-4261793.jpeg"
              alt="placeholder hero"
              className="h-56 w-1xl rounded-b-4xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero34 };
