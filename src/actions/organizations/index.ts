'use server';

import { clerkClient } from '@clerk/clerk-sdk-node';
import { auth } from '@clerk/nextjs/server';

export async function addOrganizationMember(email: string) {
  const { userId, orgId, has } = await auth();

  if (!userId || !orgId || !has({ role: 'org:admin' })) {
    throw new Error('Unauthorized');
  }

  const users = await clerkClient.users.getUserList({ emailAddress: [email] });

  if (users.length === 0) {
    return { error: 'No such user found' };
  }

  if (users.length > 1) {
    return { error: 'Multiple users found. Contact support.' };
  }

  await clerkClient.organizations.createOrganizationMembership({
    organizationId: orgId,
    userId: users[0].id,
    role: 'org:member',
  });

  return { success: 'User added to organization' };
}
