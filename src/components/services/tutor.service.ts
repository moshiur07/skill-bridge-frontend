import { cookies } from "next/headers";
import { userService } from "./user.service";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export const tutorServices = {
  getMyBookings: async function () {
    try {
      const res = await fetch(`${API_BASE}/api/bookings/me`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
  getTutorById: async function (tutorId: string) {
    try {
      const res = await fetch(`${API_BASE}/api/tutors/${tutorId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

  setAvailability: async function (availability: any) {
    try {
      const res = await fetch(`${API_BASE}/api/tutors/availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(availability),
      });
      const { data } = await res.json();
      console.log("data:", data);
      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: {
          message: "Can not set availability",
          error,
        },
      };
    }
  },

  getTutorProfile: async function () {
    try {
      const bookings = await tutorServices.getMyBookings();
      const tutorId = await bookings?.data[0]?.tutor_id;
      const cookieStore = await cookies();
      if (tutorId) {
        const res = await fetch(`${API_BASE}/api/tutors/${tutorId}`, {
          headers: {
            cookie: cookieStore.toString(),
          },
        });
        const { data } = await res.json();
        console.log("data:", data);
        return { data, error: null };
      }
      throw new Error("No tutorId found in bookings");
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

  // Fix: use TutorProfile.id (from getTutorProfile), not User.id
  getAvailability: async function () {
    try {
      const profile = await tutorServices.getTutorProfile();
      const tutorId = profile?.data?.id;
      const res = await fetch(
        `${API_BASE}/api/tutors/${tutorId}/availability`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const { data } = await res.json();
      console.log("data:", data);
      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: {
          message: "Can not fetch availability",
          error,
        },
      };
    }
  },
  getTutorIdFromSession: async function () {
    const cookieStore = await cookies();
    try {
      const sessionRes = await userService.getSession();
      const userId = await sessionRes?.data?.session?.userId;
      if (!userId) throw new Error("No userId found in session");
      const tutorRes = await fetch(`${API_BASE}/api/users/${userId}/tutor-id`, {
        headers: {
          cookie: cookieStore.toString(),
        },
      });
      const tutorData = await tutorRes.json();
      return { data: tutorData?.data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: {
          message: "Can not fetch tutor id",
          error,
        },
      };
    }
  },
};
