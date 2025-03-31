'use client';

import { useUser } from '@clerk/nextjs';

import { Button } from './ui/button';

export function BecomeOrganizerButton() {
  const { user } = useUser();

  return <Button>Become an organizer</Button>;
}
