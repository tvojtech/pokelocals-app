"use client";

import { useRouter } from "next/navigation";
import { useActionState, useTransition } from "react";

import { createTournamentAction } from "@/app/actions/tournament";

export default function Tournaments() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [, formAction] = useActionState(() => {
    startTransition(async () => {
      const result = await createTournamentAction();
      router.push(`/tournaments/${result.id}`);
    });
  }, undefined);

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "New Tournament"}
      </button>
    </form>
  );
}
