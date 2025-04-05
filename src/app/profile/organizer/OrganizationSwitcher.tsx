/* eslint-disable @next/next/no-img-element */
'use client';

import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function OrganizationSwitcher() {
  const { organization, isLoaded: isOrgLoaded } = useOrganization();
  const { userMemberships, setActive, isLoaded } = useOrganizationList({
    userMemberships: true,
  });

  useEffect(() => {
    if (
      !organization &&
      setActive &&
      isOrgLoaded &&
      userMemberships.data.length > 0
    ) {
      setActive({ organization: userMemberships.data[0]?.organization.id });
    }
  }, [organization, setActive, userMemberships, isOrgLoaded]);

  // If not loaded yet, or user has 0-1 organizations, don't render anything
  if (!isLoaded || !userMemberships?.data || userMemberships.data.length <= 1) {
    return null;
  }

  const handleOrganizationChange = (organizationId: string) => {
    const membership = userMemberships.data.find(
      m => m.organization.id === organizationId
    );
    if (membership) {
      setActive({ organization: membership.organization.id });
    }
  };

  return (
    <>
      <Select
        onValueChange={handleOrganizationChange}
        defaultValue={organization?.id}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Select an organization" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {userMemberships.data.map(membership => (
              <SelectItem
                key={membership.organization.id}
                value={membership.organization.id}>
                <div className="flex items-center gap-2 ">
                  <img
                    src={membership.organization.imageUrl}
                    alt={membership.organization.name}
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                  {membership.organization.name}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
