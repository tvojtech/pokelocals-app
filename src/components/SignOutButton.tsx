'use client';

import { SignOutButton as ClerkSignOutButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SignOutButton() {
  return (
    <ClerkSignOutButton
      redirectUrl={typeof window !== 'undefined' ? window.location.href : '/'}>
      <Button variant="ghost" title="Logout">
        <LogOut size={18} />
      </Button>
    </ClerkSignOutButton>
  );
}
