"use server";

import { getStore } from "@netlify/blobs";

import { Tournament } from "@/app/actions/tournament/types";

export async function loadTournament(tournamentId: string) {
  const store = getStore("tournaments");
  return JSON.parse(await store.get(tournamentId)) as Tournament;
}
