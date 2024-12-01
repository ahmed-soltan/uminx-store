import { Skeleton } from "design-system/components/ui/skeleton";

export default function SkeletonSearchCard() {
  return (
    <div className="flex items-center space-x-4 w-full">
      <Skeleton className="h-12 w-12 bg-slate-200" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 full bg-slate-200" />
      </div>
    </div>
  );
}
