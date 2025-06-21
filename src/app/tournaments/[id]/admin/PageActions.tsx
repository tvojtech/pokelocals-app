'use client';

import { FileStack, Handshake, List } from 'lucide-react';
import Link from 'next/link';

import { CopyToClipboardButton } from '@/components/ui/copy-to-clipboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTournamentMyPairingsUrl, useTournamentRosterUrl } from '@/hooks/useTournamentUrl';

import { ShareRosterToDiscord } from './ShareRosterToDiscord';
import { TournamentQRCode } from './TournamentQRCode';

export function PageActions({
  tournamentId,
  tournamentName,
}: {
  tournamentId: string;
  tournamentName?: string | null;
}) {
  const myPairingsUrl = useTournamentMyPairingsUrl(tournamentId);
  const rosterUrl = useTournamentRosterUrl(tournamentId);
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/tournaments/${tournamentId}/admin/decklists`}>
              <FileStack />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Decklists</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
        <ShareRosterToDiscord rosterUrl={rosterUrl ?? ''} tournamentName={tournamentName} />
        <CopyToClipboardButton textToCopy={rosterUrl ?? ''} tooltip="Copy roster URL" icon={<List />} />
        <CopyToClipboardButton textToCopy={myPairingsUrl ?? ''} tooltip="Copy pairings URL" icon={<Handshake />} />
        <TournamentQRCode tournamentUrl={myPairingsUrl ?? ''} />
      </div>
    </div>
  );
}
