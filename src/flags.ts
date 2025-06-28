import { flag } from 'flags/next';

import { env } from './env/env';
import { getPostHogClient } from './posthog-server';

export function createFlagDistinct(userId?: string | null) {
  return `deployment_${env.NEXT_PUBLIC_DEPLOYMENT}:${userId ?? 'user_anonymous'}`;
}

export const organizationStatsFlag = flag<boolean, { userId: string | null }>({
  key: 'organization-stats',
  async decide({ entities }) {
    const isOrganizationStatsEnabled = await getPostHogClient().isFeatureEnabled(
      'organization-stats',
      createFlagDistinct(entities?.userId)
    );

    return isOrganizationStatsEnabled ?? false;
  },
});

export const decklistsFlag = flag<boolean, { userId: string | null }>({
  key: 'decklists',
  async decide({ entities }) {
    const isDecklistsEnabled = await getPostHogClient().isFeatureEnabled(
      'decklists',
      createFlagDistinct(entities?.userId)
    );

    return isDecklistsEnabled ?? false;
  },
});
