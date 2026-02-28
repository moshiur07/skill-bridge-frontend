// app/dashboard/tutor/availability/page.tsx
// NO "use client" — this is a Server Component

import { redirect } from "next/navigation";
import AvailabilityPage from "@/components/modules/Tutors/dashboardAvailability";
import { tutorServices } from "@/components/services/tutor.service";

export default async function Page() {
  const tutorProfile = await tutorServices.getTutorProfile();
  // console.log("Full profile response:", JSON.stringify(tutorProfile));
  console.log("tutorId being passed:", tutorProfile?.data?.id);
  // if (!tutorProfile) redirect("/login");
  console.log(await tutorProfile);
  return <AvailabilityPage tutorId={tutorProfile?.data?.id} />;
}
