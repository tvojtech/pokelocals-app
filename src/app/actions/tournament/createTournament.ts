'use server';

import { v4 as uuid } from 'uuid';

export async function createTournamentAction() {
  const id = uuid();

  return { id };
}
