'use client';

import { BellPlus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

import { registerNotificationToken } from '@/app/actions/notifications';
import { clientOnlyComponent } from '@/app/components/clientOnlyComponent';
import useFcmToken from '@/hooks/useFcmToken';

export const Notifications = clientOnlyComponent(() => {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const { token, notificationPermissionStatus } = useFcmToken();

  const handleClick = useCallback(async () => {
    if (session?.user?.email && token) {
      registerNotificationToken({
        token,
        tournamentId: params.id,
        email: session.user?.email,
      });
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
});
