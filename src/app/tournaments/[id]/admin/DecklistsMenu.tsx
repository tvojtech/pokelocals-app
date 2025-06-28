'use client';

import { ListChecks } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toggleDecklistsAllowed } from '@/features/decklists/actions';
import { tournaments } from '@/lib/db/schema';

export function DecklistsMenu({ tournament }: { tournament: typeof tournaments.$inferSelect }) {
  const tournamentId = tournament.id;

  const [, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <ListChecks />
          </TooltipTrigger>
          <TooltipContent>Decklists</TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => {
            startTransition(async () => {
              await toggleDecklistsAllowed(tournamentId, !tournament.decklistsAllowed);
              toast.success(tournament.decklistsAllowed ? 'Decklist submission closed' : 'Decklist submission opened');
            });
          }}>
          {tournament.decklistsAllowed ? 'Close decklist submission' : 'Open decklist submission'}
        </DropdownMenuItem>
        {tournament.decklistsAllowed && (
          <DropdownMenuItem>
            <Link href={`/tournaments/${tournamentId}/admin/decklists`}>Show submitted decklists</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
