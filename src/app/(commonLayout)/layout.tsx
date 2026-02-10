import { Navbar5 } from "@/components/navbar5";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar5 />
      {children}
    </div>
  );
};

export default CommonLayout;
