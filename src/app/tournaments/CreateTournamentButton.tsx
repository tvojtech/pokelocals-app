'use client';

import { useRouter } from 'nextjs-toploader/app';
import { useActionState, useTransition } from 'react';

import { createTournamentAction } from '@/actions/tournament';
import { LoadingButton } from '@/components/ui/buttons/loading-button';

export function CreateTournamentButton({ disabled = false }: { disabled?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [, formAction] = useActionState(() => {
    startTransition(async () => {
      const result = await createTournamentAction();
      router.push(`/tournaments/${result.id}/admin`);
    });
  }, undefined);

  return (
    <form action={formAction}>
      <LoadingButton isLoading={isPending} type="submit" disabled={disabled}>
        New Tournament
      </LoadingButton>
    </form>
  );
}
