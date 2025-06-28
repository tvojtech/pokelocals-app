import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { findTournamentPlayerDecklist } from '@/actions/decklists';
import { DecklistPreview } from '@/features/decklists/DecklistPreview';
import { getCardKey, parseCardLine, parseDecklist } from '@/features/decklists/utils';
import { cn } from '@/lib/utils';

export function DecklistContent({ tournamentId, playerId }: { tournamentId: string; playerId?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['decklist', tournamentId, playerId],
    queryFn: () => {
      return findTournamentPlayerDecklist(tournamentId, playerId!);
    },
    enabled: !!playerId,
  });

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data && 'error' in data) {
    return <div>{data.error}</div>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-[25rem_1fr]">
      <div>
        {data?.decklist.split('\n').map((line, idx) => {
          const isHeaderLine = line.startsWith('Pokémon:') || line.startsWith('Trainer:') || line.startsWith('Energy:');
          const card = parseCardLine(line);
          const key = card ? getCardKey(card) : idx;
          return (
            <div
              key={key}
              className={cn(
                !isHeaderLine && 'cursor-pointer',
                checked[key] && 'line-through',
                isHeaderLine && 'mt-2 font-semibold'
              )}
              onClick={() => {
                if (isHeaderLine) return;
                setChecked(prev => ({ ...prev, [key]: !prev[key] }));
              }}>
              {line}
            </div>
          );
        })}
      </div>
      {data && (
        <DecklistPreviewWithParse
          decklist={data.decklist}
          checked={checked}
          onCardClick={key => setChecked(prev => ({ ...prev, [key]: !prev[key] }))}
        />
      )}
    </div>
  );
}

function DecklistPreviewWithParse({
  decklist,
  checked,
  onCardClick,
}: {
  decklist: string;
  checked: Record<string, boolean>;
  onCardClick: (key: string) => void;
}) {
  const parsedDecklist = parseDecklist(decklist);

  if ('error' in parsedDecklist) {
    return null;
  }

  return <DecklistPreview decklist={parsedDecklist} deckcheckStatus={checked} onCardClick={onCardClick} />;
}
