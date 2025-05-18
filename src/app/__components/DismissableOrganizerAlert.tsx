'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useOrganizerAlertDismissed } from '@/app/hooks';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/buttons/button';
import { cn } from '@/lib/utils';

export const DismissableOrganizerAlert = clientOnlyComponent(function DismissableOrganizerAlert() {
  const { dismissed, setDismissed } = useOrganizerAlertDismissed();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (dismissed) {
    return null;
  }

  return (
    <Alert
      variant="info"
      className={cn('transition-opacity', visible ? 'opacity-100' : 'opacity-0')}
      style={{ transitionDuration: '2000ms' }}>
      <AlertTitle className="flex items-center justify-between">
        Want to organize a tournament?
        <Button variant="link" onClick={() => setDismissed(true)}>
          Dismiss
        </Button>
      </AlertTitle>
      <AlertDescription>
        <p>You need to be an organizer.</p>
        <p>To become one:</p>
        <ul className="list-disc pl-4">
          <li>
            Please fill in the form in your{' '}
            <Button variant="link" className="p-0" asChild>
              <Link href="/profile">profile</Link>
            </Button>{' '}
            and we&apos;ll create an organization for you or;
          </li>
          <li>if your LGS already has an organization, please ask your administrator to assign you to it.</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
});
