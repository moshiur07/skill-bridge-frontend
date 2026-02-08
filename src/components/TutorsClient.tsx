"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArrowRight, Star, Search, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useEffect, useState, useTransition, useMemo } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Tutor {
  id: string;
  bio: string;
  hourly_rate: number;
  rating_average: number;
  image?: string;
  isFeatured: boolean;
  categories?: Category[];
  user?: {
    name: string;
    email: string;
  };
}

interface TutorsClientProps {
  initialTutors: Tutor[];
  searchParams: {
    category?: string;
    rating?: string;
    price?: string;
    search?: string;
  };
}

export function TutorsClient({
  initialTutors,
  searchParams,
}: TutorsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [showFilters, setShowFilters] = useState(false);
  const [remainingTutors, setRemainingTutors] = useState<Tutor[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  const filters = {
    category: searchParams.category || "all",
    rating: searchParams.rating || "all",
    price: searchParams.price ? parseInt(searchParams.price) : 500, // ✅ Match max value
    search: searchParams.search || "",
  };

  // Fetch remaining tutors after initial 3 (client-side)
  useEffect(() => {
    const fetchRemainingTutors = async () => {
      try {
        const params = new URLSearchParams();
        params.append("skip", "3");

        // Add active filters to API call
        if ((await filters.category) !== "all") {
          params.append("category", filters.category);
        }
        if (filters.rating !== "all") {
          params.append("rating", filters.rating);
        }
        if (filters.price !== 200) {
          params.append("price", filters.price.toString());
        }
        if (filters.search) {
          params.append("search", filters.search);
        }

        const response = await fetch(
          `http://localhost:5000/api/tutor?${params.toString()}`,
        );
        console.log(response);
        const data = await response.json();
        setRemainingTutors(data.data || []);
      } catch (error) {
        console.error("Error fetching remaining tutors:", error);
      } finally {
        setIsLoadingMore(false);
      }
    };

    fetchRemainingTutors();
  }, [filters]);

  // Combine initial + remaining tutors
  const allTutors = useMemo(() => {
    return [...initialTutors, ...remainingTutors];
  }, [initialTutors, remainingTutors]);

  const categories = useMemo(() => {
    const categoryMap = new Map();
    allTutors.forEach((tutor) => {
      tutor.categories?.forEach((cat) => {
        if (!categoryMap.has(cat.id)) {
          categoryMap.set(cat.id, cat);
        }
      });
    });
    return Array.from(categoryMap.values());
  }, [allTutors]);

  //   // Filter tutors based on URL params (client-side only for instant feedback)
  //   const filteredTutors = useMemo(() => {
  //     let filtered = [...allTutors];

  //     // Search filter
  //     if (filters.search) {
  //       const searchLower = filters.search.toLowerCase();
  //       filtered = filtered.filter(
  //         (tutor) =>
  //           tutor.user?.name.toLowerCase().includes(searchLower) ||
  //           tutor.bio.toLowerCase().includes(searchLower) ||
  //           tutor.categories?.some((cat) =>
  //             cat.name.toLowerCase().includes(searchLower),
  //           ),
  //       );
  //     }

  //     // Category filter (now using category ID)
  //     if (filters.category !== "all") {
  //       const categoryId = parseInt(filters.category);
  //       filtered = filtered.filter((tutor) =>
  //         tutor.categories?.some((cat) => cat.id === categoryId),
  //       );
  //     }

  //     // Rating filter
  //     if (filters.rating !== "all") {
  //       const minRating = parseFloat(filters.rating);
  //       filtered = filtered.filter((tutor) => tutor.rating_average >= minRating);
  //     }

  //     // Max price filter
  //     filtered = filtered.filter((tutor) => tutor.hourly_rate <= filters.price);

  //     return filtered;
  //   }, [allTutors, filters]);

  // Backend handles filtering, we just display the data
  const filteredTutors = allTutors;

  // Update URL params (replaces useState)
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString());

    if (
      value === "" ||
      value === "all" ||
      (key === "price" && value === "200")
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <>
      {/* Filter Section */}
      <div className="mb-12">
        <Card className="p-6">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide" : "Show"}
            </Button>
          </div>

          {/* Filter Controls */}
          <div className={showFilters ? "block lg:block" : "hidden lg:block"}>
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by tutor name, subject, or keyword..."
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => updateFilter("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Rating</label>
                  <Select
                    value={filters.rating}
                    onValueChange={(value) => updateFilter("rating", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4.5">4.5★ & up</SelectItem>
                      <SelectItem value="4.0">4.0★ & up</SelectItem>
                      <SelectItem value="3.5">3.5★ & up</SelectItem>
                      <SelectItem value="3.0">3.0★ & up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Max Price Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Max Hourly Rate: ${filters.price}
                  </label>
                  <Slider
                    min={0}
                    max={500} // ✅ Increase max based on your data
                    step={10}
                    value={[filters.price]}
                    onValueChange={(value) =>
                      updateFilter("price", value[0].toString())
                    }
                    className="mt-4"
                  />
                </div>
              </div>

              {/* Active Filters & Reset */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  {isPending || isLoadingMore ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Loading tutors...
                    </span>
                  ) : (
                    <>
                      <span className="font-medium text-foreground">
                        {filteredTutors.length}
                      </span>{" "}
                      {filteredTutors.length === 1 ? "tutor" : "tutors"} showing
                    </>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tutors Grid */}
      {filteredTutors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No tutors found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {filteredTutors.map((tutor, index) => (
            <Card
              key={`${tutor.id}-${index}`}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-full min-h-[300px] bg-muted">
                  {tutor.image ? (
                    <img
                      src={tutor.image}
                      alt={tutor?.user?.name || "Tutor"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="text-6xl font-bold text-primary/20">
                        {tutor.user?.name?.charAt(0) || "T"}
                      </div>
                    </div>
                  )}
                  {tutor.isFeatured && (
                    <Badge className="absolute top-4 left-4 bg-amber-500 hover:bg-amber-600">
                      Featured
                    </Badge>
                  )}
                  {/* Loading indicator for tutors beyond initial 3 */}
                  {index >= initialTutors.length && isLoadingMore && (
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tutor.categories?.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      {tutor.user?.name || "Anonymous Tutor"}
                    </h3>

                    {/* Bio */}
                    <p className="text-muted-foreground line-clamp-3 mb-6">
                      {tutor.bio}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {/* Rating & Price */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-5 w-5 fill-current" />
                          <span className="font-semibold text-foreground">
                            {tutor.rating_average?.toFixed(1) || "New"}
                          </span>
                        </div>
                        {tutor.rating_average && (
                          <span className="text-sm text-muted-foreground">
                            rating
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${tutor.hourly_rate}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          per hour
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href={`/tutors/${tutor.id}`}>
                      <Button className="w-full group" size="lg">
                        View Profile
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
