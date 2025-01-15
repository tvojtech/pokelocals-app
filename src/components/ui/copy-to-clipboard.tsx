'use client';

import { Clipboard, ClipboardCheck } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CopyToClipboardButtonProps {
  textToCopy: string;
  size?: number;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  textToCopy,
  size,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [textToCopy]);

  return (
    <div className="flex items-center space-x-2">
      {isCopied && <p className="text-green-700">Copied</p>}
      <div
        role="button"
        onClick={handleCopy}
        aria-label={isCopied ? 'Copied' : 'Copy to clipboard'}
        title={isCopied ? 'Copied' : 'Copy to clipboard'}
        className={cn(
          'flex items-center space-x-2',
          buttonVariants({ variant: 'outline', size: 'icon' })
        )}>
        {isCopied ? <ClipboardCheck size={size} /> : <Clipboard size={size} />}
      </div>
    </div>
  );
};
