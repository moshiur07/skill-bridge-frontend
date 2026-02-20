import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  Target,
  BookOpen,
  Award,
  Globe,
  Clock,
  Shield,
  TrendingUp,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { themeColor } from "@/components/helper/colorValue";
import AboutFeatureds from "@/components/about3";
import Link from "next/link";
import { userService } from "@/components/services/user.service";

export default async function AboutPage() {
  const { data } = await userService.getSession();
  console.log("session from aboutpage", data);
  return (
    <div
      className={`flex justify-center mx-auto bg-linear-150 from-[${themeColor.dBlue}] via-[${themeColor.vanilla}] to-[${themeColor.dYellow}]`}
    >
      <div className="min-h-screen ">
        {/* Hero Section with Grid Layout */}
        <AboutFeatureds />

        {/* Our Story Section */}
        <section
          className={`py-16 md:py-24 px-5 lg:px-0 flex justify-center text-[${themeColor.vanilla}] text-center`}
        >
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How SkillBridge Started
              </h2>
              <p className="text-lg text-[#40E0D0]">
                Born from a simple idea: everyone deserves access to quality
                education
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p>
                SkillBridge was founded in 2024 by a group of educators and
                technologists who saw a gap in accessible, personalized
                education. We noticed that while online learning was growing,
                students still struggled to find the right tutors who could
                truly understand their individual needs.
              </p>
              <p>
                What started as a small platform connecting local tutors and
                students has grown into a global community of over 1,000 expert
                tutors and 5,000+ active learners. Every day, we help students
                achieve their academic goals, from elementary math to advanced
                university subjects.
              </p>
              <p>
                Our platform is built on three core principles: accessibility,
                quality, and trust. We carefully vet every tutor, ensure
                transparent pricing, and provide the tools needed for effective
                online learning.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 md:py-24 px-5 lg:px-0">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Values</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We Stand For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Value 1 */}
              <Card className="p-6 text-center bg-slate-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-sm text-slate-200">
                  Every tutor is carefully vetted to ensure expert-level
                  knowledge and teaching ability.
                </p>
              </Card>

              {/* Value 2 */}
              <Card className="p-6 text-center bg-slate-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trust</h3>
                <p className="text-sm text-slate-200">
                  Secure payments, verified profiles, and transparent reviews
                  build confidence.
                </p>
              </Card>

              {/* Value 3 */}
              <Card className="p-6 text-center bg-slate-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-sm text-slate-200">
                  Learning should be available to everyone, regardless of
                  location or background.
                </p>
              </Card>

              {/* Value 4 */}
              <Card className="p-6 text-center bg-slate-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Flexibility</h3>
                <p className="text-sm text-slate-200">
                  Learn on your schedule with tutors available across all time
                  zones.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section (Optional) */}
        <section className="py-16 md:py-24 px-5 lg:px-0">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Team</Badge>
              <h2 className="text-3xl md:text-4xl font-bold  mb-4">
                Meet the People Behind SkillBridge
              </h2>
              <p className="text-lg text-[#40E0D0] max-w-2xl mx-auto">
                A passionate team dedicated to revolutionizing online education
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Team Member 1 */}
              <Card className="p-6 text-center bg-slate-500">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1">Sarah Johnson</h3>
                <p className="text-sm text-slate-200 mb-3">Founder & CEO</p>
                <p className="text-xs text-slate-200">
                  Former educator with 15+ years of teaching experience
                </p>
              </Card>

              {/* Team Member 2 */}
              <Card className="p-6 text-center bg-slate-500">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1">Michael Chen</h3>
                <p className="text-sm text-slate-200 mb-3">CTO</p>
                <p className="text-xs text-slate-200">
                  Tech innovator passionate about edtech solutions
                </p>
              </Card>

              {/* Team Member 3 */}
              <Card className="p-6 text-center bg-slate-500">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1">Emily Rodriguez</h3>
                <p className="text-sm text-slate-200 mb-3">Head of Education</p>
                <p className="text-xs text-slate-200">
                  Curriculum specialist ensuring quality learning experiences
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`flex justify-center px-5 lg:px-0 py-16 md:py-24 bg-[${themeColor.lBlue}] text-primary-foreground`}
        >
          <div className="container text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students who are achieving their academic goals
              with SkillBridge
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={"/tutors"}>
                <Button
                  size="lg"
                  variant="secondary"
                  className=" hover:cursor-pointer"
                >
                  Browse Tutors
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent  hover:cursor-pointer border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Become a Tutor
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
