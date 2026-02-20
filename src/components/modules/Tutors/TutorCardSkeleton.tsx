import { Card } from "@/components/ui/card";

interface TutorCardSkeletonProps {
  count?: number;
}

export function TutorCardSkeleton({ count = 3 }: TutorCardSkeletonProps) {
  return (
    <div className="grid gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden animate-pulse">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Skeleton */}
            <div className="relative h-64 md:h-full min-h-[300px] bg-muted" />

            {/* Content Skeleton */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-5 w-24 bg-muted rounded-full" />
                  <div className="h-5 w-20 bg-muted rounded-full" />
                </div>

                {/* Name */}
                <div className="h-8 w-3/4 bg-muted rounded mb-3" />

                {/* Bio */}
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              </div>

              {/* Bottom Section */}
              <div>
                {/* Rating & Price */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div className="h-6 w-20 bg-muted rounded" />
                  <div className="h-8 w-16 bg-muted rounded" />
                </div>

                {/* Button */}
                <div className="h-12 w-full bg-muted rounded" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
