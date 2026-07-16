import { Skeleton } from "../ui/skeleton.js";

export const LoadingState = ({ rows = 4 }: { rows?: number }) => (
  <div className="space-y-4">
    <Skeleton className="h-28" />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-24" />
      ))}
    </div>
  </div>
);
