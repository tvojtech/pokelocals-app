import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { getCardKey, ParsedDecklist } from './utils';

export function DecklistPreview({
  decklist,
  deckcheckStatus,
  onCardClick,
}: {
  decklist: ParsedDecklist;
  deckcheckStatus?: Record<string, boolean>;
  onCardClick?: (key: string) => void;
}) {
  return (
    <div className="@container">
      <div className="grid h-full grid-cols-3 gap-2 @md:grid-cols-4 @xl:grid-cols-5">
        {[...decklist.pokemon, ...decklist.trainer, ...decklist.energy].map(
          ({ name, count, set = '', setNumber = '' }) => {
            const key = getCardKey({ name, count, set, setNumber });
            return (
              <div key={key} className="relative" onClick={() => onCardClick?.(key)}>
                <div
                  className={cn(
                    'flex items-center justify-center',
                    deckcheckStatus?.[key] && 'opacity-40',
                    onCardClick && 'cursor-pointer'
                  )}>
                  <div className="relative h-full">
                    <img
                      src={`https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/${set}/${set}_${setNumber.padStart(3, '0')}_R_EN_XS.png`}
                      alt={name}
                    />
                    <div className="absolute bottom-0 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-4 transform items-center justify-center rounded-xl border border-white bg-red-600 text-white">
                      {count}
                    </div>
                  </div>
                </div>
                {deckcheckStatus?.[key] && (
                  <div className="absolute bottom-0 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-4 transform items-center justify-center rounded-xl border border-white bg-green-600 text-white">
                    <CheckIcon />
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
