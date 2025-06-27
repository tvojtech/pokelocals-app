'use client';

import { useChangelog } from '@/hooks/useChangelog';

import { clientOnlyComponent } from './clientOnlyComponent';
import { Badge } from './ui/badge';

/**
 * Avatar badge component that shows a "New" indicator when there are unread changelog items
 */
export const ChangelogAvatarBadge = clientOnlyComponent(() => {
  const { hasNewItems, isLoading } = useChangelog();

  if (isLoading || !hasNewItems) {
    return null;
  }

  return (
    <Badge
      variant="default"
      className="absolute -right-4 -top-1 flex h-3 items-center justify-center p-1 py-2 text-[10px]">
      New
    </Badge>
  );
});

/**
 * Menu item badge component that shows a "New" indicator when there are unread changelog items
 */
export const ChangelogMenuBadge = clientOnlyComponent(() => {
  const { hasNewItems, isLoading } = useChangelog();

  if (isLoading || !hasNewItems) {
    return null;
  }

  return (
    <Badge variant="default" className="ml-auto h-4 px-1 text-[10px]">
      New
    </Badge>
  );
});

/**
 * Mobile hamburger menu badge component that shows a small dot when there are unread changelog items
 */
export const ChangelogMobileBadge = clientOnlyComponent(() => {
  const { hasNewItems, isLoading } = useChangelog();

  if (isLoading || !hasNewItems) {
    return null;
  }

  return (
    <Badge
      variant="destructive"
      className="absolute right-0 top-0 h-3 w-3 rounded-full p-0 hover:bg-destructive hover:opacity-100"
    />
  );
});
