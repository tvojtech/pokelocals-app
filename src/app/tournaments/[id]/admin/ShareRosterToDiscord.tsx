'use client';

import { useOrganization } from '@clerk/nextjs';
import { useToggle } from '@uidotdev/usehooks';
import { useId, useState } from 'react';

import { sendRosterToDiscord } from '@/actions/tournament';
import { LoadingButton } from '@/components/ui/buttons/loading-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function ShareRosterToDiscord({ rosterUrl, tournamentName }: { rosterUrl: string; tournamentName?: string }) {
  const { isLoaded, organization } = useOrganization();
  const discordWebhooks = (organization?.publicMetadata.discordWebhooks ?? []) as { name: string; url: string }[];
  const [selectedWebhooks, setSelectedWebhooks] = useState<string[]>(discordWebhooks.map(webhook => webhook.url));
  const [isOpen, toggleOpen] = useToggle();
  const [isLoading, setIsLoading] = useState(false);
  const id = useId();

  const handleClick = async () => {
    setIsLoading(true);
    await sendRosterToDiscord(selectedWebhooks, {
      username: organization?.name ?? 'POKÉ LOCALS',
      title: tournamentName ? 'Roster for ' + tournamentName : 'Roster',
      description: rosterUrl,
    });
    setIsLoading(false);
    toggleOpen(false);
  };

  if (!isLoaded || !organization) {
    return null;
  }

  if (discordWebhooks.length === 0) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={toggleOpen}>
      <PopoverTrigger>
        <Tooltip>
          <TooltipTrigger aria-label="Share roster to Discord" asChild>
            <img src="/images/discord-icon-svgrepo-com.svg" alt="Discord" className="h-6 w-6" role="button" />
          </TooltipTrigger>
          <TooltipContent>Share roster to Discord</TooltipContent>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4">
          {discordWebhooks.map(webhook => (
            <div key={webhook.url}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${id}-${webhook.url}`}
                  checked={selectedWebhooks.includes(webhook.url)}
                  onCheckedChange={checked =>
                    setSelectedWebhooks(prev =>
                      checked ? [...prev, webhook.url] : prev.filter(url => url !== webhook.url)
                    )
                  }
                />
                <label
                  htmlFor={`${id}-${webhook.url}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {webhook.name}
                </label>
              </div>
            </div>
          ))}
          <LoadingButton onClick={handleClick} disabled={selectedWebhooks.length === 0} isLoading={isLoading}>
            Share
          </LoadingButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
