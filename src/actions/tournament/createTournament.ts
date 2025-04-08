'use server';

import { auth } from '@clerk/nextjs/server';
import { v4 as uuid } from 'uuid';

import { getStore } from '@/blobs';

import tournamentTemplate from './tournamentTemplate.json';
import { Tournament, TournamentWithMetadata } from './types';

export async function createTournamentAction() {
  const { userId, orgId } = await auth();
  const id = uuid();

  const store = await getStore('tournaments');
  const metadata: TournamentWithMetadata['metadata'] = {
    uploaded_at: new Date().toISOString(),
    uploaded_by: orgId ?? userId ?? 'anonymous',
  };
  await store.setJSON(id, tournamentTemplate as Tournament, { metadata });

  return { id };
}
