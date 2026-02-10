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
  }>;
}) {
  // ✅ Await searchParams in Next.js 15+
  const params = await searchParams;

  // Build query params with filters
  const queryParams = new URLSearchParams();

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

  const initialData = await fetch(
    `http://localhost:5000/api/tutor?${queryParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  const initialTutors = await initialData.json();

  return (
    <section className="flex mx-auto justify-center align-middle bg-linear-to-br from-purple-700 via-yellow-600 to-green-400">
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
          <TutorsClient
            initialTutors={initialTutors.data || []}
            searchParams={params}
          />
        </div>
      </div>
    </section>
  );
}
