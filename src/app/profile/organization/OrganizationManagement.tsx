'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Alert } from '@/components/Alert';
import { Loading } from '@/components/Loading';

import { NoOrganization } from './NoOrganization';
import { Organizations } from './Organizations';

export default function OrganizationManagement({
  isOrganizationManagementEnabled,
}: {
  isOrganizationManagementEnabled: boolean;
}) {
  const { user, isLoaded } = useUser();
  const hasOrganizations = !!user?.organizationMemberships.length;

  if (!isLoaded) {
    return <Loading />;
  }

  if (!user) {
    return redirect('/sign-in');
  }

  if (user?.publicMetadata.waitlist) {
    return (
      <Alert type="info" message="Thank you for joining! You will be notified when your application is approved." />
    );
  }

  if (!hasOrganizations) {
    return <NoOrganization />;
  }

  if (!isOrganizationManagementEnabled) {
    return <Alert message="Organization management will be available soon." type="info" />;
  }

  return <Organizations />;
}
