"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Drawer } from "@/app/components/Drawer";
import { Logo } from "@/app/components/Logo";
import { Sidebar } from "@/app/components/Sidebar";

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

  return (
    <header className="bg-slate-50 border-b-2 shadow-sm text-gray-800 print:hidden">
      <nav>
        <div className="px-4 md:px-10 py-4 flex justify-between items-center h-16">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <ul className="hidden space-x-4">
            {/* <li>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li> */}
          </ul>
          <button
            onClick={() => toggleDrawer()}
            aria-label="Open menu"
            className="lg:hidden"
          >
            <Menu size={24} />
          </button>
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
