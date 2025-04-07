import { Info } from 'lucide-react';
import { useId } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '../popover';

export function FormControl({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint: React.ReactNode;
  required?: boolean;
  children: ({ id }: { id: string }) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-2">
        <label htmlFor={id} className="flex items-center gap-2 leading-4">
          {label}
          {hint && (
            <Popover>
              <PopoverTrigger>
                <Info className="h-4 w-4" />
              </PopoverTrigger>
              <PopoverContent side="top">{hint}</PopoverContent>
            </Popover>
          )}
        </label>
        <span className="text-sm text-muted-foreground">{required ? 'Required' : 'Optional'}</span>
      </div>
      {children({ id })}
    </div>
  );
}
