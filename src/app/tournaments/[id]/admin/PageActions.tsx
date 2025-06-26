'use client';

import { Handshake, List } from 'lucide-react';

import { CopyToClipboardButton } from '@/components/ui/copy-to-clipboard';
import { useTournamentMyPairingsUrl, useTournamentRosterUrl } from '@/hooks/useTournamentUrl';
import { tournaments } from '@/lib/db/schema';

import { DecklistsMenu } from './DecklistsMenu';
import { ShareRosterToDiscord } from './ShareRosterToDiscord';
import { TournamentQRCode } from './TournamentQRCode';

export function PageActions({ tournament }: { tournament: typeof tournaments.$inferSelect }) {
  const tournamentId = tournament.id;
  const tournamentName = tournament.name;
  const myPairingsUrl = useTournamentMyPairingsUrl(tournamentId);
  const rosterUrl = useTournamentRosterUrl(tournamentId);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <DecklistsMenu tournament={tournament} />
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
