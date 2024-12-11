"use server";

import { STORAGE_BASE_PATH } from "./common";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export async function createTournament() {
  const id = uuid();
  const storagePath = path.join(STORAGE_BASE_PATH, id);
  fs.mkdirSync(storagePath, { recursive: true });

  return { id };
}
