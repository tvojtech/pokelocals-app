import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { getUserProfile } from '../actions';

export function useUserProfile() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: getUserProfile,
    enabled: isLoaded && isSignedIn,
  });

  return { user, profile: data ?? null, isLoaded: isLoaded && !isLoading, isSignedIn, refetchProfile: refetch };
}
