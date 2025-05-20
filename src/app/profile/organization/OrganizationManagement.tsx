'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Loading } from '@/components/Loading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { NoOrganization } from './NoOrganization';
import { Organization } from './Organization';

export default function OrganizationManagement({
  isOrganizationStatsEnabled,
}: {
  isOrganizationStatsEnabled: boolean;
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
      <Alert variant="info">
        <AlertTitle>Thank you for joining!</AlertTitle>
        <AlertDescription>You will be notified when your application is approved.</AlertDescription>
      </Alert>
    );
  }

  if (!hasOrganizations) {
    return <NoOrganization />;
  }

  return <Organization isOrganizationStatsEnabled={isOrganizationStatsEnabled} />;
}
