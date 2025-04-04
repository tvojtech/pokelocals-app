'use client';

import { useRouter } from 'nextjs-toploader/app';
import { useActionState, useTransition } from 'react';

import { createTournamentAction } from '@/app/actions/tournament';
import { Button } from '@/components/ui/button';

export function CreateTournamentButton() {
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
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'New Tournament'}
      </Button>
    </form>
  );
}
