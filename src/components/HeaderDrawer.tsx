'use client';

import { useClerk, useSession } from '@clerk/nextjs';
import { useToggle } from '@uidotdev/usehooks';
import { LogIn, LogOut, Menu, Settings2, X } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';

import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { FeedbackDialog } from '@/components/FeedbackDialog';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/buttons/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export const HeaderDrawer = clientOnlyComponent(
  () => {
    const [isDrawerOpen, toggleDrawer] = useToggle(false);
    const { session } = useSession();
    const { signOut } = useClerk();
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
            <SheetTitle className="flex items-center justify-between border-b px-2 pb-4">
              <Logo />
              <SheetClose onClick={() => toggleDrawer(false)}>
                <X />
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 p-4 px-2">
            {session ? (
              <div className="space-y-2">
                <p className="text-md">{session.user?.primaryEmailAddress?.emailAddress}</p>
                <div className="flex justify-end">
                  <Button
                    onClick={() => signOut()}
                    title="Logout"
                    variant="default"
                    className="flex w-full items-center justify-center uppercase">
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
                  `/sign-in?return=${encodeURIComponent(window.location.pathname + '?' + window.location.search)}`
                )}
                className="flex w-full items-center justify-center uppercase">
                <LogIn />
                Sign in
              </Button>
            )}
            <Separator className="-mx-2 w-[calc(100%+1rem)]" />
            <div className="space-y-1">
              <Button
                onClick={sidebarButtonClickHandler('/profile/player')}
                variant="ghost"
                className="w-full justify-start">
                <Settings2 />
                Profile
              </Button>
              <FeedbackDialog afterSuccessfulSubmit={() => toggleDrawer(false)} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
  () => {
    return <Menu className="lg:hidden" />;
  }
);
