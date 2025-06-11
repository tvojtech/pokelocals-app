'use client';

import { useUser } from '@clerk/nextjs';
import { useActionState } from 'react';
import { toast } from 'sonner';

import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { FormControl } from '@/components/ui/forms/FormControl';
import { Input } from '@/components/ui/input';
import { updatePlayerProfile } from '@/features/profile/actions';

export function PlayerProfileForm() {
  const { user } = useUser();

  const updatePofileAction = async (prevState: unknown, formData: FormData) => {
    const result = await updatePlayerProfile({
      pokemonId: formData.get('pokemonId') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      birthDate: formData.get('birthDate') as string,
    });

    if (result.success) {
      toast.success('Profile updated successfully');
    } else if (result.error) {
      toast.error(result.error, { duration: 10000 });
    }

    return result;
  };

  const [, formAction, isPending] = useActionState(updatePofileAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <FormControl label="Pokémon ID" hint="This is your Pokémon ID" required>
        {({ id }) => (
          <Input
            id={id}
            name="pokemonId"
            defaultValue={(user?.publicMetadata?.pokemonId as string) ?? ''}
            type="text"
            placeholder="Enter your Pokémon ID"
            required
            readOnly={!!user?.publicMetadata?.pokemonId}
          />
        )}
      </FormControl>
      <FormControl label="First name" hint="This is your first name" required>
        {({ id }) => (
          <Input
            id={id}
            name="firstName"
            defaultValue={user?.firstName ?? ''}
            type="text"
            placeholder="Enter your first name"
            required
          />
        )}
      </FormControl>
      <FormControl label="Last name" hint="This is your last name" required>
        {({ id }) => (
          <Input
            id={id}
            name="lastName"
            defaultValue={user?.lastName ?? ''}
            type="text"
            placeholder="Enter your last name"
            required
          />
        )}
      </FormControl>
      <FormControl label="BirthDate" hint="This is your birthDate" required>
        {({ id }) => (
          <Input
            id={id}
            name="birthDate"
            defaultValue={(user?.publicMetadata?.birthDate as string) ?? ''}
            type="date"
            placeholder="Enter your birthDate"
            required
            readOnly={!!user?.publicMetadata?.birthDate}
          />
        )}
      </FormControl>
      <LoadingButton isLoading={isPending} type="submit">
        Update profile
      </LoadingButton>
    </form>
  );
}
