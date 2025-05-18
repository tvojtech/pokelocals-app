import { cookies } from 'next/headers';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/buttons/button';
import { cn } from '@/lib/utils';

export async function OrganizationDashboardAlert() {
  const dismissed = (await cookies()).get('dismissedOrganizationDashboardAlert')?.value === 'true';

  if (dismissed) {
    return null;
  }

  return (
    <Alert variant="info">
      <AlertTitle className="flex items-center justify-between">
        Organization dashboard
        <form
          action={async () => {
            'use server';
            (await cookies()).set('dismissedOrganizationDashboardAlert', 'true', {
              httpOnly: true,
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 365 * 10, // 10 years - never expire
            });
          }}>
          <Button variant="link">Dismiss</Button>
        </form>
      </AlertTitle>

      <AlertDescription>
        Organization dashboard is now available. You can manage your tournaments from there.{' '}
        <Link className={cn(buttonVariants({ variant: 'link' }), 'p-0')} href="/dashboard">
          Go to organization dashboard
        </Link>
      </AlertDescription>
    </Alert>
  );
}
