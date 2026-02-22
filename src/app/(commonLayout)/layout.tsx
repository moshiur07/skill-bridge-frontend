import { Footer7 } from "@/components/footer7";
import { Navbar5 } from "@/components/modules/home/navbar5";
import { userService } from "@/components/services/user.service";

import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await userService.getSession();
  console.log(session);
  return (
    <div>
      <Navbar5 session={session} />
      {children}
      <Footer7 />
    </div>
  );
};

export default CommonLayout;
