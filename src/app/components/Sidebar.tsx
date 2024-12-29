"use client";

import { LogIn, LogOut, User2, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col h-full">
      {session ? (
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
          {/* <div className="flex justify-end">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 pointer rounded-md p-2 hover:bg-slate-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div> */}
        </div>
      ) : (
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          <LogIn />
          Login
        </Link>
      )}
      <Link
        href="/profile"
        className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
      >
        <UserRoundPen />
        Profile
      </Link>
    </div>
  );
};
