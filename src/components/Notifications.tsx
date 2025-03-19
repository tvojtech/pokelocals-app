'use client';

import { BellPlus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

import { registerNotificationToken } from '@/app/actions/notifications';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { voidComponent } from '@/components/voidComponent';
import { catchError } from '@/app/utils';
import useFcmToken from '@/hooks/useFcmToken';

export const Notifications = voidComponent(
  clientOnlyComponent(() => {
    const params = useParams<{ id: string }>();
    const { data: session } = useSession();
    const { token, notificationPermissionStatus } = useFcmToken();

    const handleClick = useCallback(async () => {
      if (session?.user?.email && token) {
        const [error, result] = await catchError(
          registerNotificationToken({
            token,
            tournamentId: params.id,
            email: session.user?.email,
          })
        );

        if (error) {
          console.error('Error registering notification token', error);
        } else {
          console.log('Notification token registered', result);
        }
      }
    }, [params.id, session?.user?.email, token]);

    if (!session || !session.user || !session.user.email) {
      return null;
    }

    if (!token || notificationPermissionStatus === 'denied') {
      return null;
    }

    return (
      session &&
      session.user &&
      session.user.email && (
        <div role="button" onClick={handleClick}>
          <BellPlus />
        </div>
      )
    );
  })
);
