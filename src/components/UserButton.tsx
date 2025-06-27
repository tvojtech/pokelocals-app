'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { BookOpen, LucideLogOut, LucideSettings2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ChangelogAvatarBadge, ChangelogMenuBadge } from './ChangelogBadge';
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
        <div className="relative">
          <Avatar className="size-9 cursor-pointer">
            <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ydUtPVlk4UzdjMGJWRENUenhmZnpsM2lUMDUiLCJyaWQiOiJ1c2VyXzJ1eHRoT2NVYWVCbnpFTG1WemdmMTU5QnQ5MCJ9" />
          </Avatar>
          <ChangelogAvatarBadge />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.primaryEmailAddress?.emailAddress}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/changelog" prefetch={false}>
            <Sparkles />
            <span className="flex items-center gap-2">
              What&apos;s new
              <ChangelogMenuBadge />
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="https://docs.pokelocals.online/docs" target="_blank">
            <BookOpen />
            Documentation
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" prefetch={false}>
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
