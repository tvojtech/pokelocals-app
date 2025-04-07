'use client';

import { Info } from 'lucide-react';
import { useActionState, useCallback, useId, useState } from 'react';

import { createNewOrganizerRequest } from '@/app/actions/waitlist';
import { Alert } from '@/components/Alert';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
      <Alert
        type="info"
        title="You have no organization"
        message={
          <ul className="list-disc pl-4">
            <li>Please fill in the form below and we&apos;ll create an organization for you or;</li>
            <li>if your LGS already has an organization, please ask your administrator to assign you to it.</li>
          </ul>
        }
      />
      <h2 className="text-xl font-bold">Become an organizer</h2>
      <form action={formAction} className="grid gap-2 gap-y-4 sm:grid-cols-1 md:grid-cols-2">
        <FormControl label="Organization name" hint="This is the name of your game store." required>
          {({ id }) => (
            <Input id={id} type="text" name="name" placeholder="Organization name" required autoComplete="off" />
          )}
        </FormControl>
        <FormControl
          label="Website"
          hint={
            <>
              <p>This is the website of your game store.</p>
              <p>If you don&apos;t have one, please send us link to your league on www.pokemon.com.</p>
              <p>Example: https://www.pokemon.com/us/play-pokemon/pokemon-events/leagues/6237187</p>
            </>
          }
          required>
          {({ id }) => <Input id={id} type="text" name="website" placeholder="Website" required autoComplete="off" />}
        </FormControl>
        <FormControl label="Location" hint="This is the location of your game store. Example: Prague, Czech Republic">
          {({ id }) => <Input id={id} type="text" name="location" placeholder="Location" autoComplete="off" />}
        </FormControl>
        <FormControl
          label="Average tournament size"
          hint="This is the average player count in your tournaments."
          required>
          {({ id }) => (
            <Select name="avg_tournament_size" required>
              <SelectTrigger id={id}>
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
          )}
        </FormControl>

        <div className="col-start-1">
          <LoadingButton isLoading={isPending} type="submit" className="w-fit">
            Submit
          </LoadingButton>
        </div>
      </form>
    </>
  );
}

function FormControl({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint: React.ReactNode;
  required?: boolean;
  children: ({ id }: { id: string }) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-2">
        <label htmlFor={id} className="flex items-center gap-2 leading-4">
          {label}
          {hint && (
            <Popover>
              <PopoverTrigger>
                <Info className="h-4 w-4" />
              </PopoverTrigger>
              <PopoverContent side="top">
                <p>{hint}</p>
              </PopoverContent>
            </Popover>
          )}
        </label>
        <span className="text-sm text-muted-foreground">{required ? 'Required' : 'Optional'}</span>
      </div>
      {children({ id })}
    </div>
  );
}
