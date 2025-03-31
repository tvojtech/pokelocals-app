'use client';

import { useUser } from '@clerk/nextjs';

import { Organizations } from './Organizations';
import { PlayerProfile } from './PlayerProfile';

export default function Profile() {
  const { user } = useUser();
  const hasOrganizations = !!user?.organizationMemberships.length;

  return (
    <div className="space-y-8">
      <ProfileSection title="Player profile">
        <PlayerProfile />
      </ProfileSection>
      {hasOrganizations && (
        <ProfileSection title="Organizations">
          <Organizations />
        </ProfileSection>
      )}
    </div>
  );
}

function ProfileSection({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-lg space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
