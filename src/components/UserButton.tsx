'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { LucideLogOut, LucideSettings2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Avatar, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function UserButton() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ydUtPVlk4UzdjMGJWRENUenhmZnpsM2lUMDUiLCJyaWQiOiJ1c2VyXzJ1eHRoT2NVYWVCbnpFTG1WemdmMTU5QnQ5MCJ9" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.primaryEmailAddress?.emailAddress}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile/player" prefetch={false}>
            <LucideSettings2 /> Profile
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        {isSignedIn && (
          <DropdownMenuItem onClick={() => signOut()}>
            <LucideLogOut />
            Sign out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
