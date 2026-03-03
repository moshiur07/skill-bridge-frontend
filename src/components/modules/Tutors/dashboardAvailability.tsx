"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CalendarDays,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  CalendarOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { availabilityHelper } from "@/components/helper/availabilityHelper";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// ─── Types ────────────────────────────────────────────────────────────────────

interface AvailabilitySlot {
  id: string;
  start_date_time: string;
  end_date_time: string;
  is_booked: boolean;
  tutor_id: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AvailabilityClient({ tutorId }: { tutorId: string }) {
  // ── Data state ──────────────────────────────────────────────────────────────
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Form state ──────────────────────────────────────────────────────────────
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ── Delete state ────────────────────────────────────────────────────────────
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Fetch slots on mount ────────────────────────────────────────────────────
  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${API_BASE}/api/tutors/${tutorId}/availability`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch availabilities (${response.status})`,
          );
        }

        const data = await response.json();
        setSlots(data.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load availabilities",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
  }, [tutorId]);

  // ── Derived data ────────────────────────────────────────────────────────────
  const sortedSlots = [...slots].sort(
    (a, b) =>
      new Date(a.start_date_time).getTime() -
      new Date(b.start_date_time).getTime(),
  );

  const grouped = availabilityHelper.groupByDate(sortedSlots);
  const openCount = slots.filter((s) => !s.is_booked).length;
  const bookedCount = slots.filter((s) => s.is_booked).length;

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate(): string | null {
    if (!startDateTime || !endDateTime) {
      return "Both start and end times are required.";
    }

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const now = new Date();

    // Remove seconds/milliseconds from "now" for fair comparison
    now.setSeconds(0, 0);

    if (start.getTime() <= now.getTime()) {
      return "Start time must be in the future.";
    }

    if (end.getTime() <= start.getTime()) {
      return "End time must be after start time.";
    }

    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = diffMs / (1000 * 60);

    if (diffMinutes < 30) {
      return "Slot must be at least 30 minutes long.";
    }

    if (diffMinutes > 8 * 60) {
      return "Slot cannot exceed 8 hours.";
    }

    return null;
  }

  // ── Add slot ─────────────────────────────────────────────────────────────────
  async function handleAdd() {
    setSubmitError("");
    setSuccessMsg("");

    const validationError = validate();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const startTime = startDateTime.split("T")[1]; // "HH:mm"
      const endTime = endDateTime.split("T")[1]; // "HH:mm"

      const response = await fetch(
        `${API_BASE}/api/tutors/${tutorId}/availability`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            start_date_time: startTime,
            end_date_time: endTime,
          }),
        },
      );

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        throw new Error(json.message ?? `Request failed (${response.status})`);
      }

      const json = await response.json();
      const created: AvailabilitySlot = json.data ?? json;
      toast.success("Slot Added successfully!", { position: "top-center" });
      // Add to local state
      setSlots((prev) => [...prev, created]);
      setStartDateTime("");
      setEndDateTime("");
      setSuccessMsg("Slot added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to add slot.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Delete slot ──────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    setDeletingId(id);
    console.log("the slot being deletingggggggggg", id);
    try {
      const response = await fetch(
        `${API_BASE}/api/tutors/availability/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      console.log({ resOfDelete: response });
      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        throw new Error(json.message ?? `Delete failed (${response.status})`);
      }
      toast.success("Slot deleted successfully!", { position: "top-center" });
      // Remove from local state
      setSlots((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete slot.");
      setTimeout(() => setError(""), 4000);
    } finally {
      setDeletingId(null);
    }
  }

  // ── Loading state ────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Availability
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your open time slots.
          </p>
        </div>
        <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading your slots…</span>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────────
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Availability</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your open time slots. Students can only book slots you make
          available here.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}

      {/* Summary badges */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="gap-1.5 py-1 px-3 text-xs md:text-sm"
        >
          <CalendarDays className="w-3.5 h-3.5" />
          {slots.length} total slot{slots.length !== 1 ? "s" : ""}
        </Badge>
        <Badge
          variant="outline"
          className="gap-1.5 py-1 px-3 text-xs md:text-sm text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          {openCount} open
        </Badge>
        <Badge
          variant="outline"
          className="gap-1.5 py-1 px-3 text-xs md:text-sm text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/20"
        >
          <Clock className="w-3.5 h-3.5" />
          {bookedCount} booked
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* ── Add slot form ──────────────────────────────────────────────── */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Slot
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Set a date and time range when you're available to teach.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start" className="text-xs md:text-sm">
                Start
              </Label>
              <Input
                id="start"
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => {
                  setStartDateTime(e.target.value);
                  setSubmitError("");
                }}
                min={availabilityHelper.toLocalInputValue(
                  new Date().toISOString(),
                )}
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end" className="text-xs md:text-sm">
                End
              </Label>
              <Input
                id="end"
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => {
                  setEndDateTime(e.target.value);
                  setSubmitError("");
                }}
                min={
                  startDateTime ||
                  availabilityHelper.toLocalInputValue(new Date().toISOString())
                }
                className="text-sm"
              />
            </div>

            {/* Duration preview */}
            {/* {startDateTime &&
              endDateTime &&
              new Date(endDateTime) > new Date(startDateTime) && (
                <p className="text-xs text-muted-foreground bg-muted rounded-md px-3 py-2">
                  Duration:{" "}
                  <span className="font-medium text-foreground">
                    {availabilityHelper.getDurationLabel(
                      new Date(startDateTime).toISOString(),
                      new Date(endDateTime).toISOString(),
                    )}
                  </span>
                </p>
              )} */}

            {/* Submit error */}
            {submitError && (
              <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {submitError}
              </p>
            )}

            {/* Success */}
            {successMsg && (
              <p className="text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 rounded-md px-3 py-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                {successMsg}
              </p>
            )}

            <Button
              className="w-full text-sm"
              onClick={handleAdd}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Slot
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* ── Slot list ──────────────────────────────────────────────────── */}
        <Card className="lg:col-span-3 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Your Slots
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Booked slots cannot be deleted — cancel the booking first.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            {sortedSlots.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                <CalendarOff className="w-10 h-10 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No slots yet. Add your first availability using the form.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {Object.entries(grouped).map(([dateKey, daySlots]) => (
                  <div key={dateKey}>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      {new Date(daySlots[0].start_date_time).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>

                    <div className="space-y-2">
                      {daySlots.map((slot, i) => (
                        <div key={slot.id}>
                          <div className="flex items-center justify-between gap-3 md:gap-4 rounded-lg border px-3 md:px-4 py-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium">
                                {availabilityHelper.formatDisplayTime(
                                  slot.start_date_time,
                                )}{" "}
                                –{" "}
                                {availabilityHelper.formatDisplayTime(
                                  slot.end_date_time,
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {availabilityHelper.getDurationLabel(
                                  slot.start_date_time,
                                  slot.end_date_time,
                                )}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge
                                variant={slot.is_booked ? "default" : "outline"}
                                className={`text-xs ${
                                  !slot.is_booked
                                    ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20"
                                    : ""
                                }`}
                              >
                                {slot.is_booked ? "Booked" : "Open"}
                              </Badge>

                              {slot.is_booked ? (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8 text-muted-foreground/40 cursor-not-allowed"
                                  disabled
                                  title="Cannot delete a booked slot"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              ) : (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="w-8 h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                      disabled={deletingId === slot.id}
                                    >
                                      {deletingId === slot.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Trash2 className="w-4 h-4" />
                                      )}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete this slot?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will remove the slot on{" "}
                                        <strong>
                                          {availabilityHelper.formatDisplayDate(
                                            slot.start_date_time,
                                          )}
                                          ,{" "}
                                          {availabilityHelper.formatDisplayTime(
                                            slot.start_date_time,
                                          )}{" "}
                                          –{" "}
                                          {availabilityHelper.formatDisplayTime(
                                            slot.end_date_time,
                                          )}
                                        </strong>{" "}
                                        from your availability.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        onClick={() => handleDelete(slot.id)}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </div>
                          {i < daySlots.length - 1 && (
                            <Separator className="mt-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
