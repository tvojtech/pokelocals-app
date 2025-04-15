import { flag } from 'flags/next';

import { getPostHogClient } from './posthog-server';

export const requireOrganizerFlag = flag<boolean, { userId: string }>({
  key: 'require-organizer',
  async decide({ entities }) {
    const requireOrganizer = await getPostHogClient().isFeatureEnabled(
      'require-organizer',
      entities?.userId ?? 'anonymous'
    );

    return requireOrganizer ?? true;
  },
});

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
