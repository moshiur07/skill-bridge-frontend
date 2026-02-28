import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  // baseURL: "http://localhost:3000", // your Next.js app
  baseURL: process.env.BACKEND_URL ?? "",
});
