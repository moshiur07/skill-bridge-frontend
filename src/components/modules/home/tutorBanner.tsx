// app/components/BecomeATutorBanner.tsx
// Place the file in your components directory

import BecomeATutorBanner from "@/components/ui/becomeATutor";

// Usage in any page:

export default function TutorBanner() {
  return (
    <>
      <BecomeATutorBanner
        ctaLink="/auth/register?role=tutor"
        learnMoreLink="/tutoring-guide"
      />
    </>
  );
}
