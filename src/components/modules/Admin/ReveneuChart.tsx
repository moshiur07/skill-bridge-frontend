// components/admin/RevenueChart.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface RevenueChartProps {
  isLoading?: boolean;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ isLoading = false }) => {
  // Mock revenue data - replace with real API call
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 },
    { month: "Apr", revenue: 2780 },
    { month: "May", revenue: 1890 },
    { month: "Jun", revenue: 2390 },
    { month: "Jul", revenue: 3490 },
  ];

  const maxRevenue = Math.max(...revenueData.map((item) => item.revenue));
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / revenueData.length);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simple bar chart */}
        <div className="space-y-6">
          {/* Chart bars */}
          <div className="flex items-end gap-2 h-40">
            {revenueData.map((item, index) => {
              const height = (item.revenue / maxRevenue) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <div
                    className="w-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}px`, minHeight: "8px" }}
                  ></div>
                  <span className="text-xs text-gray-600 font-medium">
                    {item.month}
                  </span>
                  <div className="absolute opacity-0 group-hover:opacity-100 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none transition-opacity mb-2">
                    ${item.revenue}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Average</p>
              <p className="text-xl font-bold text-gray-900">
                ${avgRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
