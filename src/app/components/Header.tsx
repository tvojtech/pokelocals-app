"use client";

import { useToggle } from "@uidotdev/usehooks";
import { LogIn, LogOut, Menu, User2, UserRoundPen, X } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Logo } from "@/app/components/Logo";
import { Sidebar } from "@/app/components/Sidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const HeaderLink: React.FC<React.ComponentProps<typeof Link>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={cn(buttonVariants({ variant: "link" }), className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const { data: session } = useSession();

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
                  <UserRoundPen size={18} />
                  Profile
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
                  <Button
                    variant="ghost"
                    onClick={() => signOut()}
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </Button>
                </div>
              )}
            </li>
          </ul>

          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-4"
              aria-describedby={undefined}
            >
              <SheetHeader>
                <SheetTitle className="pb-4 pl-4 border-b flex justify-between items-center">
                  <Logo />
                  <SheetClose asChild>
                    <Button variant="link" size="icon">
                      <X />
                    </Button>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-2 p-4">
                {!session && (
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-start w-full"
                    )}
                  >
                    <LogIn />
                    Login
                  </Link>
                )}
              </div>
              {session && (
                <div className="absolute bottom-0 right-0 h-32 w-full p-4">
                  <div className="border rounded-sm border-l-8 h-full p-4">
                    <div className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <User2 size={18} />
                        <p className="text-sm">{session.user?.email}</p>
                        <Button
                          onClick={() => signOut()}
                          title="Logout"
                          variant="link"
                          size="icon"
                        >
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
