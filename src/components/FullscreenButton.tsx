'use client';

import { Maximize2, Minus } from 'lucide-react';
import { useCallback } from 'react';

import { clientOnlyComponent } from '@/components/clientOnlyComponent';
import { useFullscreen } from '@/hooks/useFullscreen';

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface FullscreenButtonProps {
  targetElementId: string;
}

/**
 * FullscreenButton component that toggles fullscreen mode for a specified DOM element.
 * Uses the useFullscreen hook to handle cross-browser fullscreen functionality.
 */
export const FullscreenButton = clientOnlyComponent(function FullscreenButton({
  targetElementId,
}: FullscreenButtonProps) {
  const { isFullscreen, isSupported, toggle } = useFullscreen();

  /**
   * Handles the fullscreen toggle by finding the target element and toggling fullscreen mode.
   */
  const handleToggle = useCallback(async () => {
    if (!isSupported) {
      console.warn('Fullscreen API is not supported in this browser');
      return;
    }

    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
      console.error(`Element with id "${targetElementId}" not found`);
      return;
    }

    try {
      await toggle(targetElement);
    } catch (error) {
      console.error('Failed to toggle fullscreen:', error);
    }
  }, [isSupported, targetElementId, toggle]);

  // Don't render if fullscreen is not supported
  if (!isSupported) {
    return null;
  }

  const buttonContent = (
    <Tooltip>
      <TooltipTrigger
        onClick={handleToggle}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        className="flex items-center justify-center rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground">
        {isFullscreen ? <Minus className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </TooltipTrigger>
      <TooltipContent>{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</TooltipContent>
    </Tooltip>
  );

  return buttonContent;
});
