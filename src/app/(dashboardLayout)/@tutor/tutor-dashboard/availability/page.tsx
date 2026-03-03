import AvailabilityPage from "@/components/modules/Tutors/dashboardAvailability";
import { tutorServices } from "@/components/services/tutor.service";

export default async function Page() {
  const tutorProfile = await tutorServices.getTutorIdFromSession();
  return <AvailabilityPage tutorId={tutorProfile?.data} />;
}
