'use server';

import { and, desc, eq, gt } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

import { getAllTournamentsCacheKey, getOrganizationTournamentsCacheKey } from '@/cache-keys';
import { db } from '@/lib/db';
import { tournaments } from '@/lib/db/schema';

export async function listTournaments({ organizationId }: { organizationId?: string }) {
  return unstable_cache(
    async ({ organizationId }: { organizationId?: string }) => {
      return db
        .select({
          id: tournaments.id,
          name: tournaments.name,
          uploaded: tournaments.uploaded,
          expiresAt: tournaments.expiresAt,
          organizationId: tournaments.organizationId,
        })
        .from(tournaments)
        .where(
          and(
            ...[
              gt(tournaments.expiresAt, new Date().toISOString()),
              organizationId ? eq(tournaments.organizationId, organizationId) : undefined,
            ].filter(Boolean)
          )
        )
        .orderBy(desc(tournaments.createdAt))
        .execute();
    },
    [getAllTournamentsCacheKey(), getOrganizationTournamentsCacheKey(organizationId ?? 'all')],
    { tags: [getAllTournamentsCacheKey(), getOrganizationTournamentsCacheKey(organizationId ?? 'all')] }
  )({ organizationId });
}
