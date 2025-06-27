'use client';

import { useIsClient, useLocalStorage } from '@uidotdev/usehooks';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/buttons/button';
import { cn } from '@/lib/utils';

/**
 * Represents a single changelog item
 */
export interface ChangelogItem {
  /** Unique identifier for the changelog item */
  id: string;
  /** Title of the changelog entry */
  title: string;
  /** Content/description of the changes */
  content: React.ReactNode;
  /** Date when the change was published */
  date: string;
}

/**
 * Local storage key for storing viewed changelog item IDs
 */
const VIEWED_CHANGELOG_KEY = 'viewedChangelogItems';

/**
 * Mock changelog data - this would typically come from a CMS or API
 * TODO: Replace with actual data source
 */
export const changelogItems: ChangelogItem[] = [
  {
    id: 'changelog-001-initial-release',
    title: 'Initial Release',
    content:
      'We are excited to announce the initial release of POKÉ LOCALS. This is a beta release and we are looking for feedback to improve the app. Please report any issues you find.',
    date: '2025-02-27',
  },
  {
    id: 'changelog-002-desklists',
    title: 'Decklist submission',
    content: (
      <>
        <p>Decklist submission is now possible via POKÉ LOCALS.</p>
        <ul className="list-disc pl-4">
          <li>Users can submit decklists to the tournaments.</li>
          <li>Organizers can view submitted decklists in the deckcheck view.</li>
        </ul>

        <p>
          For more information, please visit the{' '}
          <Link
            className={cn(buttonVariants({ variant: 'link' }), 'h-[unset] p-0')}
            href="https://docs.pokelocals.online/docs/decklists"
            target="_blank">
            documentation
          </Link>{' '}
          page.
        </p>
      </>
    ),
    date: '2025-06-29',
  },
];

/**
 * Custom hook for managing changelog state and operations
 * @returns Object containing changelog state and utility functions
 */
export function useChangelog(): {
  /** Whether there are unread changelog items */
  hasNewItems: boolean;
  /** Array of all changelog items */
  items: ChangelogItem[];
  /** Function to mark all items as viewed */
  markAllAsViewed: () => void;
  /** Whether the hook is still checking localStorage (prevents hydration mismatch) */
  isLoading: boolean;
} {
  const isClient = useIsClient();
  const [viewedItems, setViewedItems] = useLocalStorage<string[]>(VIEWED_CHANGELOG_KEY, []);

  // Calculate if there are new items based on viewed items
  const allItemIds = changelogItems.map(item => item.id);
  const hasNewItems = isClient && allItemIds.some(id => !viewedItems.includes(id));

  const markAllAsViewed = (): void => {
    if (isClient) {
      setViewedItems(allItemIds);
    }
  };

  return {
    hasNewItems: hasNewItems,
    items: changelogItems,
    markAllAsViewed,
    isLoading: !isClient,
  };
}
