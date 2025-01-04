"use client";

import { useToggle } from "@uidotdev/usehooks";
import { LogIn, LogOut, Menu, Settings2, User2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Logo } from "@/app/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const HeaderLink: React.FC<React.ComponentProps<typeof Link>> = ({ children, className, ...props }) => {
  return (
    <Link className={cn(buttonVariants({ variant: "link" }), className)} {...props}>
      {children}
    </Link>
  );
};

export default function Header() {
  const [isDrawerOpen, toggleDrawer] = useToggle(false);
  const { data: session } = useSession();
  const router = useRouter();

  const sidebarButtonClickHandler = (link: string) => () => {
    toggleDrawer(false);
    router.push(link);
  };

  return (
    <header className="bg-slate-50 border-b-2 shadow-sm text-gray-800 print:hidden">
      <nav>
        <div className="lg:container lg:mx-auto px-4 md:px-10 py-4 flex justify-between items-center h-16">
          <Link href="/">
            <Logo />
          </Link>
          <ul className="hidden lg:flex lg:items-center">
            {!session?.user && (
              <li>
                <HeaderLink href="/profile">
                  <Settings2 size={18} />
                  Settings
                </HeaderLink>
              </li>
            )}
            <li>
              {!session?.user ? (
                <HeaderLink href="/login">
                  <LogIn size={18} />
                  Login
                </HeaderLink>
              ) : (
                <div className="flex items-center">
                  <HeaderLink href="/profile">
                    <User2 size={18} />
                    {session.user?.email}
                  </HeaderLink>
                  <Button variant="ghost" onClick={() => signOut()} title="Logout">
                    <LogOut size={18} />
                  </Button>
                </div>
              )}
            </li>
          </ul>

          <Sheet open={isDrawerOpen} onOpenChange={(open) => toggleDrawer(open)}>
            <SheetTrigger className="lg:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-4" aria-describedby={undefined}>
              <SheetHeader>
                <SheetTitle className="pb-4 pl-4 border-b flex justify-between items-center">
                  <Logo />
                  <SheetClose asChild onClick={() => toggleDrawer(false)}>
                    <Button variant="link" size="icon">
                      <X />
                    </Button>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-2 p-4">
                <Button
                  onClick={sidebarButtonClickHandler("/profile")}
                  variant="ghost"
                  className="justify-start w-full"
                >
                  <Settings2 />
                  Settings
                </Button>
                {!session && (
                  <Button
                    onClick={sidebarButtonClickHandler("/login")}
                    variant="ghost"
                    className="justify-start w-full"
                  >
                    <LogIn />
                    Login
                  </Button>
                )}
              </div>
              {session && (
                <div className="absolute bottom-0 right-0 h-32 w-full p-4">
                  <div className="border rounded-sm border-l-8 h-full p-4">
                    <div className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <User2 size={18} />
                        <p className="text-sm">{session.user?.email}</p>
                        <Button onClick={() => signOut()} title="Logout" variant="link" size="icon">
                          <LogOut />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
