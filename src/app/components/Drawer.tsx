"use client";

import { X } from "lucide-react";
import React from "react";

import { Logo } from "@/app/components/Logo";
import { cn } from "@/app/ui/utils";

export const Drawer: React.FC<
  React.PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
    className?: string;
  }>
> = ({ isOpen, onClose, className, children }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-slate-50 z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <div className="flex justify-between border-b border-slate-300 pb-4">
            <Logo />
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
