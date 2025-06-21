'use client';

import { FileStack, Handshake, List } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { CopyToClipboardButton } from '@/components/ui/copy-to-clipboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toggleDecklistsAllowed } from '@/features/decklists/actions';
import { useTournamentMyPairingsUrl, useTournamentRosterUrl } from '@/hooks/useTournamentUrl';
import { tournaments } from '@/lib/db/schema';

import { ShareRosterToDiscord } from './ShareRosterToDiscord';
import { TournamentQRCode } from './TournamentQRCode';

export function PageActions({ tournament }: { tournament: typeof tournaments.$inferSelect }) {
  const tournamentId = tournament.id;
  const tournamentName = tournament.name;
  const myPairingsUrl = useTournamentMyPairingsUrl(tournamentId);
  const rosterUrl = useTournamentRosterUrl(tournamentId);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <LoadingButton
          variant="outline"
          isLoading={isPending}
          onClick={() => {
            startTransition(async () => {
              await toggleDecklistsAllowed(tournamentId, !tournament.decklistsAllowed);
              router.refresh();
            });
          }}>
          {tournament.decklistsAllowed ? 'Disable decklists' : 'Enable decklists'}
        </LoadingButton>
        {tournament.decklistsAllowed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/tournaments/${tournamentId}/admin/decklists`}>
                <FileStack />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Decklists</TooltipContent>
          </Tooltip>
        )}
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
