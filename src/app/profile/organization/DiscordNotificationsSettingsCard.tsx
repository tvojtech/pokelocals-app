import { useOrganization } from '@clerk/nextjs';
import { useActionState, useCallback, useState } from 'react';

import { updateDiscordWebhook } from '@/actions/organizations';
import { Loading } from '@/components/Loading';
import { Button } from '@/components/ui/buttons/button';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DiscordWebhook {
  url: string;
  name: string;
}

export function DiscordNotificationsSettingsCard() {
  const { organization, isLoaded, membership } = useOrganization();
  const discordWebhooks = (organization?.publicMetadata.discordWebhooks ?? []) as DiscordWebhook[];
  const [value, setValue] = useState(discordWebhooks);

  const updateDiscordWebhookAction = useCallback(async () => {
    const result = await updateDiscordWebhook(value);
    await organization?.reload();
    return result;
  }, [organization, value]);

  const [, formAction, isPending] = useActionState(updateDiscordWebhookAction, undefined);

  const isDirty =
    value.length !== discordWebhooks.length ||
    value.some(({ name, url }, idx) => name !== discordWebhooks[idx].name || url !== discordWebhooks[idx].url);

  if (!isLoaded) {
    return <Loading />;
  }

  if (membership?.role !== 'org:admin') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Discord notifications
          <Button onClick={() => setValue(old => [...old, { name: '', url: '' }])}>Add webhook</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} onReset={() => setValue(discordWebhooks)} className="w-full space-y-2">
          <Table>
            <TableCaption>
              {/* <p >
                Example: https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz
              </p> */}
              <p>Webhook URL is needed if you want to send notifications about new tournament to a Discord server.</p>
              <p>Ask Administrator of your Discord server to create a webhook and provide you with the URL.</p>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {value.map(({ name, url }, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Input
                      type="text"
                      value={name}
                      onChange={evt => {
                        setValue(old => [
                          ...old.slice(0, idx),
                          { ...old[idx], name: evt.target.value },
                          ...old.slice(idx + 1),
                        ]);
                      }}
                      placeholder="Name of the webhook"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      pattern="https://discord.com/api/webhooks/.*"
                      value={url}
                      onChange={evt => {
                        setValue(old => [
                          ...old.slice(0, idx),
                          { ...old[idx], url: evt.target.value },
                          ...old.slice(idx + 1),
                        ]);
                      }}
                      placeholder="Discord webhook URL"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => setValue(old => old.filter((_, i) => i !== idx))}
                      size="sm">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {value.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No webhooks
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {isDirty && (
            <div className="flex items-center gap-2">
              <LoadingButton type="submit" isLoading={isPending}>
                Save
              </LoadingButton>
              <Button type="reset" variant="secondary">
                Cancel
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
