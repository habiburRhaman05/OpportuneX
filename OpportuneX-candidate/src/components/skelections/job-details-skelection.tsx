export default function JobDetailsSkeleton() {
  return (
    <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="border-b border-blue-400/20 pb-12">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-blue-500/10 border border-blue-400/20 animate-pulse" />

            {/* Title & Company */}
            <div className="flex-1">
              <div className="h-8 bg-blue-500/10 border border-blue-400/20 rounded-lg mb-3 w-3/4 animate-pulse" />
              <div className="h-6 bg-blue-500/10 border border-blue-400/20 rounded-lg mb-4 w-1/3 animate-pulse" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-blue-500/10 border border-blue-400/20 rounded-full w-24 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-blue-500/10 border border-blue-400/20 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl p-8"
              >
                <div className="h-8 bg-blue-500/20 rounded-lg mb-4 w-1/3 animate-pulse" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="h-4 bg-blue-500/10 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="w-full backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl p-4 flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-blue-500/10 border border-blue-400/20 rounded-lg animate-pulse"
                />
              ))}
            </div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 rounded-xl p-6"
              >
                <div className="h-6 bg-blue-500/20 rounded-lg mb-4 w-2/3 animate-pulse" />
                <div className="space-y-2">
                  {[1, 2].map((j) => (
                    <div
                      key={j}
                      className="h-8 bg-blue-500/10 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
