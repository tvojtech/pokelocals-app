'use client';

import { useActionState, useCallback, useState } from 'react';

import { createNewOrganizerRequest } from '@/app/actions/waitlist';
import { Alert } from '@/components/Alert';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function NewOrganizationForm() {
  const [success, setSuccess] = useState(false);
  const createNewOrganizerRequestAction = useCallback(async (prevState: unknown, formData: FormData) => {
    const result = await createNewOrganizerRequest(formData);
    if (result.success) {
      setSuccess(true);
    }
  }, []);

  const [, formAction, isPending] = useActionState(createNewOrganizerRequestAction, undefined);

  if (success) {
    return (
      <Alert type="info" message="Thank you for joining! You will be notified when your application is approved." />
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold">Become an organizer</h2>
      <form action={formAction} className="space-y-2">
        <Input type="text" name="name" placeholder="Organization name" required autoComplete="off" />
        <Input
          type="text"
          name="website"
          placeholder="Website (ex.: https://www.example.com)"
          required
          autoComplete="off"
        />
        <Input type="text" name="city" placeholder="City" autoComplete="off" />
        <Input type="text" name="country" placeholder="Country" autoComplete="off" />
        <Select name="avg_tournament_size">
          <SelectTrigger>
            <SelectValue placeholder="Select average tournament size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Average tournament size</SelectLabel>
              <SelectItem value="0_20">0 - 20</SelectItem>
              <SelectItem value="21_40">21 - 40</SelectItem>
              <SelectItem value="41_60">41 - 60</SelectItem>
              <SelectItem value="61_100">61 - 100</SelectItem>
              <SelectItem value="101_200">101 - 200</SelectItem>
              <SelectItem value="200_">200+</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <LoadingButton isLoading={isPending} type="submit">
          Submit
        </LoadingButton>
      </form>
    </>
  );
}
