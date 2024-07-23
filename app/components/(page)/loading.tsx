import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      <div className="flex gap-6 mt-1.5">
        <Skeleton className="w-20 h-3" />
        <Skeleton className="w-20 h-3" />
      </div>
      <div className="mt-6">
        <Skeleton className="w-24 h-8" />
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-6 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-6 h-4" />
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-6 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-6 h-4" />
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-6 h-4" />
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-6 h-4" />
      </div>
      <div className="mt-8 flex gap-x-16 gap-y-4 flex-wrap">
        <Skeleton className="w-5/12 h-4" />
        <Skeleton className="w-5/12 h-4" />
        <Skeleton className="w-5/12 h-4" />
        <Skeleton className="w-5/12 h-4" />
      </div>
      <div className="mt-14 flex flex-col gap-y-1.5 flex-wrap">
        <Skeleton className="w-36 h-10" />
        <Skeleton className="w-full h-44" />
      </div>
    </>
  )
}
