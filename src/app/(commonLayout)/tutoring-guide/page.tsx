import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const gettingStarted = [
  {
    step: "1. Create your tutor account",
    detail:
      "Sign up as a tutor and verify your email/phone so students can trust your profile.",
  },
  {
    step: "2. Complete your tutor profile",
    detail:
      "Add subjects, class level, teaching style, bio, experience, and a clear profile photo.",
  },
  {
    step: "3. Set your availability",
    detail:
      "Use your dashboard to define available days/time slots and keep your calendar updated.",
  },
  {
    step: "4. Set pricing and session format",
    detail:
      "Choose your hourly rate and mention whether you support online, offline, or both.",
  },
  {
    step: "5. Start receiving bookings",
    detail:
      "Students can browse, book, and pay. Confirm sessions quickly for better ranking.",
  },
];

const bestPractices = [
  "Respond to booking requests quickly.",
  "Keep profile information updated (subjects, rates, availability).",
  "Prepare lesson goals before each class.",
  "Track student progress and share feedback regularly.",
  "Be punctual and professional in every session.",
];

const policyCards = [
  {
    title: "Booking & Confirmation",
    points: [
      "Confirm or decline requests as soon as possible.",
      "Avoid last-minute cancellations unless emergency.",
      "Share session expectations before class.",
    ],
  },
  {
    title: "Payments",
    points: [
      "Payments are tied to booked sessions in the platform flow.",
      "Keep completed session records clear and accurate.",
      "Review payout details from your dashboard.",
    ],
  },
  {
    title: "Safety & Conduct",
    points: [
      "Use respectful communication with students/guardians.",
      "Do not share sensitive personal information publicly.",
      "Report suspicious behavior to platform support.",
    ],
  },
];

export default function TutoringGuidePage() {
  return (
    <div className=" bg-gradient-to-br from-[#7549B1] to-[#E9B200] pt-10">
      <main className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

        {/* Hero */}
        <section className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/20 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10">
          <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
            SkillBridge Tutor Guide
          </Badge>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Become a successful tutor on{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </h1>

          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            This guide explains how to set up your tutor profile, receive
            bookings, teach effectively, and maintain high-quality sessions on
            SkillBridge.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/signup?role=tutor">Start as Tutor</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/become-tutor">Learn About Tutoring</Link>
            </Button>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold sm:text-2xl">Getting Started</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gettingStarted.map((item) => (
              <Card
                key={item.step}
                className="h-full border-border/60 bg-card/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-base">{item.step}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="border-border/60 bg-card/70 backdrop-blur">
            <CardHeader>
              <CardTitle>Best Practices for Better Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {bestPractices.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-[2px]">✅</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/70 backdrop-blur">
            <CardHeader>
              <CardTitle>Profile Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Professional profile photo</li>
                <li>✅ Subject expertise and class levels</li>
                <li>✅ Clear teaching method and language</li>
                <li>✅ Experience/certification details</li>
                <li>✅ Accurate availability and pricing</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Policies */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Platform Policies
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {policyCards.map((item) => (
              <Card
                key={item.title}
                className="h-full border-border/60 bg-card/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {item.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-muted/30 to-secondary/20 p-6 text-center sm:p-8">
          <h3 className="text-lg font-semibold sm:text-xl">
            Ready to teach on SkillBridge?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete your tutor setup and start accepting student bookings
            today.
          </p>
          <div className="mt-5">
            <Button asChild>
              <Link href="/become-tutor">Create Tutor Account</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
