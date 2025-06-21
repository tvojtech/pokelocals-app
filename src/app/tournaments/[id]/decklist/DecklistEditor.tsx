'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { saveTournamentPlayerDecklist } from '@/actions/decklists';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { DecklistContent } from '@/features/decklists/DecklistContent';
import { DecklistPreview } from '@/features/decklists/DecklistPreview';
import { parseDecklist, validateDecklist } from '@/features/decklists/utils';

export function DecklistEditor({
  decklist,
  tournamentId,
  playerId,
  playerPokemonId,
}: {
  tournamentId: string;
  playerId: string;
  playerPokemonId: string;
  decklist?: {
    id: string;
    playerId: string;
    playerPokemonId: string;
    tournamentId: string;
    decklist: string;
    createdAt: Date;
    updatedAt: Date;
  };
}) {
  const router = useRouter();
  const [isSavingDecklist, setIsSavingDecklist] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDecklistContent, setSelectedDecklistContent] = useState<string | undefined>(
    decklist?.decklist ?? undefined
  );
  const handleSaveDecklist = async () => {
    setIsSavingDecklist(true);
    await saveTournamentPlayerDecklist(tournamentId, playerId, playerPokemonId, selectedDecklistContent!, decklist?.id);
    router.refresh();
    setIsSavingDecklist(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const parseResult = parseDecklist(selectedDecklistContent);
  const parsedDecklist = 'error' in parseResult ? undefined : parseResult;

  const validationErrors = 'error' in parseResult ? ['Unable to parse decklist.'] : validateDecklist(parsedDecklist);

  return (
    <div className="h-full grid-cols-1 gap-2 space-y-2 md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] md:space-y-0">
      <div className="space-y-2 md:col-span-2">
        <div className="flex justify-end gap-2">
          <LoadingButton onClick={handleSaveDecklist} isLoading={isSavingDecklist} disabled={!selectedDecklistContent}>
            Submit decklist
          </LoadingButton>
        </div>
        {isSuccess && (
          <Alert variant="success">
            <AlertDescription>Decklist submitted.</AlertDescription>
          </Alert>
        )}
        {validationErrors && validationErrors.length > 0 && (
          <Alert variant="warning">
            <AlertTitle>Decklist is invalid</AlertTitle>
            <AlertDescription>
              {validationErrors?.map((validationError, index) => <p key={index}> {validationError}</p>)}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <DecklistContent decklist={selectedDecklistContent} onDecklistChange={setSelectedDecklistContent} />
      {parsedDecklist && <DecklistPreview decklist={parsedDecklist} />}
    </div>
  );
}
