import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const LOGOUT_ITEM = {
  label: "Signout",
  icon: LogOut,
  destructive: true,
};

export function SiteHeader() {
  const logOutUser = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="bg-red-500 rounded-xl flex items-center gap-2 lg:gap-3 p-2 lg:py-3   lg:px-4 text-sm font-medium  cursor-pointer ">
        <LOGOUT_ITEM.icon size={20} />
        <span onClick={() => logOutUser()}>{LOGOUT_ITEM.label}</span>
      </div>
    </div>
  );
}
