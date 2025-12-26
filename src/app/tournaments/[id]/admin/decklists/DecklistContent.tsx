import { useQuery } from '@tanstack/react-query';
import { CheckIcon, CircleMinusIcon, CirclePlusIcon } from 'lucide-react';
import { useState } from 'react';

import { findTournamentPlayerDecklist } from '@/actions/decklists';
import { Button } from '@/components/ui/button';
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

  const [checked, setChecked] = useState<Record<string, number>>({});

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
          const card = parseCardLine(line);
          const key = card ? getCardKey(card) : idx;

          return (
            <div key={key} className="flex items-center gap-2">
              {card && (
                <div className="flex gap-2">
                  <Button
                    variant="link"
                    className="p-0"
                    disabled={checked[key] <= 0}
                    onClick={() => setChecked(old => ({ ...old, [key]: (old[key] ?? 0) - 1 }))}>
                    <CircleMinusIcon />
                  </Button>
                  <Button
                    variant="link"
                    className="p-0"
                    disabled={checked[key] >= card.count}
                    onClick={() => setChecked(old => ({ ...old, [key]: (old[key] ?? 0) + 1 }))}>
                    <CirclePlusIcon />
                  </Button>
                </div>
              )}
              <div
                className={cn(
                  card && 'cursor-pointer',
                  card && checked[key] === card?.count && 'line-through',
                  !card && 'mt-2 font-semibold'
                )}
                onClick={() => {
                  if (!card) return;
                  setChecked(prev => ({ ...prev, [key]: prev[key] === card.count ? 0 : card.count }));
                }}>
                {line}
              </div>
              {card && (
                <div className="flex flex-row gap-0.5">
                  {Array.from({ length: card.count }, (_, idx) => (
                    <div
                      key={idx}
                      className={cn('rounded', 'text-white', idx + 1 <= checked[key] ? 'bg-green-600' : 'bg-gray-200')}>
                      <CheckIcon className="size-4" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {data && (
        <DecklistPreviewWithParse
          decklist={data.decklist}
          checked={checked}
          // onCardClick={key => setChecked(prev => ({ ...prev, [key]: !prev[key] }))}
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
  checked: Record<string, number>;
  onCardClick?: (key: string) => void;
}) {
  const parsedDecklist = parseDecklist(decklist);

  if (!parsedDecklist.ok) {
    return null;
  }

  return <DecklistPreview decklist={parsedDecklist.value} deckcheckStatus={checked} onCardClick={onCardClick} />;
}
