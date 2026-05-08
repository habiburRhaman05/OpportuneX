export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-white/10 rounded" />
      <div className="h-4 bg-white/10 rounded w-5/6" />
      <div className="flex gap-2 pt-4">
        <div className="h-3 bg-white/10 rounded-full flex-1" />
        <div className="h-3 bg-white/10 rounded-full flex-1" />
      </div>
    </div>
  )
}

export function SkeletonJobCard() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-400/20 p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-6 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
        </div>
        <div className="w-8 h-8 bg-white/10 rounded-full" />
      </div>
      <div className="space-y-2 py-4 border-y border-white/10">
        <div className="h-4 bg-white/10 rounded" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
      </div>
      <div className="h-4 bg-white/10 rounded w-1/3" />
    </div>
  )
}

export function SkeletonTestimonial() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-400/20 p-8 space-y-4 animate-pulse">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-white/10 rounded" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded" />
        <div className="h-4 bg-white/10 rounded" />
        <div className="h-4 bg-white/10 rounded w-3/4" />
      </div>
      <div className="flex gap-3 pt-4 border-t border-white/10">
        <div className="w-12 h-12 bg-white/10 rounded-full flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-white/10 rounded w-1/2" />
          <div className="h-3 bg-white/10 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonCompanyLogo() {
  return (
    <div className="w-48 h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
      <div className="w-16 h-16 bg-white/10 rounded" />
    </div>
  )
}
