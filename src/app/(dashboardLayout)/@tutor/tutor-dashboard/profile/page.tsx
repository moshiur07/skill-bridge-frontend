import { redirect } from "next/navigation";
import { tutorServices } from "@/components/services/tutor.service";
import TutorProfileClient from "@/components/modules/Tutors/DashboardProfile";

export default async function TutorProfilePage() {
  const profile = await tutorServices.getTutorProfile();
  console.log("this is profile data", profile);
  if (!profile?.data) redirect("/login");

  return <TutorProfileClient profile={profile?.data} />;
}
