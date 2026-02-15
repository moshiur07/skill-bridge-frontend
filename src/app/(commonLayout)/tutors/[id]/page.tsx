import { notFound } from "next/navigation";
import { TutorProfileClient } from "@/components/Tutors/TutorProfileClient";
import { TutorProfilePageProps, ApiResponse } from "@/Types/schemaTypes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { themeColor } from "@/components/helper/colorValue";

export default async function TutorProfilePage({
  params,
}: TutorProfilePageProps) {
  const { id } = await params;

  // Fetch tutor profile from API
  const response = await fetch(
    `${process.env.BACKEND_PUBLIC_URL}/api/tutor/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    notFound();
  }

  const result: ApiResponse = await response.json();

  if (!result.success || !result.data) {
    notFound();
  }

  const tutor = result.data;
  console.log(themeColor.vanilla);
  return (
    <section
      className={`flex justify-center mx-auto bg-linear-to-br from-[${themeColor.dBlue}] via-[${themeColor.dYellow}] to-[${themeColor.vanilla}]`}
    >
      <div className="min-h-screen py-16 md:py-24">
        <div className="container">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                  {tutor.image ? (
                    <img
                      src={tutor.image}
                      alt={tutor.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-9xl font-bold text-primary/20">
                        {tutor.user.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                {tutor.isFeatured && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ⭐ Featured Tutor
                  </div>
                )}
              </div>

              {/* Right: Info */}
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {tutor.user.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span className="text-2xl font-bold">
                        {tutor.rating_average > 0
                          ? tutor.rating_average.toFixed(1)
                          : "New"}
                      </span>
                      {tutor.rating_average > 0 && (
                        <span className="text-muted-foreground">
                          ({tutor.bookings.length} reviews)
                        </span>
                      )}
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div className="text-3xl font-bold text-primary">
                      ${tutor.hourly_rate}
                      <span className="text-base font-normal text-muted-foreground">
                        /hour
                      </span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tutor.categories.map((category) => (
                      <span
                        key={category.id}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">About</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {tutor.bio}
                  </p>
                </div>

                {/* Expertise */}
                {tutor.categories.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Expertise</h2>
                    <div className="space-y-3">
                      {tutor.categories.map((category) => (
                        <div
                          key={category.id}
                          className="border-l-4 border-primary pl-4"
                        >
                          <h3 className="font-semibold">{category.name}</h3>
                          {category.description && (
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link href={`/booking/${tutor.id}`}>
                  <Button className="w-full py-6 text-black hover:text-white hover:cursor-pointer text-[18px] mt-3 bg-[#FDD023]">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Pass data to client component for interactive features */}
          <TutorProfileClient tutor={tutor} tutorId={id} />
        </div>
      </div>
    </section>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TutorProfilePageProps) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${process.env.BACKEND_PUBLIC_URL}/api/tutor/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        title: "Tutor Not Found",
      };
    }

    const result: ApiResponse = await response.json();
    const tutor = result.data;

    return {
      title: `${tutor.user.name} - ${tutor.categories.map((c) => c.name).join(", ")} Tutor`,
      description: tutor.bio.substring(0, 160),
    };
  } catch (error) {
    return {
      title: "Tutor Profile",
    };
  }
}
