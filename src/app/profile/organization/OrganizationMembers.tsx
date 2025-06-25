import { useOrganization, useUser } from '@clerk/nextjs';
import { ClerkPaginatedResponse, OrganizationMembershipResource } from '@clerk/types';
import { Loader2 } from 'lucide-react';
import React, { Suspense, useActionState, useCallback, useMemo, useState } from 'react';

import { addOrganizationMember } from '@/actions/organizations';
import { Loading } from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/buttons/button';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
        <TableCaption>List of members</TableCaption>
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
  const currentUserMembership = users.data.find(m => m.publicUserData?.userId === user?.id);
  const isAdmin = currentUserMembership?.role === 'org:admin';
  const otherAdmins = users.data.filter(m => m.role === 'org:admin' && m.publicUserData?.userId !== user?.id);

  const sortedMembers = users.data.toSorted((a, b) => {
    // Sort members: current user first, then others alphabetically by identifier
    if (a.publicUserData?.userId === user?.id) return -1;
    if (b.publicUserData?.userId === user?.id) return 1;
    return a.publicUserData ? a.publicUserData?.identifier.localeCompare(b.publicUserData?.identifier ?? '') : 0;
  });

  return (
    <>
      {sortedMembers.map(member => {
        const isCurrentUser = member.publicUserData?.userId === user?.id;
        const canRemove = isAdmin && (!isCurrentUser || otherAdmins.length > 0);
        const canChangeRole = isAdmin && (!isCurrentUser || otherAdmins.length > 0);

        return (
          <TableRow key={member.id}>
            <TableCell>
              {member.publicUserData?.identifier}
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
              <RemoveMemberButton member={member} canRemove={canRemove && !isCurrentUser} />
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
        <Input name="email" type="email" placeholder="User email" disabled={isDisabled} />
        <LoadingButton type="submit" isLoading={isPending} disabled={isDisabled}>
          Add member
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
  const { user } = useUser();
  const isCurrentUser = member.publicUserData?.userId === user?.id;
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingNewRole, setPendingNewRole] = useState<string | null>(null);

  const changeRole = useCallback(
    async (newRole: string) => {
      if (organization) {
        setIsChangingRole(true);
        await organization.updateMember({
          userId: member.publicUserData!.userId!,
          role: newRole,
        });
        await organization.reload();
        setIsChangingRole(false);
      }
    },
    [member.publicUserData, organization]
  );

  const handleRoleChange = (newRole: string) => {
    if (isCurrentUser && member.role === 'org:admin' && newRole !== 'org:admin') {
      setPendingNewRole(newRole);
      setShowWarningDialog(true);
    } else {
      changeRole(newRole);
    }
  };

  const handleConfirmRoleChange = () => {
    if (pendingNewRole) {
      changeRole(pendingNewRole);
      setShowWarningDialog(false);
      setPendingNewRole(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={member.role} disabled={!canChangeRole || isChangingRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="org:admin">Admin</SelectItem>
          <SelectItem value="org:member">Member</SelectItem>
        </SelectContent>
      </Select>
      {isChangingRole && <Loader2 className="h-4 w-4 animate-spin" />}

      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warning: Changing Role</DialogTitle>
            <DialogDescription>
              You are about to change your role from Admin to Member. This will remove your access to organization
              administration functions. Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWarningDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmRoleChange}>
              Confirm Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RemoveMemberButton({ member, canRemove }: { member: OrganizationMembershipResource; canRemove: boolean }) {
  const { organization } = useOrganization();
  const [isRemovingMember, setIsRemovingMember] = useState(false);

  const removeMember = useCallback(async () => {
    setIsRemovingMember(true);
    await organization?.removeMember(member.publicUserData!.userId!);
    await organization?.reload();
    setIsRemovingMember(false);
  }, [member.publicUserData, organization]);

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
