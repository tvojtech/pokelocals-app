'use client';

import { useToggle } from '@uidotdev/usehooks';
import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import { useWindowLocation } from '@/app/hooks';

import { Card } from './ui/card';
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
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background bg-opacity-95 p-4"
          onClick={() => toggle()}>
          <QRCodeSVG value={location.href} className="m-10 h-60 w-60" />
          <Card className="p-4">
            <p>Scan the QR code to open this page on your phone.</p>
          </Card>
        </div>
      </div>
    </>
  );
}
