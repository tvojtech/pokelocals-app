'use client';

import { useOrganizationList } from '@clerk/nextjs';

import { Alert } from '@/components/Alert';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Organizations() {
  //   const { memberships, organization } = useOrganization();
  //   const { user } = useUser();
  const { userMemberships } = useOrganizationList({ userMemberships: true });

  return (
    <>
      <Select>
        <SelectTrigger className="max-w-lg">
          <SelectValue placeholder="Select an organization" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Organizations</SelectLabel>
            {userMemberships?.data?.map(membership => (
              <SelectItem key={membership.id} value={membership.id}>
                {membership.organization.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Alert
        message="Organization management will be available soon."
        type="info"
      />
    </>
  );
}
