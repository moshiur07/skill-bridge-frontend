"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Star, MessageSquare, BookOpen } from "lucide-react";
import { Schedule, TutorProfileClientProps } from "@/Types/schemaTypes";
import Link from "next/link";
import { NoiseBackground } from "@/components/ui/noise-background";
const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function TutorProfileClient({
  tutor,
  tutorId,
}: TutorProfileClientProps) {
  const [selectedAvailability, setSelectedAvailability] = useState<
    string | null
  >(null);
  console.log({ tutor, tutorId });

  // Sort availabilities by time
  const sortedAvailabilities = [...(tutor?.availabilities || [])].sort(
    (a, b) => {
      // Convert time string "5:00" to comparable format
      const timeA = a.start_date_time.split(":").map(Number);
      const timeB = b.start_date_time.split(":").map(Number);

      const minutesA = timeA[0] * 60 + timeA[1];
      const minutesB = timeB[0] * 60 + timeB[1];

      return minutesA - minutesB;
    },
  );

  // Filter only unbooked availabilities
  const availableSlots = sortedAvailabilities.filter((slot) => !slot.is_booked);

  return (
    <div className="space-y-12">
      {/* Tabs Section */}
      <Tabs defaultValue="availability" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="availability" className="gap-2">
            <Calendar className="h-4 w-4" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="reviews" className="gap-2">
            <Star className="h-4 w-4" />
            Reviews ({tutor.bookings?.length})
          </TabsTrigger>
        </TabsList>

        {/* Availability Tab */}
        <TabsContent
          value="availability"
          className="mt-8 bg-slate-400 rounded-xl shadow-2xl shadow-slate-700"
        >
          <div className="space-y-6 pl-5">
            <div>
              <h2 className="text-2xl font-bold pt-3 mb-2">Book a Session</h2>
              <p className="text-muted-foreground">
                Choose an available time slot to book a tutoring session
              </p>
            </div>

            {availableSlots?.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">
                  No Available Slots
                </h3>
                <p className="text-muted-foreground mb-4">
                  This tutor doesn`&apost;`t have any available slots at the
                  moment.
                </p>
                <Button variant="outline">Request Custom Time</Button>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-8">
                {availableSlots?.map((slot) => {
                  // Parse time strings like "5:00" and "8:00"
                  const [startHour, startMin] = slot.start_date_time
                    .split(":")
                    .map(Number);
                  const [endHour, endMin] = slot.end_date_time
                    .split(":")
                    .map(Number);

                  // Convert to minutes and calculate duration
                  const startTotalMin = startHour * 60 + startMin;
                  const endTotalMin = endHour * 60 + endMin;
                  const duration = (endTotalMin - startTotalMin) / 60;

                  // Format time display
                  const formatTime = (h: number, m: number) => {
                    const period = h >= 12 ? "PM" : "AM";
                    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
                    return `${displayHour}:${String(m).padStart(2, "0")} ${period}`;
                  };

                  const startTimeDisplay = formatTime(startHour, startMin);
                  const endTimeDisplay = formatTime(endHour, endMin);

                  // Get today's date for display
                  const today = new Date();
                  const dateDisplay = today.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  });

                  return (
                    <Card
                      key={slot.id}
                      className={`p-6 bg-slate-500 text-white
                         cursor-pointer transition-all hover:shadow-lg ${
                           selectedAvailability === slot.id
                             ? "ring-2 ring-primary"
                             : ""
                         }`}
                      onClick={() => setSelectedAvailability(slot.id)}
                    >
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-1">
                          {dateDisplay}
                        </div>
                        <div className="text-2xl font-bold">
                          {startTimeDisplay}
                        </div>
                        <div className="text-sm">
                          {duration} hour{duration !== 1 ? "s" : ""} (
                          {startTimeDisplay} - {endTimeDisplay})
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-primary">
                          ${tutor.hourly_rate * duration}
                        </div>
                        <Link href={`/booking/${tutorId}`}></Link>
                        <NoiseBackground>
                          <Button size="sm">Book Now</Button>
                        </NoiseBackground>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent
          value="reviews"
          className="mt-8 bg-slate-400 rounded-xl shadow-2xl shadow-slate-700"
        >
          <div className="space-y-6 py-8 px-5">
            <div>
              <h2 className="text-2xl text-black font-bold mb-2">
                Student Reviews
              </h2>
              <p className="text-black">
                See what students say about {tutor.user.name}
              </p>
            </div>

            {tutor?.bookings?.length === 0 ? (
              <Card className="p-12 text-center shadow-2xl">
                <Star className="h-16 w-16 mx-auto mb-4 text-black" />
                <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
                <p className="text-black">
                  This tutor is new and has not received any reviews yet. Be the
                  first to book!
                </p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {tutor?.bookings?.map(
                  (booking) =>
                    booking?.review !== null && (
                      <Card
                        key={booking.id}
                        className="p-6 text-white bg-slate-600"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 border-white
                        border-2  w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                          >
                            <span className="text-lg font-bold text-primary">
                              {booking?.student?.name?.charAt(0)} ST
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">
                                {booking?.review?.comment}
                              </h4>
                              <div className="flex items-center gap-1">
                                {[...Array(5)]?.map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < tutor.rating_average
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-sm text-white mb-2">
                              {new Date(booking?.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                              {" • "}
                              {booking?.duration_hours} hour session
                            </div>
                            <Badge variant="secondary" className="mb-3">
                              {booking?.status}
                            </Badge>
                            {/* Note: Review content would come from the Review model if populated */}
                          </div>
                        </div>
                      </Card>
                    ),
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
