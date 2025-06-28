'use client';
import React, { useState } from 'react';

// import { updateUserDecklist } from '@/actions/decklists';
import { LoadingButton } from '@/components/ui/buttons/loading-button';

import { DecklistContent } from './DecklistContent';
import { DecklistPreview } from './DecklistPreview';
import { DecklistSelector } from './DecklistSelector';
import { parseDecklist } from './utils';

export function DecklistManager({
  decklistsPromise,
}: {
  decklistsPromise: Promise<
    { id: string; name: string; playerId: string; createdAt: Date; updatedAt: Date; decklist: string | null }[]
  >;
}) {
  const decklists = React.use(decklistsPromise);
  const [selectedDecklistId, setSelectedDecklistId] = useState<string | null>(decklists[0]?.id ?? null);

  const selectedDecklist = decklists.find(decklist => decklist.id === selectedDecklistId);

  const [selectedDecklistContent, setSelectedDecklistContent] = useState<string | undefined>(
    selectedDecklist?.decklist ?? undefined
  );

  const [isSavingDecklist, setIsSavingDecklist] = useState(false);
  const handleSaveDecklist = async () => {
    setIsSavingDecklist(true);
    // await updateUserDecklist({ id: selectedDecklistId!, decklist: selectedDecklistContent ?? '' });
    setIsSavingDecklist(false);
  };

  const parsedDecklist = selectedDecklistContent ? parseDecklist(selectedDecklistContent) : null;

  return (
    <div className="h-full grid-cols-1 gap-2 space-y-2 md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] md:space-y-0">
      <DecklistSelector
        decklists={decklists}
        value={selectedDecklistId}
        onValueChange={id => {
          setSelectedDecklistId(id);
          setSelectedDecklistContent(decklists.find(decklist => decklist.id === id)?.decklist ?? undefined);
        }}
      />
      <div className="flex justify-end gap-2">
        <LoadingButton onClick={handleSaveDecklist} isLoading={isSavingDecklist} disabled={!selectedDecklistId}>
          Save decklist
        </LoadingButton>
      </div>
      <DecklistContent
        decklist={selectedDecklistContent}
        onDecklistChange={setSelectedDecklistContent}
        disabled={false}
      />
      {parsedDecklist && 'error' in parsedDecklist
        ? null
        : parsedDecklist && <DecklistPreview decklist={parsedDecklist} />}
    </div>
  );
}
