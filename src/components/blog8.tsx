// import { cn } from "@/lib/utils";
// import { ArrowRight } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import Link from "next/link";

// interface Post {
//   id: string;
//   bio: string;
//   hourly_rate: number;
//   rating_average: number;
//   image?: string;
//   isFeatured: boolean;
//   categories?: {
//     id: number;
//     name: string;
//     description: string;
//   }[];
//   user?: {
//     name: string;
//     email: string;
//   };
// }

// interface Blog8Props {
//   heading?: string;
//   description?: string;
//   posts?: Post[];
//   className?: string;
// }

// const Blog8 = async ({ className }: Blog8Props) => {
//   const data = await fetch("http://localhost:5000/api/tutor");
//   const posts = await data.json();
//   console.log(posts);
//   console.log(posts.data[0].categories);
//   return (
//     <section className={cn("py-32", className)}>
//       <div className="container flex flex-col items-center gap-16">
//         <div className="text-center">
//           <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
//             Browse All Tutors
//           </h2>
//           <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
//             There are many tutors available, you can find the one that suits
//             your needs. You can filter by category, hourly rate, and rating. You
//             can also view the tutor&apos;s profile to see more details about
//             them.
//           </p>
//         </div>
//         {/* there will filter option design div */}
//         <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
//           {posts.data.map((post: Post) => (
//             <Card
//               key={post.id}
//               className="order-last  bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2 border-2 border-red-700"
//             >
//               <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
//                 <div className="sm:col-span-5  pl-4">
//                   <div className="mb-4 md:mb-6">
//                     <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
//                       {post.categories?.map((tag) => (
//                         <span key={tag?.name}>{tag?.name}</span>
//                       ))}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
//                     {post.user?.name}
//                   </h3>
//                   <p className="mt-4 text-muted-foreground md:mt-5">
//                     {post.bio}
//                   </p>
//                   <div className="mt-6 flex items-center space-x-2 md:mt-8">
//                     Hourly Rate: <span>{post.hourly_rate}</span>$
//                   </div>
//                   <Link href={`http://localhost:3000/tutors/${post.id}`}>
//                     view Profile <ArrowRight></ArrowRight>
//                   </Link>
//                 </div>
//                 {/*  image */}
//                 <div className="order-first sm:order-last sm:col-span-5 border-2 border-purple-800">
//                   <a href={post?.image} target="_blank" className="block">
//                     <div className="aspect-16/9 overflow-clip rounded-lg border border-border">
//                       <img
//                         src={post.image}
//                         alt={post?.user?.name}
//                         className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
//                       />
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export { Blog8 };

// ! from here claude design starts

"use client";

import { cn } from "@/lib/utils";
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
import { useState, useEffect } from "react";

interface Post {
  id: string;
  bio: string;
  hourly_rate: number;
  rating_average: number;
  image?: string;
  isFeatured: boolean;
  categories?: {
    id: number;
    name: string;
    description: string;
  }[];
  user?: {
    name: string;
    email: string;
  };
}

interface BrowseTutorsProps {
  className?: string;
}

const BrowseTutors = ({ className }: BrowseTutorsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tutor");
        const data = await response.json();
        setPosts(data.data);
        setFilteredPosts(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get unique categories
  const categories = Array.from(
    new Set(
      posts.flatMap((post) => post.categories?.map((cat) => cat.name) || []),
    ),
  );

  // Apply filters
  // useEffect(() => {
  //   let filtered = [...posts];

  //   // Search filter
  //   if (searchQuery) {
  //     filtered = filtered.filter(
  //       (post) =>
  //         post.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         post.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         post.categories?.some((cat) =>
  //           cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  //         )
  //     );
  //   }

  //   // Category filter
  //   if (selectedCategory !== "all") {
  //     filtered = filtered.filter((post) =>
  //       post.categories?.some((cat) => cat.name === selectedCategory)
  //     );
  //   }

  //   // Rating filter
  //   if (selectedRating !== "all") {
  //     const minRating = parseFloat(selectedRating);
  //     filtered = filtered.filter((post) => post.rating_average >= minRating);
  //   }

  //   // Price range filter
  //   filtered = filtered.filter(
  //     (post) =>
  //       post.hourly_rate >= priceRange[0] && post.hourly_rate <= priceRange[1]
  //   );

  //   setFilteredPosts(filtered);
  // }, [searchQuery, selectedCategory, selectedRating, priceRange, posts]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedRating("all");
    setPriceRange([0, 200]);
  };

  if (loading) {
    return (
      <section className={cn("py-32", className)}>
        <div className="container flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading tutors...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-16 md:py-24", className)}>
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
            <div className={cn("space-y-6", !showFilters && "hidden lg:block")}>
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by tutor name, subject, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Rating</label>
                  <Select
                    value={selectedRating}
                    onValueChange={setSelectedRating}
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

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Hourly Rate: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    min={0}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-4"
                  />
                </div>
              </div>

              {/* Active Filters & Reset */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {filteredPosts.length}
                  </span>{" "}
                  {filteredPosts.length === 1 ? "tutor" : "tutors"} found
                </div>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Tutors Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No tutors found matching your criteria. Try adjusting your
              filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-full min-h-[300px] bg-muted">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post?.user?.name || "Tutor"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <div className="text-6xl font-bold text-primary/20">
                          {post.user?.name?.charAt(0) || "T"}
                        </div>
                      </div>
                    )}
                    {post.isFeatured && (
                      <Badge className="absolute top-4 left-4 bg-amber-500 hover:bg-amber-600">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    {/* Categories */}
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories?.map((tag) => (
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
                        {post.user?.name || "Anonymous Tutor"}
                      </h3>

                      {/* Bio */}
                      <p className="text-muted-foreground line-clamp-3 mb-6">
                        {post.bio}
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
                              {post.rating_average?.toFixed(1) || "New"}
                            </span>
                          </div>
                          {post.rating_average && (
                            <span className="text-sm text-muted-foreground">
                              rating
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ${post.hourly_rate}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per hour
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link href={`/tutors/${post.id}`}>
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
      </div>
    </section>
  );
};

export { BrowseTutors };
