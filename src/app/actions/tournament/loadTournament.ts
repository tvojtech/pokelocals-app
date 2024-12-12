"use server";

import { Tournament } from "@/app/actions/tournament/types";
import { getStore } from "@netlify/blobs";

export async function loadTournament(tournamentId: string) {
  const store = getStore("tournaments");
  return JSON.parse(await store.get(tournamentId)) as Tournament;
}
