import { ClockPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const TimeExtensionButton = () => (
  <>
    <p className="text-xs">+0 min</p>
    <Button variant="secondary" className="m-2 h-8 w-8">
      <ClockPlus />
    </Button>
  </>
);
