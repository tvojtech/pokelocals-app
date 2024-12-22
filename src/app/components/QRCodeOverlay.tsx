"use client";

import { useToggle } from "@uidotdev/usehooks";
import { SquareArrowOutUpRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

import { useWindowLocation } from "@/app/hooks";

export const QRCodeOverlay: React.FC = () => {
  const [isOpen, toggle] = useToggle(false);
  const location = useWindowLocation();

  if (!location?.href) {
    return null;
  }

  const buttonContent = (
    <button
      onClick={() => toggle()}
      className="flex items-center gap-1 text-primary font-bold text-xl"
    >
      QR Code
      <SquareArrowOutUpRight size={20} />
    </button>
  );

  if (!isOpen) {
    return buttonContent;
  }

  return (
    <>
      <div className="relative">
        {buttonContent}
        <div
          className="fixed inset-0 bg-slate-50 bg-opacity-90 z-40 flex justify-center items-center"
          onClick={() => toggle()}
        >
          <QRCodeSVG value={location.href} className="w-60 h-60 m-10" />
        </div>
      </div>
    </>
  );
};
