// components/admin/BookingStatusChart.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingStatusChartProps {
  isLoading?: boolean;
}

const BookingStatusChart: React.FC<BookingStatusChartProps> = ({
  isLoading = false,
}) => {
  // Mock chart data - replace with real API call
  const chartData = [
    { status: "Completed", count: 156, color: "bg-green-500" },
    { status: "Confirmed", count: 98, color: "bg-blue-500" },
    { status: "Pending", count: 42, color: "bg-yellow-500" },
    { status: "Cancelled", count: 24, color: "bg-red-500" },
  ];

  const totalBookings = chartData.reduce((sum, item) => sum + item.count, 0);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-8 w-full" />
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
        <CardTitle>Booking Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {chartData.map((item, index) => {
            const percentage = (item.count / totalBookings) * 100;
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.status}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {item.count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color} transition-all`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {percentage.toFixed(1)}%
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{totalBookings}</span>{" "}
            total bookings
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingStatusChart;
