'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const SignOutButton: React.FC = () => {
  return (
    <Button variant="ghost" title="Logout" onClick={() => signOut()}>
      <LogOut size={18} />
    </Button>
  );
};
