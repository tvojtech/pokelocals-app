'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export enum PageTypes {
  player = 'player',
  organization = 'organization',
}

const pageTypeToTextMappping: Record<PageTypes, { title: string; slug: string }> = {
  [PageTypes.player]: { title: 'Player profile', slug: PageTypes.player },
  [PageTypes.organization]: { title: 'Organization', slug: PageTypes.organization },
};

export function PageTabs() {
  const path = usePathname();
  const pageType = path.split('/').pop();

  return (
    <ToggleGroup type="single" value={pageType} className="flex-wrap justify-start">
      {Object.keys(PageTypes).map(key => (
        <ToggleGroupItem key={key} value={key} className="text-base">
          <Link href={`/profile/${key}`} prefetch={false}>
            {pageTypeToTextMappping[key as PageTypes].title}
          </Link>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
