'use client';

import { Handshake, List } from 'lucide-react';

import { CopyToClipboardButton } from '@/components/ui/copy-to-clipboard';
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
      <div />
      <div className="flex items-center gap-2">
        <ShareRosterToDiscord rosterUrl={rosterUrl ?? ''} tournamentName={tournamentName} />
        <CopyToClipboardButton textToCopy={rosterUrl ?? ''} tooltip="Copy roster URL" icon={<List />} />
        <CopyToClipboardButton textToCopy={myPairingsUrl ?? ''} tooltip="Copy pairings URL" icon={<Handshake />} />
        <TournamentQRCode tournamentUrl={myPairingsUrl ?? ''} />
      </div>
    </div>
  );
}
