'use client';

import { useSession } from '@clerk/nextjs';
import { BellPlus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { registerNotificationToken } from '@/actions/notifications';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { voidComponent } from '@/components/voidComponent';
import useFcmToken from '@/hooks/useFcmToken';
import { catchError } from '@/lib/utils';

export const Notifications = voidComponent(
  clientOnlyComponent(() => {
    const params = useParams<{ id: string }>();
    const { session } = useSession();
    const { token, notificationPermissionStatus } = useFcmToken();
    const [isRegistered, setIsRegistered] = useState(false);

    const handleClick = useCallback(async () => {
      if (session?.user?.primaryEmailAddress?.emailAddress && token) {
        const [error, result] = await catchError(
          registerNotificationToken({
            token,
            tournamentId: params.id,
            email: session.user?.primaryEmailAddress?.emailAddress,
          })
        );
        
        if (error) {
          console.error('Error registering notification token', error);
          toast.error('Failed to enable notifications');
        } else {
          console.log('Notification token registered', result);
          setIsRegistered(true);
          toast.success('Notifications enabled');
        }
      }
    }, [params.id, session?.user?.primaryEmailAddress?.emailAddress, token]);

    if (!session || !session.user || !session.user.primaryEmailAddress?.emailAddress) {
      return null;
    }

    if (!token || notificationPermissionStatus === 'denied') {
      return null;
    }

    return (
      session &&
      session.user &&
      session.user.primaryEmailAddress?.emailAddress && (
        <div role="button" onClick={handleClick} className="relative">
          <BellPlus />
          {isRegistered && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </div>
      )
    );
  })
);
