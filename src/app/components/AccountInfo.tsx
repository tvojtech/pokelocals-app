'use client';
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

export function AccountInfo() {
  const { openSignIn } = useClerk();
  return (
    <>
      <SignedOut>
        <Button onClick={() => openSignIn({ fallbackRedirectUrl: '/' })}>
          Login
        </Button>
        {/* <SignInButton /> */}
        {/* <SignUpButton /> */}
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
