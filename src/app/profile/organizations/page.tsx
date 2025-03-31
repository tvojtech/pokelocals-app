'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Loading } from '@/components/Loading';

import { Organizations } from '../Organizations';

export default function OrganizationsPage() {
  const { user, isLoaded } = useUser();
  const hasOrganizations = !!user?.organizationMemberships.length;

  if (!isLoaded) {
    return <Loading />;
  }

  if (!hasOrganizations) {
    return redirect('/profile/player');
  }

  return <Organizations />;
}
