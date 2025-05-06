'use client';

import { Handshake, List, Trophy, UserRound } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export enum PageTypes {
  my = 'my',
  all = 'all',
  roster = 'roster',
  standings = 'standings',
}

const pageTypeToTextMappping: Record<PageTypes, { title: string; slug: PageTypes; icon: React.ReactNode }> = {
  [PageTypes.my]: { title: 'My Pairings', slug: PageTypes.my, icon: <UserRound className="h-4 w-4" /> },
  [PageTypes.all]: { title: 'Pairings', slug: PageTypes.all, icon: <Handshake className="h-4 w-4" /> },
  [PageTypes.roster]: { title: 'Roster', slug: PageTypes.roster, icon: <List className="h-4 w-4" /> },
  [PageTypes.standings]: { title: 'Standings', slug: PageTypes.standings, icon: <Trophy className="h-4 w-4" /> },
};

export function PageTabs() {
  const path = usePathname();
  const { id } = useParams<{ id: string }>();
  const urlPageType = path.split('/').pop();
  const [pageType, setPageType] = useState<PageTypes>((urlPageType as PageTypes) || PageTypes.my);
  const router = useRouter();

  return (
    <Tabs value={pageType}>
      <TabsList>
        {Object.keys(PageTypes).map(key => (
          <TabsTrigger
            key={key}
            value={key}
            onClick={() => {
              router.push(`/tournaments/${id}/pairings/${key}`);
              setPageType(key as PageTypes);
            }}
            className="flex items-center gap-2">
            <span>{pageTypeToTextMappping[key as PageTypes].icon}</span>
            {pageType === key && <span>{pageTypeToTextMappping[key as PageTypes].title}</span>}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
