import { Loader2 } from 'lucide-react';

import { Button, ButtonProps } from './button';

export function LoadingButton({ isLoading, ...props }: ButtonProps & { isLoading: boolean }) {
  if (!isLoading) {
    return <Button {...props} />;
  }
  return (
    <Button {...props} disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {props.children}
    </Button>
  );
}
