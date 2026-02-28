// "use client";
// import React from "react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarProvider,
// } from "@/components/ui/sidebar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Logo from "@/assets/logo/logo";
// import { NavMain } from "@/components/shadcn-space/blocks/dashboard-shell-01/nav-main";
// import {
//   AlignStartVertical,
//   BarChart3,
//   CircleUserRound,
//   ClipboardList,
//   Languages,
//   LucideIcon,
//   Notebook,
//   NotepadText,
//   Table,
//   Ticket,
// } from "lucide-react";
// import { SiteHeader } from "@/components/shadcn-space/blocks/dashboard-shell-01/site-header";
// import SimpleBar from "simplebar-react";
// import "simplebar-react/dist/simplebar.min.css";
// import Link from "next/link";
// import Image from "next/image";

// export type NavItem = {
//   label?: string;
//   isSection?: boolean;
//   title?: string;
//   icon?: LucideIcon;
//   href?: string;
//   children?: NavItem[];
// };

// export const navData: NavItem[] = [
//   // Dashboards Section
//   { label: "Dashboards", isSection: true },
//   { title: "Analytics", icon: BarChart3, href: "#" },
//   { title: "CRM Dashboard", icon: ClipboardList, href: "#" },
// ];

// /* -------------------------------------------------------------------------- */
// /*                                   Page                                     */
// /* -------------------------------------------------------------------------- */

// const AppSidebar = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <SidebarProvider>
//       <Sidebar className="py-4 px-0 bg-slate-300">
//         <div className="flex flex-col gap-6 bg-slate-300">
//           {/* ---------------- Header ---------------- */}
//           <SidebarHeader className="py-0 px-4 ">
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <Link
//                   href="/"
//                   className=" flex gap-3 hover:text-white hover:bg-slate-500 p-3 hover:rounded-2xl"
//                 >
//                   {" "}
//                   <Image
//                     src="/skillbridge logo.png"
//                     className="max-h-8"
//                     height={32}
//                     width={32}
//                     alt="logo"
//                   />
//                   <span className="text-lg font-semibold ">Skill Bridge</span>
//                 </Link>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarHeader>

//           {/* ---------------- Content ---------------- */}
//           <SidebarContent className="overflow-hidden gap-0 px-0">
//             <SimpleBar autoHide={true} className="border-b border-border">
//               <div className="px-4">
//                 <NavMain items={navData} />
//               </div>
//             </SimpleBar>
//           </SidebarContent>
//         </div>
//       </Sidebar>

//       {/* ---------------- Main ---------------- */}
//       <div className="flex flex-1 flex-col bg-slate-300">
//         <header className="sticky top-0 z-50 flex items-center border-b px-6 py-3">
//           <SiteHeader />
//         </header>
//         <main className="flex-1">{children}</main>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default AppSidebar;

// ! claude

"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/shadcn-space/blocks/dashboard-shell-01/nav-main";
import { SiteHeader } from "@/components/shadcn-space/blocks/dashboard-shell-01/site-header";
// adjust path as needed
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Link from "next/link";
import Image from "next/image";
import { getNavByRole, Role } from "@/lib/nav-config";

interface AppSidebarProps {
  children: React.ReactNode;
  /**
   * Pass the current user's role from the server layout.
   * e.g. in dashboard/layout.tsx:
   *   const session = await getSession();
   *   <AppSidebar role={session.user.role}>...</AppSidebar>
   */
  role: Role;
}

const AppSidebar = ({ children, role }: AppSidebarProps) => {
  const navItems = getNavByRole(role);
  return (
    <SidebarProvider>
      <Sidebar className="py-4 px-0 bg-slate-300">
        <div className="flex flex-col gap-6 bg-slate-300">
          {/* ── Logo ─────────────────────────────────────────────────── */}
          <SidebarHeader className="py-0 px-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link
                  href="/"
                  className="flex gap-3 hover:text-white hover:bg-slate-500 p-3 hover:rounded-2xl transition-colors"
                >
                  <Image
                    src="/skillbridge logo.png"
                    className="max-h-8"
                    height={32}
                    width={32}
                    alt="Skill Bridge logo"
                  />
                  <span className="text-lg font-semibold">Skill Bridge</span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          {/* ── Nav ──────────────────────────────────────────────────── */}
          <SidebarContent className="overflow-hidden gap-0 px-0">
            <SimpleBar autoHide className="border-b border-border">
              <div className="px-4">
                {/*
                  NavMain receives role-specific items.
                  No changes needed to NavMain itself — it just renders whatever
                  array you give it.
                */}
                <NavMain items={navItems} />
              </div>
            </SimpleBar>
          </SidebarContent>
        </div>
      </Sidebar>

      {/* ── Main area ────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col bg-slate-300">
        <header className="sticky top-0 z-50 flex items-center border-b px-6 py-3">
          <SiteHeader />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;
