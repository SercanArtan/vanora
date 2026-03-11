export function DetailLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 pb-8 max-w-6xl">
      <div className="w-full max-w-4xl mx-auto min-h-[50vh] pb-16 animate-pulse">
        <div className="pt-20 pb-8">
          <div className="flex flex-col items-center mb-12">
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-6" />
            <div className="h-10 w-64 bg-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="space-y-10 px-2 md:px-0">
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
          <div>
            <div className="h-4 w-28 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
