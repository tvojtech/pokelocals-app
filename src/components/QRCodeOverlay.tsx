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
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-50 bg-opacity-90"
          onClick={() => toggle()}>
          <QRCodeSVG value={location.href} className="m-10 h-60 w-60" />
        </div>
      </div>
    </>
  );
}
