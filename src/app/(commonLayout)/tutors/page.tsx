import { themeColor } from "@/components/helper/colorValue";
import { TutorsClient } from "@/components/Tutors/TutorsClient";

// This is the Server Component - fetches initial data
export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    rating?: string;
    price?: string;
    search?: string;
    page?: string;
  }>;
}) {
  // ✅ Await searchParams in Next.js 15+
  const params = await searchParams;
  console.log("params:", params);
  // Build query params with filters
  const queryParams = new URLSearchParams();
  console.log("queryparams", queryParams);
  if (params.category) {
    queryParams.append("category", params.category);
  }
  if (params.rating) {
    queryParams.append("rating", params.rating);
  }
  if (params.price) {
    queryParams.append("price", params.price);
  }
  if (params.search) {
    queryParams.append("search", params.search);
  }

  if (params.page) {
    queryParams.append("page", params.page);
  }

  const initialData = await fetch(
    `${process.env.BACKEND_PUBLIC_URL}/api/tutor?${queryParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  const initialTutors = await initialData.json();
  console.log(initialTutors);
  return (
    <section
      className={`flex justify-center mx-auto bg-linear-150 from-[${themeColor.dBlue}] via-[${themeColor.vanilla}] to-[${themeColor.dYellow}]`}
    >
      <div className="py-16 md:py-24">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
              Browse All Tutors
            </h1>
            <p className="mx-auto max-w-2xl text-[#40E0D0] md:text-lg">
              There are many tutors available, you can find the one that suits
              your needs. Filter by category, hourly rate, and rating.
            </p>
          </div>

          {/* Client Component handles all interactivity */}
          <TutorsClient
            initialTutors={initialTutors.data || []}
            searchParams={params}
          />
        </div>
      </div>
    </section>
  );
}
