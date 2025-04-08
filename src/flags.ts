import { flag } from 'flags/next';

import { getPostHogClient } from './posthog-server';

export const requireOrganizerFlag = flag<boolean, { userId: string }>({
  key: 'require-organizer',
  async decide({ entities }) {
    const requireOrganizer = await getPostHogClient().isFeatureEnabled(
      'require-organizer',
      entities?.userId ?? Math.random().toString()
    );

    return requireOrganizer ?? true;
  },
});
