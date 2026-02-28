"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  CreditCard,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { studentService } from "@/components/services/student.service";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingSummary {
  tutor_name: string;
  subject: string;
  duration_hours: number;
  total_price: number;
  slot_time: string;
}

// ─── Pseudo card data ─────────────────────────────────────────────────────────

const PSEUDO_CARDS = [
  { id: "visa", label: "Visa", number: "**** **** **** 4242" },
  { id: "mc", label: "Mastercard", number: "**** **** **** 5555" },
  { id: "amex", label: "Amex", number: "**** **** **** 0005" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;

  const stored: BookingSummary = (() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(sessionStorage.getItem("pending_booking") ?? "null");
    } catch {
      return null;
    }
  })() ?? {
    tutor_name: "Your Tutor",
    subject: "Session",
    duration_hours: 1,
    total_price: 500,
    slot_time: "",
  };

  const [selectedCard, setSelectedCard] = useState(PSEUDO_CARDS[0].id);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  async function handlePay() {
    setPayError("");
    setIsPaying(true);
    try {
      const res = await studentService.makePayment(bookingId);
      sessionStorage.removeItem("pending_booking");
      setShowSuccess(true);
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Payment failed.");
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-300 py-10 px-4">
      <div className="max-w-md mx-auto space-y-5">
        {/* Back */}
        <Link
          href="/tutors"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to tutors
        </Link>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Complete Payment
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review your session and confirm payment.
          </p>
        </div>

        {/* Order summary */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tutor</span>
              <span className="font-medium">{stored.tutor_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subject</span>
              <span className="font-medium">{stored.subject}</span>
            </div>
            {stored.slot_time && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{stored.slot_time}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{stored.duration_hours}h</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${stored.total_price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Pseudo payment */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Select Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PSEUDO_CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card.id)}
                className={cn(
                  "w-full flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-all",
                  "hover:border-primary/60 hover:bg-primary/5",
                  selectedCard === card.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-background",
                )}
              >
                <span className="font-medium">{card.label}</span>
                <span className="text-muted-foreground font-mono text-xs">
                  {card.number}
                </span>
              </button>
            ))}

            {/* Error */}
            {payError && (
              <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {payError}
              </p>
            )}

            <Button
              className="w-full mt-1"
              size="lg"
              onClick={handlePay}
              disabled={isPaying}
            >
              {isPaying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…
                </>
              ) : (
                <>Pay ${stored.total_price}</>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> This is a demo payment — no real
              money is charged.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Success modal ──────────────────────────────────────────────── */}
      <Dialog open={showSuccess}>
        <DialogContent
          className="max-w-sm text-center"
          // prevent closing by clicking outside
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center gap-4 py-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <div>
              <h2></h2>
              <DialogTitle className="text-xl font-semibold">
                Payment Successful!
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Your booking is confirmed. The tutor will be in touch shortly.
              </p>
            </div>
            <div className="bg-muted rounded-lg px-4 py-3 text-sm w-full text-left space-y-1">
              <p className="font-medium">Booking confirmed</p>
              <p className="text-muted-foreground">
                {stored.subject} with {stored.tutor_name}
              </p>
              <p className="text-muted-foreground font-medium">
                ${stored.total_price} paid
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => router.push("/student-dashboard")}
            >
              View My Bookings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
