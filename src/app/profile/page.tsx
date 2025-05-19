import { auth } from '@clerk/nextjs/server';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { organizationStatsFlag } from '@/flags';

import OrganizationManagement from './organization/OrganizationManagement';
import { PlayerProfile } from './PlayerProfile';

export default async function Profile() {
  const { userId } = await auth();

  const isOrganizationStatsEnabled = await organizationStatsFlag.run({
    identify: { userId: userId ?? 'anonymous' },
  });

  return (
    <Tabs defaultValue="player">
      <TabsList>
        <TabsTrigger value="player">Player profile</TabsTrigger>
        {userId && <TabsTrigger value="organization">Organization</TabsTrigger>}
      </TabsList>
      <TabsContent value="player">
        <PlayerProfile />
      </TabsContent>
      {userId && (
        <TabsContent value="organization">
          <OrganizationManagement isOrganizationStatsEnabled={isOrganizationStatsEnabled} />
        </TabsContent>
      )}
    </Tabs>
  );
}
