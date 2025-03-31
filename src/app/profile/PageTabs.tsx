'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export enum PageTypes {
  player = 'player',
  organizations = 'organizations',
}

const pageTypeToTextMappping: Record<
  PageTypes,
  { title: string; slug: string }
> = {
  [PageTypes.player]: { title: 'Player profile', slug: 'player' },
  [PageTypes.organizations]: { title: 'Organizations', slug: 'organizations' },
};

export function PageTabs() {
  const path = usePathname();
  const pageType = path.split('/').pop();

  const { user } = useUser();
  const hasOrganizations = !!user?.organizationMemberships.length;

  return (
    <ToggleGroup
      type="single"
      value={pageType}
      className="flex-wrap justify-start">
      {Object.keys(PageTypes)
        .filter(key => hasOrganizations || key !== PageTypes.organizations)
        .map(key => (
          <ToggleGroupItem key={key} value={key} className="text-base">
            <Link href={`/profile/${key}`}>
              {pageTypeToTextMappping[key as PageTypes].title}
            </Link>
          </ToggleGroupItem>
        ))}
    </ToggleGroup>
  );
}
