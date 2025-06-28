'use client';

import { useState } from 'react';

import { DecklistContent } from './DecklistContent';
import { DecklistSelector } from './DecklistSelector';

export function TournamentDecklists({ tournamentId }: { tournamentId: string }) {
  const [selectedDecklist, setSelectedDecklist] = useState<{ id: string; playerId: string; clerkId: string } | null>(
    null
  );
  return (
    <>
      <div className="w-full">
        <div className="max-w-72">
          <DecklistSelector
            tournamentId={tournamentId}
            value={selectedDecklist}
            onDecklistSelect={decklist => {
              setSelectedDecklist(decklist);
            }}
          />
        </div>
      </div>
      <DecklistContent key={selectedDecklist?.id} tournamentId={tournamentId} playerId={selectedDecklist?.clerkId} />
    </>
  );
}
