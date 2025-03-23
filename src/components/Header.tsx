import { LogIn, MessageCircle, Settings2, User2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { auth } from '@/app/auth';
import { FeedbackDialog } from '@/components/FeedbackDialog';
import { HeaderDrawer } from '@/components/HeaderDrawer';
import { Logo } from '@/components/Logo';
import { SignOutButton } from '@/components/SignOutButton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HeaderLink: React.FC<React.ComponentProps<typeof Link>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={cn(buttonVariants({ variant: 'link' }), className)}
      {...props}>
      {children}
    </Link>
  );
};

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-slate-50 border-b-2 shadow-sm text-gray-800 print:hidden">
      <nav>
        <div className="lg:container lg:mx-auto px-4 md:px-10 py-4 flex justify-between items-center h-16">
          <Link href="/">
            <Logo />
          </Link>
          <ul className="hidden lg:flex lg:items-center">
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
            {!session?.user && (
              <li>
                <HeaderLink href="/profile">
                  <Settings2 size={18} />
                  Settings
                </HeaderLink>
              </li>
            )}
            <li>
              {!session?.user ? (
                <HeaderLink href="/login">
                  <LogIn size={18} />
                  Login
                </HeaderLink>
              ) : (
                <div className="flex items-center">
                  <HeaderLink href="/profile">
                    <User2 size={18} />
                    {session.user?.email}
                  </HeaderLink>
                  <SignOutButton />
                </div>
              )}
            </li>
          </ul>

          <HeaderDrawer />
        </div>
      </nav>
    </header>
  );
}
