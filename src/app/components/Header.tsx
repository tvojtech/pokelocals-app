"use client";

import classNames from "classnames";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Avatar } from "@/app/components/Avatar";
import { PokemonIdForm } from "@/app/components/PokemonIdForm";
// import Drawer from "./Drawer";

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
    <header className="bg-slate-100 border-b-2 shadow-sm text-gray-800 print:hidden">
      <nav>
        <div className="container mx-auto p-4 flex justify-between items-center h-16">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.png" alt="logo" width={36} height={36} />
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
            className="hidden"
            onClick={() => toggleDrawer()}
            aria-label="Open menu"
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/profile">
            <Avatar />
          </Link>
        </div>
      </nav>
      <div
        className={classNames(
          "transition-height ease-in-out duration-1000 overflow-hidden",
          {
            "h-52": isDrawerOpen,
            "h-0": !isDrawerOpen,
          }
        )}
      >
        <div className="p-4">
          <PokemonIdForm />
        </div>
      </div>
      {/* <Drawer isOpen={isDrawerOpen} position="left">
        <PokemonIdForm />
      </Drawer> */}
    </header>
  );
}
