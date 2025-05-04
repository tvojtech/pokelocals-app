'use client';

import { useSession } from '@clerk/nextjs';
import { BellPlus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

// import { registerNotificationToken } from '@/actions/notifications';
import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { voidComponent } from '@/components/voidComponent';
import useFcmToken from '@/hooks/useFcmToken';

export const Notifications = voidComponent(
  clientOnlyComponent(() => {
    const params = useParams<{ id: string }>();
    const { session } = useSession();
    const { token, notificationPermissionStatus } = useFcmToken();

    const handleClick = useCallback(async () => {
      if (session?.user?.primaryEmailAddress?.emailAddress && token) {
        // const [error, result] = await catchError(
        // registerNotificationToken({
        //   token,
        //   tournamentId: params.id,
        //   email: session.user?.primaryEmailAddress?.emailAddress,
        // })
        // );
        // if (error) {
        //   console.error('Error registering notification token', error);
        // } else {
        //   console.log('Notification token registered', result);
        // }
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
        <div role="button" onClick={handleClick}>
          <BellPlus />
        </div>
      )
    );
  })
);
