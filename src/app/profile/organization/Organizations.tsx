'use client';

import { useOrganization, useOrganizationList, useUser } from '@clerk/nextjs';

import { Loading } from '@/components/Loading';
import { Button } from '@/components/ui/buttons/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { OrganizationMembers } from './OrganizationMembers';

export function Organizations() {
  const { isLoaded: isUserLoaded } = useUser();
  const { membership, isLoaded: isOrgLoaded } = useOrganization();

  const isLoading = !isOrgLoaded || !isUserLoaded;

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>
            {isLoading ? (
              <Skeleton />
            ) : (
              <div className="flex items-center gap-2">
                <img
                  src={membership?.organization.imageUrl}
                  alt={membership?.organization.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                {membership?.organization.name}
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loading />
          ) : membership?.role === 'org:admin' ? (
            <OrganizationMembers membership={membership} />
          ) : (
            <LeaveOrganizationButton />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LeaveOrganizationButton() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { membership, organization, isLoaded: isOrgLoaded } = useOrganization();
  const { userMemberships, setActive } = useOrganizationList({ userMemberships: true });

  if (!isOrgLoaded || !isUserLoaded) {
    return <Loading />;
  }

  if (membership?.role === 'org:admin') {
    return null;
  }

  return (
    <Button
      onClick={async () => {
        await user?.leaveOrganization(organization!.id);
        await user?.reload();
        await userMemberships?.revalidate?.();
        await setActive?.({ organization: userMemberships?.data?.[0].organization.id });
      }}>
      Leave Organization
    </Button>
  );
}
