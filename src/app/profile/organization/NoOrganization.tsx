'use client';

import { useUser } from '@clerk/nextjs';
import { useActionState, useCallback } from 'react';

import { createNewOrganizerRequest } from '@/actions/waitlist';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl } from '@/components/ui/forms/FormControl';
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
import { Textarea } from '@/components/ui/textarea';

export function NoOrganization() {
  const { user } = useUser();

  const createNewOrganizerRequestAction = useCallback(
    async (prevState: unknown, formData: FormData) => {
      await createNewOrganizerRequest(formData);
      user?.reload();
    },
    [user]
  );

  const [, formAction, isPending] = useActionState(createNewOrganizerRequestAction, undefined);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <Alert variant="info">
        <AlertTitle>You have no organization</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-4">
            <li>Please fill in the form below and we&apos;ll create an organization for you or;</li>
            <li>if your LGS already has an organization, please ask your administrator to assign you to it.</li>
          </ul>
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Become an organizer</CardTitle>
        </CardHeader>
        <CardContent>
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
              {({ id }) => (
                <Input id={id} type="text" name="website" placeholder="Website" required autoComplete="off" />
              )}
            </FormControl>
            <FormControl
              label="Location"
              hint="This is the location of your game store. Example: Prague, Czech Republic">
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
            <FormControl label="Message" hint="This is the name of your game store.">
              {({ id }) => <Textarea id={id} name="message" placeholder="Message" autoComplete="off" />}
            </FormControl>

            <div className="col-start-1">
              <LoadingButton isLoading={isPending} type="submit" className="w-fit">
                Submit
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
