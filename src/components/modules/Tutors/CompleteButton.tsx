"use client";

import { useState } from "react";
import { toast } from "sonner";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export function CompleteButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/api/bookings/${bookingId}/complete`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        console.log("Booking marked as completed");
        window.location.reload();
        toast.success("This Session Marked as completed!", {
          position: "top-center",
        });
      } else {
        console.error("Failed to complete booking");
      }
    } catch (error) {
      console.error("API call failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleComplete}
      disabled={loading}
      className="ml-2 px-2 py-1 text-[16px] hover:cursor-pointer rounded-sm bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white  transition-colors font-medium"
    >
      {loading ? "..." : "Mark as Complete"}
    </button>
  );
}
