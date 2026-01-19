import { Skeleton, SkeletonText, SkeletonAvatar } from '@/components/ui/Skeleton'

function SkeletonTeamMember() {
  return (
    <div className="card p-6 text-center">
      <div className="flex justify-center mb-4">
        <SkeletonAvatar size="lg" />
      </div>
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
      <SkeletonText lines={2} />
    </div>
  )
}

export default function Loading() {
  return (
    <div className="section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonTeamMember key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
