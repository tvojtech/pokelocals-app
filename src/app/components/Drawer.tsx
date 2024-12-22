"use client";

import classNames from "classnames";
import { X } from "lucide-react";
import React from "react";

import { Logo } from "@/app/components/Logo";

export const Drawer: React.FC<
  React.PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
    className?: string;
  }>
> = ({ isOpen, onClose, className, children }) => {
  return (
    <div className={classNames("relative", className)}>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={classNames(
          "fixed top-0 left-0 h-full w-80 bg-slate-50 z-50 transform transition-transform duration-300 ease-in-out",
          { "translate-x-0": isOpen, "-translate-x-full": !isOpen }
        )}
      >
        <div className="p-4">
          <div className="flex justify-between border-b border-slate-300 px-4 pb-4">
            <Logo />
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
