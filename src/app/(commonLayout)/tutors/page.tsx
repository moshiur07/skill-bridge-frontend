// import { BrowseTutors } from "@/components/blog8";

// const TutorsPage = () => {
//   return (
//     <div className="">
//       <BrowseTutors />
//     </div>
//   );
// };

// export default TutorsPage;

// ! claude

import { Suspense } from "react";
import { TutorsClient } from "@/components/TutorsClient";
import { TutorCardSkeleton } from "@/components/TutorCardSkeleton";

// This is the Server Component - fetches initial data
export default async function TutorsPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
    rating?: string;
    price?: string;
    search?: string;
  };
}) {
  // Fetch first 3 tutors on server (SSR - instant load)
  // Fetch first 3 tutors on server (SSR - instant load)
  // Build query params with filters
  const params = new URLSearchParams({ limit: "3" });

  if (searchParams.category) {
    params.append("category", searchParams.category);
  }
  if (searchParams.rating) {
    params.append("rating", searchParams.rating);
  }
  if (searchParams.price) {
    params.append("price", searchParams.price);
  }
  if (searchParams.search) {
    params.append("search", searchParams.search);
  }

  const initialData = await fetch(
    `http://localhost:5000/api/tutor?${params.toString()}`,
    {
      cache: "no-store", // Always fresh data
    },
  );

  const initialTutors = await initialData.json();

  return (
    <section className="flex mx-auto justify-center align-middle bg-muted">
      <div className="py-16 md:py-24">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
              Browse All Tutors
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              There are many tutors available, you can find the one that suits
              your needs. Filter by category, hourly rate, and rating.
            </p>
          </div>

          {/* Client Component handles all interactivity */}
          <Suspense fallback={<TutorCardSkeleton count={3} />}>
            <TutorsClient
              initialTutors={initialTutors.data}
              searchParams={searchParams}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
