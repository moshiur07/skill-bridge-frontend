import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
  Users,
  BookMarked,
  UserCircle,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type NavItem = {
  label?: string;
  isSection?: boolean;
  title?: string;
  icon?: LucideIcon;
  href?: string;
  children?: NavItem[];
};

export type Role = "tutor" | "student" | "admin";

export const tutorNav: NavItem[] = [
  { label: "Tutor", isSection: true },
  { title: "Dashboard", icon: LayoutDashboard, href: "/tutor-dashboard" },
  {
    title: "Availability",
    icon: CalendarDays,
    href: "/tutor-dashboard/availability",
  },
  { title: "Profile", icon: UserCircle, href: "/tutor-dashboard/profile" },
];

export const studentNav: NavItem[] = [
  { label: "Student", isSection: true },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/student-dashboard",
  },
  {
    title: "My Bookings",
    icon: BookMarked,
    href: "/student-dashboard/bookings",
  },
  {
    title: "Profile",
    icon: UserCircle,
    href: "/student-dashboard/profile",
  },
];

export const adminNav: NavItem[] = [
  { label: "Admin", isSection: true },
  { title: "Dashboard", icon: BarChart3, href: "/admin-dashboard" },
  { title: "Users", icon: Users, href: "/admin-dashboard/users" },
  {
    title: "Categories",
    icon: ClipboardList,
    href: "/admin-dashboard/categories",
  },
];

export function getNavByRole(role: Role): NavItem[] {
  switch (role) {
    case "tutor":
      return tutorNav;
    case "admin":
      return adminNav;
    case "student":
    default:
      return studentNav;
  }
}
