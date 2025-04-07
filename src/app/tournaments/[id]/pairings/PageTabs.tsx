'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export enum PageTypes {
  my = 'my',
  all = 'all',
  roster = 'roster',
  standings = 'standings',
}

const pageTypeToTextMappping: Record<PageTypes, { title: string; slug: string }> = {
  [PageTypes.my]: { title: 'My Pairings', slug: 'my' },
  [PageTypes.all]: { title: 'Pairings', slug: 'all' },
  [PageTypes.roster]: { title: 'Roster', slug: 'roster' },
  [PageTypes.standings]: { title: 'Standings', slug: 'standings' },
};

export function PageTabs({ showStandings }: { showStandings: boolean }) {
  const path = usePathname();
  const { id } = useParams<{ id: string }>();

  const pageType = path.split('/').pop();

  return (
    <ToggleGroup type="single" value={pageType} className="flex-wrap justify-start">
      {Object.keys(PageTypes)
        .filter(key => showStandings || key !== PageTypes.standings)
        .map(key => (
          <ToggleGroupItem key={key} value={key} className="text-base">
            <Link href={`/tournaments/${id}/pairings/${key}`} prefetch={false}>
              {pageTypeToTextMappping[key as PageTypes].title}
            </Link>
          </ToggleGroupItem>
        ))}
    </ToggleGroup>
  );
}
