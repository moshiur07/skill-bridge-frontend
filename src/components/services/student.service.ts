import { cookies } from "next/headers";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export const studentService = {
  getMyBookings: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/api/bookings/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const parsedData = await res.json();
      return { data: parsedData?.data, stats: parsedData?.stats, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: {
          message: "Can not fetch the data",
          error,
        },
      };
    }
  },
  makePayment: async function (bookingId: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/api/bookings/${bookingId}/payment`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || "Payment failed");
      }
      const parsedData = await res.json();
      return { data: parsedData?.data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: {
          message: error.message || "Can not process payment",
          error,
        },
      };
    }
  },
  createBooking: async function (load: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(load),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || "Booking failed");
      }
      const parsedData = await res.json();
      return { data: parsedData?.data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: {
          message: error.message || "Can not create booking",
          error,
        },
      };
    }
  },
};
