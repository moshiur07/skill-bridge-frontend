"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Star, MessageSquare, BookOpen } from "lucide-react";
import { Schedule, TutorProfileClientProps } from "@/Types/schemaTypes";
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

  // Group schedules by day
  const schedulesByDay = tutor.schedules.reduce(
    (acc, schedule) => {
      const day = schedule.day_of_week;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(schedule);
      return acc;
    },
    {} as Record<number, Schedule[]>,
  );

  // Sort availabilities by date
  const sortedAvailabilities = [...tutor.availabilities].sort((a, b) => {
    return (
      new Date(a.start_date_time).getTime() -
      new Date(b.start_date_time).getTime()
    );
  });

  // Filter only future and unbooked availabilities
  const availableSlots = sortedAvailabilities.filter(
    (slot) => !slot.is_booked && new Date(slot.start_date_time) > new Date(),
  );

  const handleBooking = (availabilityId: string) => {
    setSelectedAvailability(availabilityId);
    // TODO: Implement booking logic or navigation to booking page
    console.log("Book slot:", availabilityId);
  };

  return (
    <div className="space-y-12">
      {/* Tabs Section */}
      <Tabs defaultValue="availability" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="availability" className="gap-2">
            <Calendar className="h-4 w-4" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Clock className="h-4 w-4" />
            Weekly Schedule
          </TabsTrigger>
          <TabsTrigger value="reviews" className="gap-2">
            <Star className="h-4 w-4" />
            Reviews ({tutor.bookings.length})
          </TabsTrigger>
        </TabsList>

        {/* Availability Tab */}
        <TabsContent value="availability" className="mt-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Book a Session</h2>
              <p className="text-muted-foreground">
                Choose an available time slot to book a tutoring session
              </p>
            </div>

            {availableSlots.length === 0 ? (
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableSlots.map((slot) => {
                  const startDate = new Date(slot.start_date_time);
                  const endDate = new Date(slot.end_date_time);
                  const duration =
                    (endDate.getTime() - startDate.getTime()) /
                    (1000 * 60 * 60);

                  return (
                    <Card
                      key={slot.id}
                      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                        selectedAvailability === slot.id
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedAvailability(slot.id)}
                    >
                      <div className="mb-4">
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {startDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-2xl font-bold">
                          {startDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {duration} hour{duration !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-primary">
                          ${tutor.hourly_rate * duration}
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBooking(slot.id);
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Weekly Schedule Tab */}
        <TabsContent value="schedule" className="mt-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Weekly Schedule</h2>
              <p className="text-muted-foreground">
                Regular availability throughout the week
              </p>
            </div>

            {tutor.schedules.length === 0 ? (
              <Card className="p-12 text-center">
                <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">
                  No Regular Schedule
                </h3>
                <p className="text-muted-foreground">
                  This tutor has not set up a regular weekly schedule yet.
                </p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {DAYS_OF_WEEK.map((dayName, dayIndex) => {
                  const daySchedules = schedulesByDay[dayIndex];

                  if (!daySchedules || daySchedules.length === 0) {
                    return null;
                  }

                  return (
                    <Card key={dayIndex} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="min-w-32">
                          <h3 className="font-semibold text-lg">{dayName}</h3>
                        </div>
                        <div className="flex-1 space-y-2">
                          {daySchedules.map((schedule) => (
                            <div
                              key={schedule.id}
                              className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {schedule.start_time} - {schedule.end_time}
                                </span>
                              </div>
                              <Badge variant="secondary">Available</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Student Reviews</h2>
              <p className="text-muted-foreground">
                See what students say about {tutor.user.name}
              </p>
            </div>

            {tutor.bookings.length === 0 ? (
              <Card className="p-12 text-center">
                <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
                <p className="text-muted-foreground">
                  This tutor is new and has not received any reviews yet. Be the
                  first to book!
                </p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {tutor.bookings.map((booking) => (
                  <Card key={booking.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">
                          {booking.student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">
                            {booking.student.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
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
                        <div className="text-sm text-muted-foreground mb-2">
                          {new Date(booking.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                          {" • "}
                          {booking.duration_hours} hour session
                        </div>
                        <Badge variant="secondary" className="mb-3">
                          {booking.status}
                        </Badge>
                        {/* Note: Review content would come from the Review model if populated */}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
