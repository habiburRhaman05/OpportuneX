import { Skeleton } from "../ui/skeleton";

// Skeleton Loader
export function RecruiterProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <header className="bg-gradient-primary text-primary-foreground relative">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-64 rounded-md" />
              <Skeleton className="h-5 w-40 rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
