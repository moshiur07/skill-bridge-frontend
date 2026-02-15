import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import {
  Award,
  BookOpen,
  GraduationCap,
  Target,
  TrendingUp,
} from "lucide-react";
import { BackgroundGradient } from "./ui/background-gradient";
import { NoiseBackground } from "./ui/noise-background";
import { themeColor } from "./helper/colorValue";
const AboutFeatureds = () => {
  return (
    <div className=" flex justify-center align-middle">
      <section className="py-16 md:py-24 px-5 lg:px-0 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Large Hero Block (Left) */}
            <BackgroundGradient>
              <Card className="p-12 flex items-center justify-center  min-h-125">
                <div className="text-center space-y-6">
                  {/* Option 1: Large Icon/Logo */}
                  <div className="mx-auto w-48 h-48 relative">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5 rounded-3xl rotate-6"></div>
                    <div
                      className={`absolute inset-0 bg-[${themeColor.dBlue}] rounded-3xl shadow-2xl flex items-center justify-center`}
                    >
                      <GraduationCap className="w-24 h-24 text-primary" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8 pt-8">
                    <div>
                      <div className="text-4xl font-bold text-primary">
                        1000+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expert Tutors
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-primary">
                        5000+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Students
                      </div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-primary">
                        50K+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sessions
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className={`pt-8 bg-[${themeColor.dBlue}] border-t`}>
                    <p className="text-xl font-medium text-foreground/80 italic">
                      &quot;Empowering learners worldwide through expert
                      tutoring&quot;
                    </p>
                  </div>
                </div>
              </Card>
            </BackgroundGradient>

            {/* Right Side - Two Cards Stacked */}
            <div className="space-y-8">
              {/* Top Card - Mission */}
              <BackgroundGradient>
                <Card className="p-8 text-black">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                      <p className=" leading-relaxed mb-4">
                        Connecting passionate students with expert tutors to
                        make quality education accessible to everyone, anywhere.
                        We believe learning should be personalized, engaging,
                        and affordable.
                      </p>
                      <NoiseBackground
                        containerClassName="w-fit p-2 rounded-full "
                        gradientColors={[
                          "rgb(255, 100, 150)",
                          "rgb(100, 150, 255)",
                          "rgb(255, 200, 100)",
                        ]}
                      >
                        <Button className="gap-2 rounded-full">
                          Learn More
                          <TrendingUp className="w-4 h-4" />
                        </Button>
                      </NoiseBackground>
                    </div>
                  </div>
                </Card>
              </BackgroundGradient>

              {/* Bottom Card - Why Choose Us */}
              <BackgroundGradient>
                <Card className="p-8text-black">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4">
                        Why Choose SkillBridge?
                      </h2>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-sm">
                            Expert tutors across all subjects
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-sm">
                            Flexible scheduling that fits your life
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-sm">
                            Affordable pricing with no hidden fees
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-sm">
                            Secure platform with 24/7 support
                          </span>
                        </div>
                      </div>
                      <NoiseBackground
                        containerClassName="w-fit p-2 rounded-full"
                        gradientColors={[
                          "rgb(255, 100, 150)",
                          "rgb(100, 150, 255)",
                          "rgb(255, 200, 100)",
                        ]}
                      >
                        <Button className="gap-2 rounded-full">
                          Discover More
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </NoiseBackground>
                    </div>
                  </div>
                </Card>
              </BackgroundGradient>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { AboutFeatureds };

export default AboutFeatureds;
