"use client";

import { createTournament } from "@/app/actions/tournament";
import { redirect } from "next/navigation";
import { useCallback } from "react";

export default function Tournaments() {
  const handleClick = useCallback(async () => {
    const { id } = await createTournament();
    redirect(`/tournaments/${id}`);
  }, []);
  return <button onClick={handleClick}>Create New Tournament</button>;
}
