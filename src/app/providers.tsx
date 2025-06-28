'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider as RollbarProvider } from '@rollbar/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from '@/components/ui/tooltip';
import { PostHogProvider } from '@/posthog';
import { clientConfig } from '@/rollbar/client';

function makeQueryClient() {
  return new QueryClient({});
}

let clientQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!clientQueryClient) clientQueryClient = makeQueryClient();
    return clientQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
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
