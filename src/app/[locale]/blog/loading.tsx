import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

function SkeletonBlogPost() {
  return (
    <div className="card overflow-hidden">
      {/* Full-bleed image placeholder */}
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      {/* Content area */}
      <div className="p-6">
        {/* Meta row */}
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
        {/* Title */}
        <Skeleton className="h-6 w-3/4 mb-3" />
        {/* Excerpt */}
        <SkeletonText lines={3} />
        {/* Author */}
        <div className="flex items-center gap-3 pt-4 mt-4 border-t border-[var(--color-border)]">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Skeleton Hero Section */}
      <section className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-3 mb-12">
            <Skeleton className="h-4 w-14 bg-white/10" />
            <span className="text-white/20">/</span>
            <Skeleton className="h-4 w-10 bg-white/10" />
          </div>

          <div className="max-w-4xl">
            {/* Badge skeleton */}
            <Skeleton className="h-4 w-40 mb-6 bg-white/10" />
            {/* Title skeleton */}
            <Skeleton className="h-14 md:h-18 w-48 mb-8 bg-white/10" />
            {/* Subtitle skeleton */}
            <Skeleton className="h-6 w-96 max-w-full bg-white/10" />
          </div>

          {/* Decorative line skeleton */}
          <div className="mt-16 flex items-center gap-6">
            <Skeleton className="w-24 h-px bg-white/10" />
            <Skeleton className="h-4 w-64 bg-white/10" />
          </div>
        </div>
      </section>

      {/* Skeleton Blog Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlogPost key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
