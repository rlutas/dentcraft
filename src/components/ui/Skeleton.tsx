type SkeletonProps = {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[var(--color-border-light)] rounded-lg ${className}`}
    />
  )
}

// Preset variants
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="card p-6">
      <Skeleton className="h-40 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <SkeletonText lines={2} />
    </div>
  )
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-8 w-8', md: 'h-12 w-12', lg: 'h-16 w-16' }
  return <Skeleton className={`${sizes[size]} rounded-full`} />
}
