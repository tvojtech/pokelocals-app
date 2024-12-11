"use server";

import { STORAGE_BASE_PATH } from "@/app/actions/tournament/common";
import { Tournament } from "@/app/actions/tournament/types";
import fs from "fs";
import { readdir } from "fs/promises";
import path from "path";

export async function loadTournament(tournamentId: string) {
  const storagePath = path.join(STORAGE_BASE_PATH, tournamentId);
  const files = await readdir(storagePath);
  const lastFileName = files.find((file) =>
    file.startsWith(files.length + "-")
  );

  const json = JSON.parse(
    fs.readFileSync(path.join(storagePath, lastFileName!), "utf-8")
  );

  return json as Tournament;
}
