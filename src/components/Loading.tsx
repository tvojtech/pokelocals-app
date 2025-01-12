import { Skeleton } from '@/components/ui/skeleton';

export function Loading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[calc(100%-4rem)]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[calc(100%-4rem)]" />
    </div>
  );
}
