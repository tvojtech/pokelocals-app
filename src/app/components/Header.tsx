"use client";

import { LogIn, LogOut, Menu, User2, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Drawer } from "@/app/components/Drawer";
import { Logo } from "@/app/components/Logo";
import { Sidebar } from "@/app/components/Sidebar";
import { Button, buttonVariants } from "@/components/ui/button";
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

export const useDrawer = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isDrawerOpen = searchParams.has("menu");

  const toggleDrawer = (isOpen?: boolean) => {
    if (isOpen === undefined) {
      isOpen = !isDrawerOpen;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (isOpen) {
      params.set("menu", "1");
    } else {
      params.delete("menu");
    }
    const url = pathname + "?" + params.toString();
    router.replace(url);
  };

  return { isDrawerOpen, toggleDrawer };
};

export default function Header() {
  const { isDrawerOpen, toggleDrawer } = useDrawer();
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

          <Button
            onClick={() => toggleDrawer()}
            aria-label="Open menu"
            className="lg:hidden"
            variant="link"
            size="icon"
          >
            <Menu />
          </Button>
        </div>
      </nav>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        className="lg:hidden"
      >
        <Sidebar />
      </Drawer>
    </header>
  );
}
