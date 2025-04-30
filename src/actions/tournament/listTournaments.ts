'use server';

import { auth } from '@clerk/nextjs/server';
import { and, desc, eq, gt } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function listTournaments() {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return [];
  }

  const cachedTournaments = await unstable_cache(
    async (organizationId: string) => {
      return db
        .select({
          id: tournaments.id,
          name: tournaments.name,
          expiresAt: tournaments.expiresAt,
        })
        .from(tournaments)
        .where(and(eq(tournaments.organizationId, organizationId), gt(tournaments.expiresAt, new Date())))
        .orderBy(desc(tournaments.updatedAt))
        .execute();
    },
    ['tournaments'],
    { tags: ['tournaments'], revalidate: 60 * 60 * 6 }
  )(orgId);

  return cachedTournaments.filter(ct => {
    return ct.expiresAt > new Date();
  });
}
