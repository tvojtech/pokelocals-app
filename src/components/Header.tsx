'use client';

import { useAuth } from '@clerk/nextjs';
import { Building2, MessageCircle, Trophy } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { OrganizationSwitcher } from '@/app/profile/organization/OrganizationSwitcher';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { HeaderDrawer } from '@/components/HeaderDrawer';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/buttons/button';

import { FeedbackDialog } from './FeedbackDialog';
import { UserButton } from './UserButton';

export const Header = clientOnlyComponent(
  function Header() {
    const { sessionId, orgId } = useAuth();
    return (
      <HeaderSkeleton>
        <ul className="hidden space-x-4 md:flex md:items-center">
          <li>
            <Button variant="link" asChild>
              <Link href="/" prefetch={false}>
                <Trophy />
                Tournaments
              </Link>
            </Button>
          </li>
          {orgId && (
            <li>
              <Button variant="link" asChild>
                <Link href="/dashboard" prefetch={false}>
                  <Building2 />
                  Organization dashboard
                </Link>
              </Button>
            </li>
          )}
          <li>
            <FeedbackDialog
              button={
                <Button variant="link">
                  <MessageCircle />
                  Feedback
                </Button>
              }
            />
          </li>
          <li>
            <OrganizationSwitcher />
          </li>
          <li>
            {sessionId ? (
              <UserButton />
            ) : (
              <Button variant="link" asChild>
                <Link href="/sign-in" prefetch={false}>
                  Sign in
                </Link>
              </Button>
            )}
          </li>
        </ul>

        <HeaderDrawer />
      </HeaderSkeleton>
    );
  },
  () => (
    <HeaderSkeleton>
      <></>
    </HeaderSkeleton>
  )
);

function HeaderSkeleton({ children }: { children: ReactNode }) {
  return (
    <header className="border-b-2 shadow-sm print:hidden">
      <nav>
        <div className="flex h-16 items-center justify-between px-4 py-4 lg:container md:px-10 lg:mx-auto">
          <Link href="/" prefetch={false}>
            <Logo />
          </Link>
          {children}
        </div>
      </nav>
    </header>
  );
}
