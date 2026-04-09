"use client";

import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import UserDropdown from "@/components/shadcn-space/blocks/dashboard-shell-01/user-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Navbar5Props {
  className?: string;
  session?: any;
}

const Navbar5 = ({ className, session }: Navbar5Props) => {
  const user = session?.data?.user;
  const dashboardHref =
    user?.role === "admin"
      ? "/admin-dashboard"
      : user?.role === "tutor"
        ? "/tutor-dashboard"
        : "/student-dashboard";
  return (
    <section className={cn("relative", className)}>
      <div className=" z-10  w-full py-4 fixed top-0 left-0  bg-opacity-50 backdrop-blur-lg  transition-all duration-300 ease-in-out bg-white/0">
        {/* <div className="absolute z-10  w-full py-4 "> */}
        <nav className="flex justify-between px-10 ">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/skillbridge logo.png"
              className="max-h-8"
              height={32}
              width={32}
              alt="logo"
            />
            <span className="text-lg font-semibold text-white hover:text-black">
              Skill Bridge
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/tutors"
                  className={`${navigationMenuTriggerStyle()}relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100`}
                >
                  Tutors
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  className={`${navigationMenuTriggerStyle()}relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100`}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href={dashboardHref}
                  className={`${navigationMenuTriggerStyle()}relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100`}
                >
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
              {user?.role === "student" && (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/become-tutor"
                    className={`${navigationMenuTriggerStyle()}relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100`}
                  >
                    Become A Tutor
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {session.data ? (
              <div className="flex items-center gap-3 text-white">
                {" "}
                <div>{user?.name}</div>
                <UserDropdown
                  user={user}
                  defaultOpen={false}
                  align="center"
                  trigger={
                    <div className="rounded-full">
                      <Avatar className="size-8 cursor-pointer">
                        <AvatarImage
                          src={
                            user?.image
                              ? `${user.image}`
                              : "https://images.shadcnspace.com/assets/profiles/user-11.jpg"
                          }
                          alt="User"
                        />
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                    </div>
                  }
                />
              </div>
            ) : (
              <Link
                href={"/login"}
                className="bg-transparent text-xl hover:bg-transparent text-white hover:text-black relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Log in
              </Link>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden bg-transparent">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="max-h-screen flex  rounded-xl w-1/2 overflow-auto backdrop-blur-sm bg-white/30 border border-white/20 text-white"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/skillbridge logo.png"
                      className="max-h-8"
                      height={32}
                      width={32}
                      alt="logo"
                    />
                    <span className="text-lg font-semibold text-white hover:text-black">
                      Skill Bridge
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  <Link
                    href={"/tutors"}
                    className="flex items-center gap-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    Tutors
                  </Link>
                  <Link
                    href={"/about"}
                    className="flex items-center gap-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    About
                  </Link>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    Dashboard
                  </Link>
                  {user?.role === "student" && (
                    <Link
                      href={"/become-tutor"}
                      className="flex items-center gap-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      Become A Tutor
                    </Link>
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {session.data ? (
                    <div className="flex items-center gap-3 text-white">
                      {" "}
                      <div>{user?.name}</div>
                      <Avatar className="size-8 cursor-pointer">
                        <AvatarImage
                          src={
                            user?.image
                              ? `${user?.image}`
                              : "https://images.shadcnspace.com/assets/profiles/user-11.jpg"
                          }
                          alt="User"
                        />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <Link
                      href={"/login"}
                      className="bg-transparent text-xl hover:bg-transparent text-white hover:text-black relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar5 };
