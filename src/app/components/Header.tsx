"use client";

import { useToggle } from "@uidotdev/usehooks";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Drawer } from "@/app/components/Drawer";
// import Drawer from "./Drawer";

export default function Header() {
  const [isDrawerOpen, toggleDrawer] = useToggle(false);

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
      <Drawer isOpen={isDrawerOpen} onClose={() => toggleDrawer(false)} />
    </header>
  );
}
