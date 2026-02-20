import { Footer7 } from "@/components/footer7";
import { Navbar5 } from "@/components/modules/home/navbar5";

import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar5 />
      {children}
      <Footer7 />
    </div>
  );
};

export default CommonLayout;
