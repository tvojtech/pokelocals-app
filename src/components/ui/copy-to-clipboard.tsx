'use client';

import { Check, Clipboard } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface CopyToClipboardButtonProps {
  textToCopy: string;
  size?: number;
  tooltip?: string;
  icon?: React.ReactNode;
}

export function CopyToClipboardButton({
  textToCopy,
  size,
  tooltip = 'Copy to clipboard',
  icon,
}: CopyToClipboardButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [textToCopy]);

  return (
    <Tooltip>
      <TooltipTrigger onClick={handleCopy} aria-label={isCopied ? 'Copied' : tooltip}>
        {isCopied ? <Check size={size} /> : (icon ?? <Clipboard size={size} />)}
      </TooltipTrigger>
      <TooltipContent>{isCopied ? 'Copied' : tooltip}</TooltipContent>
    </Tooltip>
  );
}
