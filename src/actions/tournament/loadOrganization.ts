import { clerkClient } from '@clerk/clerk-sdk-node';
import { unstable_cache } from 'next/cache';

export async function loadOrganization(organizationId: string) {
  return unstable_cache(
    async (organizationId: string) => {
      return clerkClient.organizations.getOrganization({ organizationId });
    },
    ['organizations', `organizations:${organizationId}`],
    { tags: ['organizations', `organizations:${organizationId}`], revalidate: 60 * 60 * 24 }
  )(organizationId);
}
