'use server';

import { auth } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function listTournaments() {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return [];
  }

  return unstable_cache(
    async () => {
      return db
        .select({
          id: tournaments.id,
          name: tournaments.name,
        })
        .from(tournaments)
        .where(eq(tournaments.organizationId, orgId))
        .orderBy(desc(tournaments.updatedAt))
        .execute();
    },
    ['tournaments'],
    { tags: ['tournaments'] }
  )();
}
