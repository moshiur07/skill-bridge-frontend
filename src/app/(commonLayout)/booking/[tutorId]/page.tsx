"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { tutorServices } from "@/components/services/tutor.service";
import { studentService } from "@/components/services/student.service";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: number;
  name: string;
}

interface Availability {
  id: string;
  start_date_time: string; // plain time string e.g. "9:00"
  end_date_time: string; // plain time string e.g. "17:00"
  is_booked: boolean;
}

interface TutorProfile {
  id: string;
  bio: string;
  hourly_rate: number;
  rating_average: number;
  isFeatured: boolean;
  image?: string;
  user: { name: string; email: string };
  categories: Category[];
  availabilities: Availability[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** "9:00" → "9:00 AM", "14:30" → "2:30 PM" */
function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}:${String(m).padStart(2, "0")} ${period}`;
}

/** Duration in hours between two time strings */
function getDurationHours(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const diff = (eh * 60 + em - (sh * 60 + sm)) / 60;
  return Math.round(diff * 10) / 10;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingPage() {
  const params = useParams();
  const tutorId = params?.tutorId as string;

  // ── Tutor fetch state ──────────────────────────────────────────────────────
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // ── Booking state ──────────────────────────────────────────────────────────
  const [selectedSlot, setSelectedSlot] = useState<Availability | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  // const [isConfirmed, setIsConfirmed] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const router = useRouter();
  // ── Fetch tutor + availabilities ───────────────────────────────────────────
  useEffect(() => {
    if (!tutorId) return;
    async function load() {
      setIsFetching(true);
      setFetchError("");
      try {
        const data = await tutorServices.getBookingsById(tutorId);
        setTutor(data.data);
      } catch (err) {
        setFetchError(
          err instanceof Error ? err.message : "Failed to load tutor.",
        );
      } finally {
        setIsFetching(false);
      }
    }
    load();
  }, [tutorId]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const availableSlots =
    tutor?.availabilities.filter((a) => !a.is_booked) ?? [];

  const duration = selectedSlot
    ? getDurationHours(selectedSlot.start_date_time, selectedSlot.end_date_time)
    : 0;
  const totalPrice = tutor ? Math.round(duration * tutor.hourly_rate) : 0;

  // ── Book ───────────────────────────────────────────────────────────────────

  async function handleBooking() {
    if (!selectedSlot || !tutor || !selectedSubject) return;
    setIsBooking(true);
    setBookingError("");
    try {
      const load = {
        tutor_id: tutor.id,
        availability_id: selectedSlot.id,
        duration_hours: duration,
        subject: selectedSubject,
      };

      const res = await studentService.createBooking(load);
      const bookingId = res?.data?.data?.id;

      // pass summary to payment page via sessionStorage
      sessionStorage.setItem(
        "pending_booking",
        JSON.stringify({
          tutor_name: tutor.user.name,
          subject: selectedSubject,
          duration_hours: duration,
          total_price: totalPrice,
          slot_time: `${formatTime(selectedSlot.start_date_time)} – ${formatTime(selectedSlot.end_date_time)}`,
        }),
      );

      router.push(`/payment/${bookingId}`);
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Booking failed.");
    } finally {
      setIsBooking(false);
    }
  }
  // ── Loading ────────────────────────────────────────────────────────────────
  if (isFetching) {
    return (
      <div className="min-h-screen bg-slate-300 flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading tutor…</span>
        </div>
      </div>
    );
  }

  // ── Fetch error ────────────────────────────────────────────────────────────
  if (fetchError || !tutor) {
    return (
      <div className="min-h-screen bg-slate-300 flex items-center justify-center px-4">
        <Card className="max-w-sm w-full text-center shadow-sm">
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-3">
            <AlertCircle className="w-10 h-10 text-destructive/60" />
            <p className="text-sm text-muted-foreground">
              {fetchError || "Tutor not found."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Main ───────────────────────────────────────────────────────────────────
  return (
    <div className="bg-slate-300 min-h-screen py-10 px-4">
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
                  {initials(tutor.user.name)}
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

        {/* Subject picker */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Choose a subject
            </CardTitle>
            <CardDescription>
              Select the subject you want to study.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tutor.categories.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                This tutor hasn't listed any subjects yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tutor.categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedSubject(c.name)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-all",
                      "hover:border-primary/60 hover:bg-primary/5",
                      selectedSubject === c.name
                        ? "border-primary bg-primary/5 ring-1 ring-primary font-medium"
                        : "border-border bg-background",
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Slot picker */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Choose a time slot
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
                        {formatTime(slot.start_date_time)} –{" "}
                        {formatTime(slot.end_date_time)}
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
            (!selectedSlot || !selectedSubject) && "opacity-60",
          )}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Session summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedSlot && selectedSubject ? (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tutor</span>
                    <span className="font-medium">{tutor.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subject</span>
                    <span className="font-medium">{selectedSubject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">
                      {formatTime(selectedSlot.start_date_time)} –{" "}
                      {formatTime(selectedSlot.end_date_time)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{duration}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">${tutor.hourly_rate}/hr</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>
                </div>

                {bookingError && (
                  <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />{" "}
                    {bookingError}
                  </p>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBooking}
                  disabled={isBooking}
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Confirming…
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By confirming, you agree to the cancellation policy. Bookings
                  are pending until the tutor accepts.
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground py-2">
                {!selectedSubject && !selectedSlot
                  ? "Select a subject and time slot above to continue."
                  : !selectedSubject
                    ? "Select a subject to continue."
                    : "Select a time slot to continue."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
