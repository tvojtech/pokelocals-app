import { auth } from '@clerk/nextjs/server';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { OrganizationSwitcher } from '@/app/profile/organizer/OrganizationSwitcher';
import { HeaderDrawer } from '@/components/HeaderDrawer';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

import { FeedbackDialog } from './FeedbackDialog';
import { UserButton } from './UserButton';

export async function Header() {
  const { sessionId } = await auth();
  return (
    <header className="bg-slate-50 border-b-2 shadow-sm text-gray-800 print:hidden">
      <nav>
        <div className="lg:container lg:mx-auto px-4 md:px-10 py-4 flex justify-between items-center h-16">
          <Link href="/" prefetch={false}>
            <Logo />
          </Link>
          <ul className="hidden lg:flex lg:items-center space-x-4">
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
