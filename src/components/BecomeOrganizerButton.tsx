'use client';

import { useUser } from '@clerk/nextjs';

import { Button } from './ui/button';

export function BecomeOrganizerButton() {
  const { user } = useUser();
  const hasOrganizations = !!user?.organizationMemberships.length;

  if (!user || hasOrganizations) {
    return null;
  }

  return <Button>Become an organizer</Button>;
}
