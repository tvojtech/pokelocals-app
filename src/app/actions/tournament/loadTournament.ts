"use server";

import { getStore } from "@netlify/blobs";
import fs from "fs";

import { Tournament } from "@/app/actions/tournament/types";

export async function loadTournament(tournamentId: string) {
  if (process.env.NODE_ENV !== "development") {
    const store = getStore("tournaments");
    const tournamentFile = await store.get(tournamentId);
    if (!tournamentFile) {
      return undefined;
    }
    return JSON.parse(tournamentFile) as Tournament;
  } else {
    if (!fs.existsSync(`/tmp/${tournamentId}.json`)) {
      return undefined;
    }
    return JSON.parse(
      fs.readFileSync(`/tmp/${tournamentId}.json`, "utf-8")
    ) as Tournament;
  }
}
