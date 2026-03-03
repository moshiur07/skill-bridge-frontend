import TutorProfileClient from "@/components/modules/Tutors/DashboardProfile";
import { userService } from "@/components/services/user.service";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default async function TutorProfilePage() {
  const session = await userService.getSession();

  const cookieStore = await cookies();
  console.log("cookie by calling:", await cookieStore);
  const userId = await session?.data?.session?.userId;
  console.log({ userId });
  const res = await fetch(`${API_BASE}/api/tutors/${userId}`, {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  const resData = await res.json();
  return <TutorProfileClient profile={resData?.data} />;
}
