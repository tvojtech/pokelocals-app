'use client';

import { EllipsisVertical, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TournamentMenu() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical aria-label="Open menu" className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>
          <FileSpreadsheet />
          <Link href={`/tournaments/${id}/decklist`}>Decklist</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
