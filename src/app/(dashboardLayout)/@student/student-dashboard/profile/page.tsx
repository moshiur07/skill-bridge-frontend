// app/dashboard/student/profile/page.tsx  — Server wrapper
import { redirect } from "next/navigation";
import { userService } from "@/components/services/user.service";
import StudentProfileClient from "@/components/modules/students/StudentProfileClient";

export default async function StudentProfilePage() {
  const session = await userService.getSession();
  if (!session?.data?.user) redirect("/login");
  return <StudentProfileClient user={session.data.user} />;
}
