// import { cookies } from "next/headers";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export const adminService = {
  getStats: async function () {
    try {
      // const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/api/admin/dashboard-stats`, {
        headers: {
          // Cookie: cookieStore.toString(),
          credentials: "include",
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
  getAllUsers: async function (role: string) {
    try {
      // const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/api/admin/users?role=${role}`, {
        headers: {
          credentials: "include",
        },
      });
      const parsedData = await res.json();
      return { data: parsedData?.data, error: null };
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
