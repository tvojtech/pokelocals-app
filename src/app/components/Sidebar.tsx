"use client";

import { LogIn, LogOut, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Avatar } from "@/app/components/Avatar";

export const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col h-full space-y-4">
      {session ? (
        <div>
          <div className="flex items-center gap-2">
            {session.user?.image && (
              <Avatar
                src={session.user?.image}
                alt="avatar"
                className="bg-transparent"
              />
            )}
            {session.user?.email}
            <button
              onClick={() => signOut()}
              className="pointer rounded-md p-2 hover:bg-slate-200"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
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
          className="flex items-center gap-2 pointer rounded-md p-2 hover:bg-slate-200"
        >
          <LogIn size={18} />
          Login
        </Link>
      )}
      <Link
        href="/profile"
        className="flex items-center gap-2 pointer rounded-md p-2 hover:bg-slate-200"
      >
        <UserRoundPen size={18} />
        Profile
      </Link>
    </div>
  );
};
