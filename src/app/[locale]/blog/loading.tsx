import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

function SkeletonBlogPost() {
  return (
    <div className="card p-6">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-4 w-1/4 mb-2" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <SkeletonText lines={3} />
    </div>
  )
}

export default function Loading() {
  return (
    <div className="section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlogPost key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
