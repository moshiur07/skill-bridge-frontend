// app/admin/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { adminDashboardAPI, DashboardStats } from "@/lib/api/admin";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StatCard from "@/components/modules/Admin/StatCard";
import BookingStatusChart from "@/components/modules/Admin/Bookingstatuschart";
import RevenueChart from "@/components/modules/Admin/ReveneuChart";
import RecentActivityCard from "@/components/modules/Admin/RecentActivityCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/admin/dashboard-stats`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("data of admin stats", data);
      setStats(data?.data);
    } catch (err) {
      setError("Failed to load dashboard statistics. Please try again.");
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 px-10 py-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to SkillBridge Admin Dashboard
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          variant="blue"
          isLoading={isLoading}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Tutors"
          value={stats?.totalTutors || 0}
          icon={GraduationCap}
          variant="purple"
          isLoading={isLoading}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue || 0}`}
          icon={DollarSign}
          variant="green"
          isLoading={isLoading}
          trend={{ value: 25, isPositive: true }}
        />
        <StatCard
          title="Pending Bookings"
          value={stats?.totalBookings || 0}
          icon={BookOpen}
          variant="blue"
          isLoading={isLoading}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingStatusChart isLoading={isLoading} />
        <RevenueChart isLoading={isLoading} />
      </div>

      {/* Recent Activity */}
      <div>
        <RecentActivityCard isLoading={isLoading} />
      </div>
    </div>
  );
}
