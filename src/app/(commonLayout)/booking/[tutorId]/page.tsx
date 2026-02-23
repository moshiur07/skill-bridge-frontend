// const Tutor = async ({ params }: { params: { tutorId: string } }) => {
//   const tutorId = await params;
//   console.log(tutorId);
//   return <div className="mt-20 bg-slate-400">Tutor ID: {tutorId.tutorId}</div>;
// };

// export default Tutor;

// ! claude

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarDays,
  Clock,
  Star,
  DollarSign,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TutorProfile {
  id: string;
  bio: string;
  hourly_rate: number;
  rating_average: number;
  isFeatured: boolean;
  image?: string;
  user: {
    name: string;
    email: string;
  };
  categories: { id: number; name: string }[];
  availabilities: Availability[];
}

interface Availability {
  id: string;
  start_date_time: string;
  end_date_time: string;
  is_booked: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getDurationHours(start: string, end: string) {
  const diff =
    (new Date(end).getTime() - new Date(start).getTime()) / 3_600_000;
  return Math.round(diff * 10) / 10;
}

// ─── Mock data (replace with real fetch) ─────────────────────────────────────

const MOCK_TUTOR: TutorProfile = {
  id: "tutor-1",
  bio: "Experienced mathematics and physics tutor with 8+ years helping students achieve their academic goals. I specialise in making complex concepts approachable through real-world examples.",
  hourly_rate: 45,
  rating_average: 4.8,
  isFeatured: true,
  image: undefined,
  user: { name: "Alexandra Chen", email: "alex@example.com" },
  categories: [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Calculus" },
  ],
  availabilities: [
    {
      id: "av-1",
      start_date_time:
        new Date(Date.now() + 1 * 24 * 3600 * 1000)
          .toISOString()
          .replace("T", "T10:00:")
          .slice(0, 16) + ":00",
      end_date_time:
        new Date(Date.now() + 1 * 24 * 3600 * 1000)
          .toISOString()
          .replace("T", "T11:00:")
          .slice(0, 16) + ":00",
      is_booked: false,
    },
    {
      id: "av-2",
      start_date_time:
        new Date(Date.now() + 2 * 24 * 3600 * 1000)
          .toISOString()
          .replace("T", "T14:00:")
          .slice(0, 16) + ":00",
      end_date_time:
        new Date(Date.now() + 2 * 24 * 3600 * 1000)
          .toISOString()
          .replace("T", "T16:00:")
          .slice(0, 16) + ":00",
      is_booked: false,
    },
    {
      id: "av-3",
      start_date_time:
        new Date(Date.now() + 3 * 24 * 3600 * 1000)
          .toISOString()
          .replace("T", "T09:00:")
          .slice(0, 16) + ":00",
      end_date_time:
        new Date(Date.now() + 3 * 24 * 3600 * 1000)
          .toISOString()
          .replace("T", "T10:30:")
          .slice(0, 16) + ":00",
      is_booked: false,
    },
    {
      id: "av-4",
      start_date_time:
        new Date(Date.now() + 4 * 24 * 3600 * 1000)
          .toISOString()
          .replace("T", "T11:00:")
          .slice(0, 16) + ":00",
      end_date_time:
        new Date(Date.now() + 4 * 24 * 3600 * 1000)
          .toISOString()
          .replace("T", "T12:00:")
          .slice(0, 16) + ":00",
      is_booked: true,
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingPage() {
  // In production: const params = useParams(); const tutorId = params.tutorId;
  // Then fetch tutor data from your API using tutorId
  const tutor = MOCK_TUTOR;

  const [selectedSlot, setSelectedSlot] = useState<Availability | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const availableSlots = tutor.availabilities.filter((a) => !a.is_booked);

  const duration = selectedSlot
    ? getDurationHours(selectedSlot.start_date_time, selectedSlot.end_date_time)
    : 0;
  const totalPrice = Math.round(duration * tutor.hourly_rate);

  async function handleBooking() {
    if (!selectedSlot) return;
    setIsLoading(true);

    // Replace with your actual API call:
    // await fetch(`/api/bookings`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     tutor_id: tutor.id,
    //     availability_id: selectedSlot.id,
    //     total_price: totalPrice,
    //     duration_hours: duration,
    //   }),
    // });

    await new Promise((r) => setTimeout(r, 1000)); // simulate request
    setIsLoading(false);
    setIsConfirmed(true);
  }

  // ── Success state ────────────────────────────────────────────────────────────
  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center shadow-sm">
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-4">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <h2 className="text-2xl font-semibold tracking-tight">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground text-sm">
              Your session with{" "}
              <span className="font-medium text-foreground">
                {tutor.user.name}
              </span>{" "}
              has been requested. You'll receive a confirmation email shortly.
            </p>
            {selectedSlot && (
              <div className="bg-muted rounded-lg px-5 py-3 text-sm w-full text-left space-y-1">
                <p className="font-medium">Session details</p>
                <p className="text-muted-foreground">
                  {formatDateTime(selectedSlot.start_date_time)}
                </p>
                <p className="text-muted-foreground">
                  {duration}h · ${totalPrice}
                </p>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setIsConfirmed(false)}
            >
              Book another session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Main page ─────────────────────────────────────────────────────────────────
  return (
    <div className="bg-slate-300 pt-10">
      <div className="min-h-screen  py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Tutoring / Book a session
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Book a Session
            </h1>
          </div>

          {/* Tutor card */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <Avatar className="w-16 h-16 shrink-0">
                  <AvatarImage
                    src={tutor.image ?? undefined}
                    alt={tutor.user.name}
                  />
                  <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                    {tutor.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl font-semibold">{tutor.user.name}</h2>
                    {tutor.isFeatured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {tutor.rating_average.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />${tutor.hourly_rate}
                      /hr
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tutor.categories.map((c) => (
                      <Badge key={c.id} variant="outline" className="text-xs">
                        {c.name}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {tutor.bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Slot picker */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Choose an available slot
              </CardTitle>
              <CardDescription>
                {availableSlots.length} slot
                {availableSlots.length !== 1 ? "s" : ""} available
              </CardDescription>
            </CardHeader>

            <CardContent>
              {availableSlots.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No available slots at the moment. Please check back later.
                </p>
              ) : (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {availableSlots.map((slot) => {
                    const hours = getDurationHours(
                      slot.start_date_time,
                      slot.end_date_time,
                    );
                    const isSelected = selectedSlot?.id === slot.id;

                    return (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "w-full text-left rounded-lg border px-4 py-3 transition-all text-sm",
                          "hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border bg-background",
                        )}
                      >
                        <p className="font-medium mb-1">
                          {formatDateTime(slot.start_date_time)}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {hours}h · ${Math.round(hours * tutor.hourly_rate)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order summary + confirm */}
          <Card
            className={cn(
              "shadow-sm transition-opacity",
              !selectedSlot && "opacity-60",
            )}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Session summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {selectedSlot ? (
                <>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tutor</span>
                      <span className="font-medium">{tutor.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Date &amp; time
                      </span>
                      <span className="font-medium text-right max-w-[60%]">
                        {formatDateTime(selectedSlot.start_date_time)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{duration}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="font-medium">
                        ${tutor.hourly_rate}/hr
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">${totalPrice}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleBooking}
                    disabled={isLoading}
                  >
                    {isLoading ? "Confirming…" : "Confirm Booking"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By confirming, you agree to the cancellation policy.
                    Bookings are pending until the tutor accepts.
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground py-2">
                  Select a time slot above to see pricing and confirm your
                  booking.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
