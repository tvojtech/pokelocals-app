'use client';

import { BellPlus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

import { registerNotificationToken } from '@/app/actions/notifications';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { voidComponent } from '@/components/voidComponent';
import { catchError } from '@/app/utils';
import useFcmToken from '@/hooks/useFcmToken';
import { useSession } from '@clerk/nextjs';

export const Notifications = voidComponent(
  clientOnlyComponent(() => {
    const params = useParams<{ id: string }>();
    const { session } = useSession();
    const { token, notificationPermissionStatus } = useFcmToken();

    const handleClick = useCallback(async () => {
      if (session?.user?.emailAddresses?.[0].emailAddress && token) {
        const [error, result] = await catchError(
          registerNotificationToken({
            token,
            tournamentId: params.id,
            email: session.user?.emailAddresses?.[0].emailAddress,
          })
        );

        if (error) {
          console.error('Error registering notification token', error);
        } else {
          console.log('Notification token registered', result);
        }
      }
    }, [params.id, session?.user?.emailAddresses, token]);

    if (!session || !session.user || !session.user.emailAddresses) {
      return null;
    }

    if (!token || notificationPermissionStatus === 'denied') {
      return null;
    }

    return (
      session &&
      session.user &&
      session.user.emailAddresses && (
        <div role="button" onClick={handleClick}>
          <BellPlus />
        </div>
      )
    );
  })
);
