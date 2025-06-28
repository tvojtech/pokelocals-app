'use client';

import { format } from 'date-fns';
import { useActionState, useState } from 'react';
import { toast } from 'sonner';

import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/forms/FormControl';
import { Input } from '@/components/ui/input';
import { upsertPlayerProfile } from '@/features/profile/actions';
import { useUserProfile } from '@/features/profile/hooks/useUserProfile';

import { useMyPokemonId } from '../hooks';

export function PlayerProfileForm() {
  const { myId } = useMyPokemonId();
  const { profile, refetchProfile } = useUserProfile();

  const updatePofileAction = async (prevState: unknown, formData: FormData) => {
    const result = await upsertPlayerProfile({
      pokemonId: formData.get('pokemonId') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      birthDate: new Date(formData.get('birthDate') as string),
    });

    if (result.success) {
      toast.success('Profile updated successfully');
    } else if (result.error) {
      toast.error(result.error, { duration: 10000 });
    }
    refetchProfile();

    return result;
  };

  const [, formAction, isPending] = useActionState(updatePofileAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <FormControl label="Pokémon ID" hint="This is your Pokémon ID" required>
        {({ id }) => (
          <Input
            key={profile?.pokemonId ?? myId ?? ''}
            id={id}
            name="pokemonId"
            defaultValue={profile?.pokemonId ?? myId ?? ''}
            type="text"
            placeholder="Enter your Pokémon ID"
            required
            readOnly={!!profile?.pokemonId}
            disabled={!!profile?.pokemonId}
          />
        )}
      </FormControl>
      <FormControl label="First name" hint="This is your first name" required>
        {({ id }) => (
          <Input
            id={id}
            name="firstName"
            defaultValue={profile?.firstName ?? ''}
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
            defaultValue={profile?.lastName ?? ''}
            type="text"
            placeholder="Enter your last name"
            required
          />
        )}
      </FormControl>
      <FormControl label="Birth date" hint="This is your birth date" required>
        {({ id }) => (
          <DateInput
            key={profile?.birthDate ? profile.birthDate.toISOString() : ''}
            id={id}
            name="birthDate"
            defaultValue={profile?.birthDate ? profile.birthDate.toISOString() : ''}
            readOnly={!!profile?.birthDate}
          />
        )}
      </FormControl>
      <LoadingButton isLoading={isPending} type="submit">
        Update profile
      </LoadingButton>
    </form>
  );
}

function DateInput({
  id,
  name,
  readOnly,
  defaultValue,
}: {
  id: string;
  name: string;
  readOnly: boolean;
  defaultValue: string;
}) {
  const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);

  if (readOnly) {
    return <Input id={id} name={name} value={date ? format(date, 'PPP') : ''} type="text" readOnly disabled />;
  }

  return (
    <>
      <Input id={id} name={name} value={date?.toISOString() ?? ''} type="hidden" />
      <Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown" disabled={readOnly} />
    </>
  );
}
