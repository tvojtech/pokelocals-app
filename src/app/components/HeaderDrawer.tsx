'use client';

import { useToggle } from '@uidotdev/usehooks';
import { LogIn, LogOut, Menu, Settings2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import { clientOnlyComponent } from '@/app/components/clientOnlyComponent';
import { FeedbackDialog } from '@/app/components/FeedbackDialog';
import { Logo } from '@/app/components/Logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const HeaderDrawer: React.FC = clientOnlyComponent(() => {
  const [isDrawerOpen, toggleDrawer] = useToggle(false);
  const { data: session } = useSession();
  const router = useRouter();

  const sidebarButtonClickHandler = (link: string) => () => {
    toggleDrawer(false);
    router.push(link);
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={open => toggleDrawer(open)}>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-4" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle className="pb-4 px-2 border-b flex justify-between items-center">
            <Logo />
            <SheetClose onClick={() => toggleDrawer(false)}>
              <X />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-4 p-4 px-2">
          {session ? (
            <div className="space-y-2">
              <p className="text-md">{session.user?.email}</p>
              <div className="flex justify-end">
                <Button
                  onClick={() => signOut()}
                  title="Logout"
                  variant="default"
                  className="w-full uppercase flex justify-center items-center">
                  Logout
                  <LogOut />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              title="Sign in"
              variant="default"
              onClick={sidebarButtonClickHandler(
                `/login?return=${encodeURIComponent(window.location.pathname + '?' + window.location.search)}`
              )}
              className="w-full uppercase flex justify-center items-center">
              <LogIn />
              Sign in
            </Button>
          )}
          <Separator className="-mx-2 w-[calc(100%+1rem)]" />
          <div className="space-y-1">
            <Button
              onClick={sidebarButtonClickHandler('/profile')}
              variant="ghost"
              className="justify-start w-full">
              <Settings2 />
              Settings
            </Button>
            <FeedbackDialog afterSuccessfulSubmit={() => toggleDrawer(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});
