import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Star,
  DollarSign,
  CalendarCheck,
  Clock,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Circle,
} from "lucide-react";
import Link from "next/link";
import { tutorServices } from "@/components/services/tutor.service";
import { CompleteButton } from "@/components/modules/Tutors/CompleteButton";
import { cookies } from "next/headers";

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const statusConfig: any = {
  pending: {
    label: "Pending",
    variant: "outline",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  confirmed: {
    label: "Confirmed",
    variant: "default",
    icon: <Circle className="w-5 h-5" />,
  },
  completed: {
    label: "Completed",
    variant: "secondary",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  cancelled: {
    label: "Cancelled",
    variant: "destructive",
    icon: <XCircle className="w-3 h-3" />,
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <Card className="shadow-xl">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className={`p-2 rounded-lg ${accent ?? "bg-primary/10"}`}>
            <Icon
              className={`w-5 h-5 ${accent ? "text-white" : "text-primary"}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TutorDashboard = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  let resData = { data: [], stats: null };

  try {
    const res = await fetch(`${API_BASE}/api/bookings/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const parsed = await res.json();
      resData = {
        data: parsed?.data || [],
        stats: parsed?.stats || null,
      };
    }
  } catch (error) {
    console.error("Dashboard fetch error:", error);
  }

  const stats: any = await resData.stats;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Page title */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Tutor Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back! Here's what's happening with your sessions.
          </p>
        </div>
        <Link href="/tutor-dashboard/availability">
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Availability</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </Link>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="Total Earnings"
          value={`$${stats?.total_earnings || 0}`}
          sub="All time"
          icon={DollarSign}
        />
        <StatCard
          title="Sessions Done"
          value={stats?.completed_sessions || 0}
          sub="Completed"
          icon={BookOpen}
        />
        <StatCard
          title="Pending Requests"
          value={stats?.pending_bookings || 0}
          sub="Needs action"
          icon={CalendarCheck}
        />
        <StatCard
          title="Rating"
          value={`${(stats?.rating_average || 0).toFixed(1)} ★`}
          sub={`${stats?.total_reviews || 0} reviews`}
          icon={Star}
        />
      </div>

      {/* ── Main Bookings Section ─────────────────────────────────────────── */}
      <Card className="border shadow-xl">
        <CardHeader className="">
          <CardTitle className="text-lg md:text-xl">
            Your All Bookings
          </CardTitle>
          <CardDescription>Your latest student sessions</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto pl-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resData?.data?.map((b: any) => {
                  const s = statusConfig[b.status];
                  return (
                    <TableRow key={b.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-7 h-7">
                            <AvatarImage src={b?.student?.image} />
                            <AvatarFallback className="text-xs">
                              {initials(b.student.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">
                            {b?.student?.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{b?.subject}</TableCell>
                      <TableCell className="text-sm">
                        {formatDate(b?.created_at)}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {b?.duration_hours}h
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        ${b?.total_price}
                      </TableCell>
                      <TableCell>
                        <Badge variant={s.variant} className="gap-1 text-xs">
                          {s.icon}
                          {s.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {b.status === "confirmed" && (
                          <CompleteButton bookingId={b.id} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile list */}
          <div className="sm:hidden divide-y">
            {resData?.data?.map((b: any) => {
              const s = statusConfig[b.status];
              return (
                <div key={b.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={b?.student?.image} />
                        <AvatarFallback className="text-xs">
                          {initials(b.student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{b.student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {b.subject}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">
                      ${b.total_price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {b.duration_hours}h • {formatDate(b.created_at)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={s.variant} className="text-xs gap-1">
                      {s.icon}
                      {s.label}
                    </Badge>
                    {b.status === "confirmed" && (
                      <CompleteButton bookingId={b.id} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!resData?.data?.length && (
            <div className="p-8 text-center text-muted-foreground">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No bookings yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Pending requests callout ───────────────────────────────────────── */}
      {stats?.pending_bookings > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 shadow-xl">
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    You have {stats.pending_bookings} pending booking request
                    {stats.pending_bookings > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Students are waiting for your confirmation.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TutorDashboard;
