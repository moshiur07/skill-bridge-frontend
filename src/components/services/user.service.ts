import { cookies } from "next/headers";
// const API_BASE = "https://skill-bridge-backend-myyv.onrender.com";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const session = await res.json();
      return { data: session, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Can not fetch the data",
          error,
        },
      };
    }
  },
  getAllTutors: async function () {
    try {
      const res = await fetch(`${API_BASE}/api/tutors`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return { data, error: null };
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
  getSingleTutor: async function (tutorId: string) {
    try {
      const res = await fetch(`${API_BASE}/api/tutors/${tutorId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return { data, error: null };
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
};
