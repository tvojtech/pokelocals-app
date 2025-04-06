'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Alert } from '@/components/Alert';
import { Loading } from '@/components/Loading';

import { NewOrganizationForm } from './NewOrganizationForm';
import { Organizations } from './Organizations';

export default function OrganizationsPage() {
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
      <Alert
        type="info"
        message="Thank you for joining! You will be notified when your application is
        approved."
      />
    );
  }

  if (!hasOrganizations) {
    return <NewOrganizationForm />;
  }

  return <Organizations />;
}
