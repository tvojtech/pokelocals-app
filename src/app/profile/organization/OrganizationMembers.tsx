import { useOrganization, useUser } from '@clerk/nextjs';
import { ClerkPaginatedResponse, OrganizationMembershipResource } from '@clerk/types';
import { Loader2 } from 'lucide-react';
import React, { Suspense, useActionState, useCallback, useMemo, useState } from 'react';

import { addOrganizationMember } from '@/actions/organizations';
import { Loading } from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense
            fallback={
              <TableRow>
                <TableCell colSpan={3}>
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
  const { user } = useUser();
  const currentUserMembership = users.data.find(m => m.publicUserData.userId === user?.id);
  const isAdmin = currentUserMembership?.role === 'org:admin';
  const otherAdmins = users.data.filter(m => m.role === 'org:admin' && m.publicUserData.userId !== user?.id);

  return (
    <>
      {users.data.map(member => {
        const isCurrentUser = member.publicUserData.userId === user?.id;
        const canRemove = isAdmin && (!isCurrentUser || otherAdmins.length > 0);
        const canChangeRole = isAdmin && (!isCurrentUser || otherAdmins.length > 0);

        return (
          <TableRow key={member.id}>
            <TableCell>
              {member.publicUserData.identifier}
              {isCurrentUser && (
                <Badge variant="secondary" className="ml-2">
                  YOU
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <MemberRoleSelect member={member} canChangeRole={canChangeRole} />
            </TableCell>
            <TableCell>
              <RemoveMemberButton member={member} canRemove={canRemove} />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

function AddMemberForm() {
  const { organization, isLoaded } = useOrganization();
  const addOrganizationMemberAction = useCallback(
    async (prevState: unknown, formData: FormData) => {
      const result = await addOrganizationMember(formData.get('email') as string);
      await organization?.reload();
      return result;
    },
    [organization]
  );

  const [state, formAction, isPending] = useActionState(addOrganizationMemberAction, undefined);

  const isDisabled = !isLoaded || (organization?.membersCount !== undefined && organization.membersCount >= 5);

  return (
    <>
      <form action={formAction} className="flex justify-center gap-2">
        <Input name="email" type="email" placeholder="User email" />
        <LoadingButton type="submit" variant="outline" isLoading={isPending} disabled={isDisabled}>
          Add user
        </LoadingButton>
      </form>
      {state?.error && <p className="p-2 text-sm text-destructive">{state.error}</p>}
    </>
  );
}

function MemberRoleSelect({
  member,
  canChangeRole,
}: {
  member: OrganizationMembershipResource;
  canChangeRole: boolean;
}) {
  const { organization } = useOrganization();
  const [isChangingRole, setIsChangingRole] = useState(false);

  const changeRole = useCallback(
    async (newRole: string) => {
      if (organization) {
        setIsChangingRole(true);
        const updatedMemberResult = await organization.updateMember({
          userId: member.publicUserData.userId!,
          role: newRole,
        });
        console.log(updatedMemberResult);
        await organization.reload();
        setIsChangingRole(false);
      }
    },
    [member.publicUserData.userId, organization]
  );

  return (
    <div className="flex items-center gap-2">
      <Select defaultValue={member.role} disabled={!canChangeRole || isChangingRole} onValueChange={changeRole}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="org:admin">Admin</SelectItem>
          <SelectItem value="org:member">Member</SelectItem>
        </SelectContent>
      </Select>
      {isChangingRole && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
}

function RemoveMemberButton({ member, canRemove }: { member: OrganizationMembershipResource; canRemove: boolean }) {
  const { organization } = useOrganization();
  const [isRemovingMember, setIsRemovingMember] = useState(false);

  const removeMember = useCallback(async () => {
    setIsRemovingMember(true);
    await organization?.removeMember(member.publicUserData.userId!);
    await organization?.reload();
    setIsRemovingMember(false);
  }, [member.publicUserData.userId, organization]);

  return (
    <LoadingButton
      type="submit"
      variant="destructive"
      size="sm"
      onClick={removeMember}
      isLoading={isRemovingMember}
      disabled={!canRemove}>
      Remove
    </LoadingButton>
  );
}
