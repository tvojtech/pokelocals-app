"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Drawer } from "@/app/components/Drawer";
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
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/logo.png" alt="logo" width={36} height={36} />
        </Link>
        <ul className="hidden md:flex space-x-4">
          {/* <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
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
        <button onClick={() => toggleDrawer()} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </nav>
      <Drawer isOpen={isDrawerOpen} onClose={() => toggleDrawer(false)}>
        <PokemonIdForm />
      </Drawer>
    </header>
  );
}
