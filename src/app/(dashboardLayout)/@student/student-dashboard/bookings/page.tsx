"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Star,
  Loader2,
  AlertCircle,
  CheckCircle2,
  CalendarClock,
  BookMarked,
  MessageSquarePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const API_BASE = "https://skill-bridge-backend-myyv.onrender.com";

// ─── Types ────────────────────────────────────────────────────────────────────
type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Review {
  id: string;
  rating: number;
  comment: string;
}

interface Booking {
  id: string;
  subject: string;
  duration_hours: number;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  tutor: { id: string; user: { name: string }; image?: string };
  review: Review | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    className: "border-amber-200 text-amber-700 bg-amber-50",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  confirmed: {
    label: "Confirmed",
    className: "border-blue-200 text-blue-700 bg-blue-50",
    icon: <CalendarClock className="w-3 h-3" />,
  },
  completed: {
    label: "Completed",
    className: "border-emerald-200 text-emerald-700 bg-emerald-50",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  cancelled: {
    label: "Cancelled",
    className: "border-red-200 text-red-700 bg-red-50",
    icon: <AlertCircle className="w-3 h-3" />,
  },
};

// ─── Star Rating Input ────────────────────────────────────────────────────────
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "w-7 h-7 transition-colors",
              (hovered || value) >= star
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30",
            )}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Review Modal ─────────────────────────────────────────────────────────────
function ReviewModal({
  open,
  booking,
  onClose,
  onSubmitted,
}: {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
  onSubmitted: (bookingId: string, review: Review) => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // reset when modal opens
  useEffect(() => {
    if (open) {
      setRating(0);
      setComment("");
      setError("");
    }
  }, [open]);

  async function handleSubmit() {
    if (!booking) return;
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a short comment.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const seeRev = {
        booking_id: booking.id,
        rating,
        comment: comment.trim(),
      };
      console.log({ seeRev });
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: booking.id,
          rating,
          comment: comment.trim(),
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          json.message ?? `Failed to submit review (${res.status})`,
        );
      }
      const json = await res.json();
      onSubmitted(booking.id, json.data ?? json);
      toast.success("Your Review Added Successfully!!", {
        position: "top-center",
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            How was your session with{" "}
            <span className="font-medium text-foreground">
              {booking?.tutor?.user?.name}
            </span>
            {booking?.subject ? ` for ${booking.subject}` : ""}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Star rating */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              rows={4}
              placeholder="Share your experience with this tutor…"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setError("");
              }}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500
            </p>
          </div>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────
function BookingCard({
  booking,
  onReviewClick,
}: {
  booking: Booking;
  onReviewClick: (b: Booking) => void;
}) {
  const s = STATUS_CONFIG[booking.status];
  const canReview = booking.status === "completed" && !booking.review;

  return (
    <Card className="shadow-xl shadow-slate-800">
      <CardContent className="pt-4 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left — tutor + info */}
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="w-10 h-10 shrink-0">
              <AvatarImage src={booking.tutor?.image} />
              <AvatarFallback className="text-sm">
                {initials(booking.tutor?.user?.name ?? "T")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">
                {booking.tutor?.user?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {booking.subject} · {booking.duration_hours}h · $
                {booking.total_price}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatDate(booking.created_at)}
              </p>
            </div>
          </div>

          {/* Right — status + actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Badge variant="outline" className={`text-xs gap-1 ${s.className}`}>
              {s.icon} {s.label}
            </Badge>

            {/* Review already submitted */}
            {booking.status === "completed" && booking.review && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-3.5 h-3.5",
                      star <= (booking.review?.rating ?? 0)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30",
                    )}
                  />
                ))}
              </div>
            )}

            {/* Leave review CTA */}
            {canReview && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs h-7"
                onClick={() => onReviewClick(booking)}
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                Review
              </Button>
            )}
          </div>
        </div>

        {/* Show submitted review comment */}
        {booking.review && (
          <div className="mt-3 bg-muted rounded-md px-3 py-2 text-xs text-muted-foreground italic border-l-2 border-primary/30">
            "{booking.review.comment}"
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudentBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [reviewTarget, setReviewTarget] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setIsFetching(true);
    setFetchError("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to load bookings (${res.status})`);
      const json = await res.json();
      setBookings(Array.isArray(json) ? json : (json.data ?? []));
    } catch (err) {
      setFetchError(
        err instanceof Error ? err.message : "Failed to load bookings.",
      );
    } finally {
      setIsFetching(false);
    }
  }

  // optimistically attach the review to the booking in local state
  function handleReviewSubmitted(bookingId: string, review: Review) {
    console.log({ bookingId, review });

    // const res = await fetch(`${API_BASE}/api/bookings`, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       tutor_id: tutor.id,
    //       availability_id: selectedSlot.id,
    //       duration_hours: duration,
    //       subject: selectedSubject,
    //     }),
    //   });

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, review } : b)),
    );
  }

  // filter helpers
  const all = bookings;
  const upcoming = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending",
  );
  const completed = bookings.filter((b) => b.status === "completed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isFetching) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          My Bookings
        </h1>
        <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading bookings…</span>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          My Bookings
        </h1>
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <AlertCircle className="w-10 h-10 text-destructive/60" />
          <p className="text-sm text-muted-foreground">{fetchError}</p>
          <Button variant="outline" size="sm" onClick={fetchBookings}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  function EmptyState({ label }: { label: string }) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
        <BookMarked className="w-10 h-10 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    );
  }

  function BookingList({ items }: { items: Booking[] }) {
    if (items.length === 0) return <EmptyState label="No bookings here yet." />;
    return (
      <div className="space-y-3">
        {items.map((b) => (
          <BookingCard key={b.id} booking={b} onReviewClick={setReviewTarget} />
        ))}
      </div>
    );
  }

  // ── Main ──────────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Bookings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track your sessions and leave reviews for completed ones.
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            {all.length > 0 && (
              <span className="ml-1.5 text-xs bg-muted rounded-full px-1.5 py-0.5">
                {all.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming
            {upcoming.length > 0 && (
              <span className="ml-1.5 text-xs bg-muted rounded-full px-1.5 py-0.5">
                {upcoming.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            {completed.length > 0 && (
              <span className="ml-1.5 text-xs bg-muted rounded-full px-1.5 py-0.5">
                {completed.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {" "}
          <BookingList items={all} />
        </TabsContent>
        <TabsContent value="upcoming">
          {" "}
          <BookingList items={upcoming} />
        </TabsContent>
        <TabsContent value="completed">
          {" "}
          <BookingList items={completed} />
        </TabsContent>
        <TabsContent value="cancelled">
          {" "}
          <BookingList items={cancelled} />
        </TabsContent>
      </Tabs>

      {/* Review modal */}
      <ReviewModal
        open={!!reviewTarget}
        booking={reviewTarget}
        onClose={() => setReviewTarget(null)}
        onSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
