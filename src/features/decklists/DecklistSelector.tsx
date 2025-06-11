'use client';

import { Check, ChevronsUpDown, Edit2, PlusCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/buttons/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function DecklistSelector({
  decklists,
  value,
  onValueChange,
}: {
  decklists: {
    id: string;
    name: string;
    playerId: string;
    createdAt: Date;
    updatedAt: Date;
    decklist: string | null;
  }[];
  value: string | null;
  onValueChange: (value: string | null) => void;
}) {
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-full justify-between">
            {value ? decklists.find(decklist => decklist.id === value)?.name : 'Select decklist...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search decklists..." />
            <CommandList>
              <CommandEmpty>No decklists found.</CommandEmpty>
              <CommandGroup>
                {decklists.map(decklist => (
                  <CommandItem key={decklist.id} onSelect={() => onValueChange(decklist.id)}>
                    {decklist.name}
                    <Check className={cn('ml-auto', value === decklist.id ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button variant="outline" size="icon" onClick={() => {}}>
        <PlusCircle className="h-4 w-4" />
        <span className="sr-only">Add decklist</span>
      </Button>
      <Button variant="outline" size="icon" onClick={() => {}}>
        <Edit2 className="h-4 w-4" />
        <span className="sr-only">Edit decklist</span>
      </Button>
      <Button variant="outline" size="icon" onClick={() => {}} disabled={!value}>
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete decklist</span>
      </Button>
    </div>
  );
}
