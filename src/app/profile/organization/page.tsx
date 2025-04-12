import { auth } from '@clerk/nextjs/server';

import { organizationManagementFlag } from '@/flags';

import OrganizationManagement from './OrganizationManagement';

export default async function OrganizationPage() {
  const { userId } = await auth();
  const isOrganizationManagementEnabled = await organizationManagementFlag.run({
    identify: { userId: userId ?? 'anonymous' },
  });

  return <OrganizationManagement isOrganizationManagementEnabled={isOrganizationManagementEnabled} />;
}
