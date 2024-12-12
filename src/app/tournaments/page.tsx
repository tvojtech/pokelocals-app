"use client";

import { redirect } from "next/navigation";
import { useCallback } from "react";

import { createTournament } from "@/app/actions/tournament";

export default function Tournaments() {
  const handleClick = useCallback(async () => {
    const { id } = await createTournament();
    redirect(`/tournaments/${id}`);
  }, []);
  return <button onClick={handleClick}>Create New Tournament</button>;
}
