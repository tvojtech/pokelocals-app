'use client';

import { useToggle } from '@uidotdev/usehooks';
import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import { Card } from '@/components/ui/card';
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
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-50 bg-opacity-95 p-4 dark:bg-secondary dark:bg-opacity-95"
          onClick={() => toggle()}>
          <QRCodeSVG value={tournamentUrl} className="m-10 h-60 w-60" />
          <Card className="p-4">
            <p>Scan the QR code to open pairings on your phone.</p>
          </Card>
        </div>
      </div>
    </>
  );
}
