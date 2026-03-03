"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { motion, useInView } from "motion/react";
import Image from "next/image";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface Testimonial01Props {
  badge?: string;
  title?: string;
  testimonials?: Testimonial[];
}

const skillbridgeTestimonials: Testimonial[] = [
  // Slide 1: Student Success Story
  {
    quote:
      "I was struggling with calculus and nearly gave up. Found an amazing tutor on SkillBridge who broke down complex concepts into simple steps. My grades jumped from C to A in just 8 weeks. Worth every penny!",
    author: "Sarah Johnson",
    role: "High School Student",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },

  // Slide 2: Tutor Success Story
  {
    quote:
      "SkillBridge has transformed my tutoring side hustle into a thriving business. I can set my own schedule, reach students worldwide, and earn competitive rates. The platform handles bookings and payments seamlessly—I just focus on teaching.",
    author: "Michael Chen",
    role: "Mathematics Tutor",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },

  // Slide 3: Platform Impact
  {
    quote:
      "Before SkillBridge, finding a qualified tutor took weeks. Now it's instant—compare tutors, see reviews, and book in minutes. My son finally gets personalized attention from experts. The difference in his confidence is incredible.",
    author: "Emma Rodriguez",
    role: "Parent",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

export default function Testimonial01({
  testimonials = skillbridgeTestimonials,
}: Testimonial01Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef}>
      <div className="max-w-7xl mx-auto sm:px-16 px-4 pt-12 py-10 ">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="flex flex-col gap-3"
          >
            <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit">
              Testimonials
            </Badge>
            <h2 className="sm:text-5xl text-xl text-white leading-none font-medium tracking">
              Success Stories
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="pt-12 pb-8"
          >
            <Carousel>
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="grid grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-8 col-span-12 flex sm:flex-row flex-col sm:gap-10 gap-6 lg:pe-12">
                        <div className="shrink-0 flex items-start">
                          <Image
                            src="https://images.shadcnspace.com/assets/svgs/icon-quote.svg"
                            alt="muted quote"
                            className="dark:hidden"
                          />
                          <Image
                            src="https://images.shadcnspace.com/assets/svgs/icon-quote-white.svg"
                            alt="muted quote"
                            className="hidden dark:block"
                          />
                        </div>
                        <div className="flex flex-col gap-12">
                          <p className="sm:text-4xl text-xl text-slate-300">
                            {testimonial.quote}
                          </p>
                          <div>
                            <p className="text-base font-medium text-white">
                              {testimonial.author}
                            </p>
                            <p className="text-sm text-white/70">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <div className="rounded-xl overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className={"-top-20 left-auto right-12"} />
              <CarouselNext className={"-top-20 right-0"} />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
