import { ChevronsUpDownIcon } from 'lucide-react';

import { Tournament } from '@/actions/tournament';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { PlayerMatches } from '../tournaments/[id]/pairings/my/PlayerMatches';

export function PlayerMatchesPopover({
  tournament,
  playerId,
  anonymize = true,
}: {
  tournament: Tournament;
  playerId: string;
  anonymize: boolean;
}) {
  const pod = tournament.pods.find(pod => pod.subgroups.some(subgroup => subgroup.players.includes(playerId)));

  if (!pod) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <ChevronsUpDownIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="w-full" align="start">
        <PlayerMatches player={tournament.players[playerId]} pod={pod} tournament={tournament} anonymize={anonymize} />
      </PopoverContent>
    </Popover>
  );
}
