'use client';

import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { listTournamentDecklistsMetadata } from '@/actions/decklists';
import { Button } from '@/components/ui/buttons/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function DecklistSelector({
  tournamentId,
  value,
  onDecklistSelect,
}: {
  tournamentId: string;
  value: { id: string; playerId: string; clerkId: string } | null;
  onDecklistSelect: (decklist: { id: string; playerId: string; clerkId: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ['decklists', tournamentId],
    queryFn: async () => {
      const data = await listTournamentDecklistsMetadata(tournamentId);
      if ('error' in data) {
        return Promise.reject(data.error);
      }
      return data;
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between">
          {error ? (
            <div>{error.message}</div>
          ) : isLoading ? (
            <div>Loading...</div>
          ) : value ? (
            formatDecklist(data?.find(decklist => decklist === value))
          ) : (
            'Select decklist...'
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search decklists..." />
          <CommandList>
            <CommandEmpty>No decklists found.</CommandEmpty>
            <CommandGroup>
              {data?.map(decklist => (
                <CommandItem
                  key={decklist.id}
                  onSelect={() => {
                    onDecklistSelect(decklist);
                    setOpen(false);
                  }}>
                  {formatDecklist(decklist)}
                  <Check className={cn('ml-auto', value === decklist ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function formatDecklist(decklist?: {
  playerFirstName: string | null;
  playerLastName: string | null;
  playerPokemonId: string;
}) {
  if (!decklist) {
    return null;
  }
  return `${decklist.playerFirstName} ${decklist.playerLastName} [${decklist.playerPokemonId}]`;
}
