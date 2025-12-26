import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { getCardKey, ParsedDecklist } from './utils';

export function DecklistPreview({
  decklist,
  deckcheckStatus,
  onCardClick,
}: {
  decklist: ParsedDecklist;
  deckcheckStatus?: Record<string, number>;
  onCardClick?: (key: string) => void;
}) {
  const isDeckcheckView = !!deckcheckStatus;

  return (
    <div className="@container">
      <div className="grid h-full grid-cols-3 gap-2 @md:grid-cols-4 @xl:grid-cols-5">
        {decklist.cards.map(({ name, count, set, setNumber }) => {
          const key = getCardKey({ name, count, set, setNumber });
          const isComplete = deckcheckStatus?.[key] === count;
          return (
            <div key={key} className="relative" onClick={() => onCardClick?.(key)}>
              <div className={cn('flex items-center justify-center', onCardClick && 'cursor-pointer')}>
                <div className="relative h-full">
                  <img
                    src={`https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/${set}/${set}_${setNumber}_R_EN_XS.png`}
                    alt={name}
                    className={cn(isComplete && 'opacity-40')}
                  />

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-4 space-y-1">
                    <div
                      className={cn(
                        'mx-auto flex h-8 w-8 items-center justify-center rounded-xl border border-white bg-red-600 text-white',
                        isComplete && 'bg-red-600/80'
                      )}>
                      {count}
                    </div>
                    {isDeckcheckView && (
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: count }, (_, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              'rounded',
                              'text-white',
                              idx + 1 <= deckcheckStatus?.[key] ? 'bg-green-600' : 'bg-gray-200'
                            )}>
                            <CheckIcon className="size-5" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
