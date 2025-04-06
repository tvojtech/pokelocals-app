'use client';

import { useOrganization } from '@clerk/nextjs';

import { Avatar, AvatarImage } from './ui/avatar';

export function OrganizationAvatar() {
  const { organization } = useOrganization();

  if (!organization) {
    return <div className="size-9 rounded-full bg-secondary"></div>;
  }

  return (
    <Avatar className="size-9">
      <AvatarImage src={organization?.imageUrl} />
    </Avatar>
  );
}
