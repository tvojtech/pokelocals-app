import { cookies } from 'next/headers';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/buttons/button';

export async function DismissableOrganizerAlert() {
  const dismissed = (await cookies()).get('dismissedOrganizerAlert')?.value === 'true';

  if (dismissed) {
    return null;
  }

  return (
    <Alert variant="info" style={{ transitionDuration: '2000ms' }}>
      <AlertTitle className="flex items-center justify-between">
        Want to organize a tournament?
        <form
          action={async () => {
            'use server';
            (await cookies()).set('dismissedOrganizerAlert', 'true', {
              httpOnly: true,
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 365 * 10, // 10 years - never expire
            });
          }}>
          <Button variant="link">Dismiss</Button>
        </form>
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
}
