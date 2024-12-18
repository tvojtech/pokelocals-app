"use server";

import { getStore } from "@netlify/blobs";
import fs from "fs";

import { Tournament } from "@/app/actions/tournament/types";

export async function loadTournament(tournamentId: string) {
  if (process.env.NODE_ENV !== "development") {
    const store = getStore("tournaments");
    return JSON.parse(await store.get(tournamentId)) as Tournament;
  } else {
    return JSON.parse(
      fs.readFileSync(`/tmp/${tournamentId}.json`, "utf-8")
    ) as Tournament;
  }
}
