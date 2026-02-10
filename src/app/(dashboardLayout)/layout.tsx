import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
};

export default DashBoardLayout;
