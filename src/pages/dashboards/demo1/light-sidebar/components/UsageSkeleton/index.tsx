import { Skeleton } from "@/components/ui/skeleton";

export default function UsageSkeleton() {
  return (
    <div className="p-6 rounded-[20px] border-2">
      {/* Order ID Skeleton */}
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>

      {/* Usage Skeletons */}
      <div className="mt-6 flex flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Icon */}
            <Skeleton className="size-[36px] rounded-[6px]" />

            {/* Text and Progress */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <div className="flex items-center gap-4">
                <div className="relative flex-1 h-2 rounded-full bg-muted">
                  <div className="absolute top-0 left-0 h-full rounded-full bg-muted-foreground w-1/2" />
                </div>
                <Skeleton className="w-[30px] h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
