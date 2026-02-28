// !claude

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookMarked,
  DollarSign,
  Clock,
  Search,
  ChevronRight,
  Star,
  AlertCircle,
  CheckCircle2,
  CalendarClock,
} from "lucide-react";
import Link from "next/link";
import { studentService } from "@/components/services/student.service";

// ─── Types ────────────────────────────────────────────────────────────────────
type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface RecentBooking {
  id: string;
  tutor: { name: string; image?: string };
  subject: string;
  status: BookingStatus;
  total_price: number;
  duration_hours: number;
}

const statusConfig: any = {
  pending: {
    label: "Pending",
    className: "border-amber-200 text-amber-700 bg-amber-50",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  confirmed: {
    label: "Confirmed",
    className: "border-blue-200 text-blue-700 bg-blue-50",
    icon: <CalendarClock className="w-3 h-3" />,
  },
  completed: {
    label: "Completed",
    className: "border-emerald-200 text-emerald-700 bg-emerald-50",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  cancelled: {
    label: "Cancelled",
    className: "border-red-200 text-red-700 bg-red-50",
    icon: <AlertCircle className="w-3 h-3" />,
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="shadow-xl shadow-slate-800">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function StudentDashboard() {
  const resData = await studentService.getMyBookings();
  const stats = await resData?.stats;
  console.log(await resData, await stats);
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back! Here's your learning overview.
          </p>
        </div>
        <Link href="/tutors">
          <Button size="sm" className="gap-1.5">
            <Search className="w-4 h-4" /> Find a Tutor
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Sessions"
          value={stats?.total_bookings}
          sub="All time"
          icon={BookMarked}
        />
        <StatCard
          title="Completed"
          value={stats?.completed}
          sub="Sessions done"
          icon={CheckCircle2}
        />
        <StatCard
          title="Upcoming"
          value={stats?.upcoming}
          sub="Confirmed sessions"
          icon={CalendarClock}
        />
        <StatCard
          title="Total Spent"
          value={`$${stats?.total_spent}`}
          sub="All time"
          icon={DollarSign}
        />
      </div>

      {/* Recent bookings */}
      <Card className="shadow-xl shadow-slate-800">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent Bookings</CardTitle>
            <CardDescription>Your latest session activity</CardDescription>
          </div>
          <Link href="/student-dashboard/bookings">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-xs text-muted-foreground"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {resData?.data?.map((b: any) => {
            const s = statusConfig[b?.status];
            return (
              <div
                key={b.id}
                className="flex items-center justify-between gap-3 rounded-lg border px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src={b?.tutor?.image} />
                    <AvatarFallback className="text-xs">
                      {initials(b?.tutor?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {b.tutor?.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {b.subject} · {b.duration_hours}h
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-medium">${b.total_price}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs gap-1 ${s.className}`}
                  >
                    {s.icon}
                    {s.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Browse CTA */}
      <Card className="shadow-xl shadow-slate-800 border-primary/20 bg-primary/5">
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-medium text-sm">
                Ready for your next session?
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Browse available tutors and book a session today.
              </p>
            </div>
            <Link href="/tutors">
              <Button size="sm" variant="outline" className="shrink-0 gap-1.5">
                <Search className="w-3.5 h-3.5" /> Browse Tutors
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
