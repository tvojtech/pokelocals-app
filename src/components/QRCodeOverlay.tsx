'use client';

import { useToggle } from '@uidotdev/usehooks';
import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import { useWindowLocation } from '@/app/hooks';

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function QRCodeOverlay() {
  const [isOpen, toggle] = useToggle(false);
  const location = useWindowLocation();

  if (!location?.href) {
    return <QrCode />;
  }

  const buttonContent = (
    <Tooltip>
      <TooltipTrigger onClick={() => toggle()} aria-label="Show QR Code">
        <QrCode />
      </TooltipTrigger>
      <TooltipContent>Show QR Code</TooltipContent>
    </Tooltip>
  );

  if (!isOpen) {
    return buttonContent;
  }

  return (
    <>
      <div className="relative">
        {buttonContent}
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-50 bg-opacity-95 p-4"
          onClick={() => toggle()}>
          <QRCodeSVG value={location.href} className="m-10 h-60 w-60" />
          <p className="rounded-lg border border-slate-500 bg-slate-50 bg-opacity-100 p-4">
            Scan the QR code to open this page on your phone.
          </p>
        </div>
      </div>
    </>
  );
}
