'use client';

import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

import { useWindowLocation } from '@/app/hooks';
import { buttonVariants } from '@/components/ui/button';
import { CopyToClipboardButton } from '@/components/ui/copy-to-clipboard';
import { cn } from '@/lib/utils';

export const QRCode: React.FC<{ tournamentId: string }> = ({
  tournamentId,
}) => {
  const location = useWindowLocation();

  if (!location?.origin) {
    return null;
  }

  const pairingsUrl = `${origin}/tournaments/${tournamentId}/pairings`;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="print:block hidden">{pairingsUrl}</p>
      <div className="flex items-center justify-between size-full">
        <Link
          href={pairingsUrl}
          target="_blank"
          className={cn(
            buttonVariants({ variant: 'link' }),
            'print:hidden font-bold text-xl'
          )}>
          Show pairings <SquareArrowOutUpRight size={20} />
        </Link>
        <CopyToClipboardButton textToCopy={pairingsUrl} />
      </div>
      <QRCodeSVG value={pairingsUrl} className="size-60 h-60 m-10" />
    </div>
  );
};
