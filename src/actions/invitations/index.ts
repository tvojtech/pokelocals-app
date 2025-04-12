'use server';

import { clerkClient } from '@clerk/clerk-sdk-node';
import { auth } from '@clerk/nextjs/server';

export async function addOrganizationMember(email: string) {
  const { userId, orgId, orgRole, orgPermissions, has } = await auth();

  console.log('userId', userId);
  console.log('orgId', orgId);
  console.log('orgRole', orgRole);
  console.log('orgPermissions', orgPermissions);

  if (!userId || !orgId || !has({ role: 'org:admin' })) {
    throw new Error('Unauthorized');
  }

  const users = await clerkClient.users.getUserList({ emailAddress: [email] });

  if (users.length === 0) {
    throw { error: 'No user found' };
  }

  if (users.length > 1) {
    throw { error: 'Multiple users found. Contact support.' };
  }

  await clerkClient.organizations.createOrganizationMembership({
    organizationId: orgId,
    userId: users[0].id,
    role: 'org:member',
  });

  return { success: 'User added to organization' };
}
