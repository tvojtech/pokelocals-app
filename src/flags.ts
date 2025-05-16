import { flag } from 'flags/next';

import { getPostHogClient } from './posthog-server';

export const organizationManagementFlag = flag<boolean, { userId: string }>({
  key: 'organization-management',
  async decide({ entities }) {
    const requireOrganizer = await getPostHogClient().isFeatureEnabled(
      'organization-management',
      entities?.userId ?? 'anonymous'
    );

    return requireOrganizer ?? true;
  },
});

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
