import { useOrganization, useOrganizationList, useUser } from '@clerk/nextjs';

export function Organizations() {
  const { memberships, organization } = useOrganization();
  const { user } = useUser();
  const { userMemberships } = useOrganizationList({ userMemberships: true });

  console.log(userMemberships);
  return (
    <div>
      {userMemberships?.data?.map(membership => membership.organization.name)}
    </div>
  );
}
