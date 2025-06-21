'use client';

import { EllipsisVertical, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { tournaments } from '@/lib/db/schema';

export function TournamentMenu({ tournament }: { tournament: typeof tournaments.$inferSelect | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical aria-label="Open menu" className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {tournament && (
          <DropdownMenuItem disabled={!tournament.decklistsAllowed}>
            <FileSpreadsheet />
            <Link href={`/tournaments/${tournament.id}/decklist`}>Decklist</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
