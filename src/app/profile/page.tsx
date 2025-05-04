import { auth } from '@clerk/nextjs/server';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { organizationManagementFlag, organizationStatsFlag } from '@/flags';

import OrganizationManagement from './organization/OrganizationManagement';
import { PlayerProfile } from './PlayerProfile';

export default async function Profile() {
  const { userId } = await auth();
  const isOrganizationManagementEnabled = await organizationManagementFlag.run({
    identify: { userId: userId ?? 'anonymous' },
  });
  const isOrganizationStatsEnabled = await organizationStatsFlag.run({
    identify: { userId: userId ?? 'anonymous' },
  });

  return (
    <Tabs defaultValue="player">
      <TabsList>
        <TabsTrigger value="player">Player profile</TabsTrigger>
        {isOrganizationManagementEnabled && userId && <TabsTrigger value="organization">Organization</TabsTrigger>}
      </TabsList>
      <TabsContent value="player">
        <PlayerProfile />
      </TabsContent>
      {isOrganizationManagementEnabled && userId && (
        <TabsContent value="organization">
          <OrganizationManagement
            isOrganizationManagementEnabled={isOrganizationManagementEnabled}
            isOrganizationStatsEnabled={isOrganizationStatsEnabled}
          />
        </TabsContent>
      )}
    </Tabs>
  );
}
