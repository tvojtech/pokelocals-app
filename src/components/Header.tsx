import { auth } from '@clerk/nextjs/server';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { OrganizationSwitcher } from '@/app/profile/organization/OrganizationSwitcher';
import { HeaderDrawer } from '@/components/HeaderDrawer';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/buttons/button';

import { FeedbackDialog } from './FeedbackDialog';
import { UserButton } from './UserButton';

export async function Header() {
  const { sessionId } = await auth();
  return (
    <header className="border-b-2 shadow-sm print:hidden">
      <nav>
        <div className="flex h-16 items-center justify-between px-4 py-4 lg:container md:px-10 lg:mx-auto">
          <Link href="/" prefetch={false}>
            <Logo />
          </Link>
          <ul className="hidden space-x-4 md:flex md:items-center">
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
        </div>
      </nav>
    </header>
  );
}
