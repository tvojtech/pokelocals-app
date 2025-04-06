'use client';

import { useToggle } from '@uidotdev/usehooks';
import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function TournamentQRCode({ tournamentUrl }: { tournamentUrl: string }) {
  const [isOpen, toggle] = useToggle(false);

  if (!tournamentUrl) {
    return <QrCode />;
  }

  const buttonContent = (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger onClick={() => toggle()} aria-label="Show QR Code">
          <QrCode />
        </TooltipTrigger>
        <TooltipContent>Show QR Code</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  if (!isOpen) {
    return buttonContent;
  }

  return (
    <>
      <div className="relative">
        {buttonContent}
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-50 bg-opacity-95"
          onClick={() => toggle()}>
          <QRCodeSVG value={tournamentUrl} className="m-10 h-60 w-60" />
        </div>
      </div>
    </>
  );
}
