'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider as RollbarProvider } from '@rollbar/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from '@/components/ui/tooltip';
import { PostHogProvider } from '@/posthog';
import { clientConfig } from '@/rollbar/client';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <PostHogProvider>
          <RollbarProvider config={clientConfig}>
            <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
          </RollbarProvider>
        </PostHogProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
