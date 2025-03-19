'use client';

import { useLayoutEffect, useState } from 'react';

export function CurrentYear() {
  const [time, setTime] = useState<number | null>(null);
  useLayoutEffect(() => {
    setTime(new Date().getFullYear());
  }, []);
  return time;
}
