import { useState } from 'react';

import { Button } from '@/components/ui/buttons/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function DecklistContent({
  decklist,
  onDecklistChange,
  disabled,
}: {
  decklist?: string;
  onDecklistChange: (decklist: string) => void;
  disabled: boolean;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  return (
    <>
      <div className="hidden md:block">
        <Textarea
          className="h-full grow"
          value={decklist ?? ''}
          onChange={e => onDecklistChange(e.target.value)}
          placeholder="Paste your decklist here..."
          readOnly={disabled}
        />
      </div>
      <div className="relative md:hidden">
        {/* <div className={cn(isFullscreen && 'absolute bottom-0 left-0 right-0 top-0 z-50 bg-background')}> */}
        <Textarea
          className={cn(isFullscreen && 'fixed bottom-0 left-0 right-0 top-0 z-40 bg-background')}
          value={decklist ?? ''}
          onChange={e => onDecklistChange(e.target.value)}
          placeholder="Paste your decklist here..."
          rows={isFullscreen ? undefined : 4}
          onFocus={() => setIsFullscreen(true)}
          onBlur={() => setIsFullscreen(false)}
        />
        <Button
          variant="outline"
          className={cn(isFullscreen ? 'fixed right-8 top-8 z-50' : 'hidden')}
          onClick={() => setIsFullscreen(false)}>
          Close
        </Button>
        {/* </div> */}
      </div>
    </>
  );
}
