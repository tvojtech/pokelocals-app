"use server";

import { v4 as uuid } from "uuid";

export async function createTournament() {
  const id = uuid();

  return { id };
}
