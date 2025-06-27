'use client';

import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useChangelog } from '@/hooks/useChangelog';

/**
 * Formats a date string into a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Changelog page component that displays all changelog items and marks them as viewed
 */
export default function ChangelogPage() {
  const { items, markAllAsViewed } = useChangelog();

  useEffect(() => {
    // Mark all current changelog items as viewed when the page is visited
    markAllAsViewed();
  }, [markAllAsViewed]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">What&apos;s New</h1>
        <p className="text-muted-foreground">
          Stay up to date with the latest features, improvements, and changes to POKÉ LOCALS.
        </p>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No changelog items available.</p>
            </CardContent>
          </Card>
        ) : (
          items.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <time className="text-sm text-muted-foreground" dateTime={item.date}>
                    {formatDate(item.date)}
                  </time>
                </div>
              </CardHeader>
              <CardContent className="leading-relaxed text-foreground">{item.content}</CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
