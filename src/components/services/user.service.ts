import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      console.log(cookieStore);
      //   const res = await fetch(`${AUTH_URL}/get-session`, {
      const res = await fetch(
        `https://skill-bridge-backend-myyv.onrender.com/api/auth/get-session`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );
      const session = await res.json();
      console.log("session from user service:", session);
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
};
