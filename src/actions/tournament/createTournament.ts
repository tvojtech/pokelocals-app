'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';
import { v7 as uuid } from 'uuid';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function createTournamentAction() {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error('Unauthorized');
  }

  const id = uuid();

  await db
    .insert(tournaments)
    .values({
      id,
      createdBy: userId,
      updatedBy: userId,
      organizationId: orgId,
    })
    .execute();

  revalidateTag('tournaments');
  revalidateTag(`tournaments:${id}`);

  return { id };
}
