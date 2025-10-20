const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen mt-6 bg-zinc-950 text-white container mx-auto animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 rounded-xl p-6 text-center relative">
            {/* Profile Image */}
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full mx-auto bg-zinc-800" />
            </div>

            {/* Name & Title */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-28 mx-auto rounded bg-zinc-800" />
              <div className="h-3 w-40 mx-auto rounded bg-zinc-800" />
              <div className="h-4 w-20 mx-auto rounded bg-zinc-800" />
            </div>

            {/* Bio */}
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded bg-zinc-800" />
              <div className="h-3 w-3/4 mx-auto rounded bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-zinc-900 rounded-xl p-6">
            <div className="h-5 w-40 mb-6 rounded bg-zinc-800" />

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 rounded bg-zinc-800" />
                  <div className="h-4 w-20 rounded bg-zinc-800" />
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mt-6">
              <div className="h-4 w-16 mb-3 rounded bg-zinc-800" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 w-16 rounded bg-zinc-800" />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <div className="h-10 w-32 rounded-lg bg-zinc-800" />
              <div className="h-10 w-32 rounded-lg bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-10 bg-zinc-900 rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-28 rounded bg-zinc-800" />
          ))}
        </div>

        {/* Tab Content Placeholder */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 rounded bg-zinc-800" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
