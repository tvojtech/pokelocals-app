import { useOrganization } from '@clerk/nextjs';
import { ClerkPaginatedResponse, OrganizationMembershipResource } from '@clerk/types';
import React, { Suspense, useActionState, useCallback, useMemo } from 'react';

import { addOrganizationMember } from '@/actions/invitations';
import { Loading } from '@/components/Loading';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function OrganizationMembers({ membership }: { membership: OrganizationMembershipResource | null | undefined }) {
  const membershipsPromise = useMemo(() => {
    if (!membership || membership?.role !== 'org:admin') {
      return null;
    }
    return membership.organization.getMemberships();
  }, [membership]);

  if (!membershipsPromise) {
    return null;
  }

  return (
    <div className="space-y-2">
      <AddMemberForm />
      <Table>
        <TableCaption>List of users in {membership?.organization.name}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identifier</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense
            fallback={
              <TableRow>
                <TableCell colSpan={2}>
                  <Loading />
                </TableCell>
              </TableRow>
            }>
            <MembersTableBody memberships={membershipsPromise} />
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}

function MembersTableBody({
  memberships,
}: {
  memberships: Promise<ClerkPaginatedResponse<OrganizationMembershipResource>>;
}) {
  const users = React.use(memberships);
  return (
    <>
      {users.data.map(user => (
        <TableRow key={user.id}>
          <TableCell>{user.publicUserData.identifier}</TableCell>
          <TableCell>{user.role}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

function AddMemberForm() {
  const { organization } = useOrganization();
  const addOrganizationMemberAction = useCallback(
    async (prevState: unknown, formData: FormData) => {
      const result = await addOrganizationMember(formData.get('email') as string);
      await organization?.reload();
      return result;
    },
    [organization]
  );

  const [, formAction, isPending] = useActionState(addOrganizationMemberAction, undefined);
  return (
    <form action={formAction} className="flex justify-center gap-2">
      <Input name="email" type="email" placeholder="User email" />
      <LoadingButton type="submit" variant="outline" isLoading={isPending}>
        Add user
      </LoadingButton>
    </form>
  );
}
