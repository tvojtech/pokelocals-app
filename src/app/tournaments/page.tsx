"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { createTournament } from "@/app/actions/tournament";

export default function Tournaments() {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    const { id } = await createTournament();
    router.push(`/tournaments/${id}`);
  }, [router]);
  return <button onClick={handleClick}>Create New Tournament</button>;
}
