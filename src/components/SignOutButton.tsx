'use client';

import { useClerk } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <Button variant="ghost" title="Logout" onClick={() => signOut()}>
      <LogOut size={18} />
    </Button>
  );
}
