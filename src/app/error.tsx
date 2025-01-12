'use client';

import { useRollbar } from '@rollbar/react';
import { useEffect } from 'react';

import { ResetPage } from '@/components/ResetPage';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const rollbar = useRollbar();
  useEffect(() => {
    rollbar.error(error);
  }, [error, rollbar]);

  return <ResetPage reset={reset} />;
}
