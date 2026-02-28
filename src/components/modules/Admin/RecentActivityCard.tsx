// components/admin/RecentActivityCard.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "booking" | "user" | "tutor" | "review";
  title: string;
  description: string;
  timestamp: Date;
  status?: "success" | "pending" | "warning";
}

interface RecentActivityCardProps {
  isLoading?: boolean;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  isLoading = false,
}) => {
  // Mock data - replace with real API call
  const activities: Activity[] = [
    {
      id: "1",
      type: "booking",
      title: "New Booking Created",
      description: "John booked a session with Sarah Wilson",
      timestamp: new Date(Date.now() - 5 * 60000),
      status: "success",
    },
    {
      id: "2",
      type: "user",
      title: "New User Registered",
      description: "Mike Johnson signed up as a student",
      timestamp: new Date(Date.now() - 15 * 60000),
      status: "success",
    },
    {
      id: "3",
      type: "tutor",
      title: "Tutor Featured",
      description: "Emma Davis was marked as featured tutor",
      timestamp: new Date(Date.now() - 1 * 3600000),
      status: "success",
    },
    {
      id: "4",
      type: "review",
      title: "New Review Posted",
      description: "5-star review from Alex for Physics tutor",
      timestamp: new Date(Date.now() - 2 * 3600000),
      status: "success",
    },
  ];

  const getActivityIcon = (type: string) => {
    const icons = {
      booking: "📅",
      user: "👤",
      tutor: "👨‍🏫",
      review: "⭐",
    };
    return icons[type as keyof typeof icons] || "📋";
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "warning":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 border-b last:border-0"
            >
              <div className="text-2xl mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  {activity.status && (
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
