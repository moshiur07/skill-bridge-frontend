import { userService } from "@/components/services/user.service";
import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

const DashBoardLayout = async ({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) => {
  const session = await userService.getSession();

  return (
    <div>
      <TooltipProvider>
        <AppSidebar role={session?.data?.user?.role}>
          {admin}
          {tutor}
          {student}
        </AppSidebar>
      </TooltipProvider>
    </div>
  );
};

export default DashBoardLayout;
