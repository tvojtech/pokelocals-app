import { flag } from 'flags/next';

import { getPostHogClient } from './posthog-server';

export const organizationStatsFlag = flag<boolean, { userId: string }>({
  key: 'organization-stats',
  async decide({ entities }) {
    const isOrganizationStatsEnabled = await getPostHogClient().isFeatureEnabled(
      'organization-stats',
      entities?.userId ?? 'anonymous'
    );

    return isOrganizationStatsEnabled ?? false;
  },
});
