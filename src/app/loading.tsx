export default function Loading() {
  return (
    <div className="container mx-auto px-4 pb-8 max-w-6xl animate-pulse">
      <div className="flex justify-center mt-[26px] mb-10">
        <div className="w-hero max-w-full h-[200px] bg-gray-200 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-section w-full max-w-grid mx-auto">
        <div className="h-10 bg-gray-200 rounded-md" />
        <div className="h-10 bg-gray-200 rounded-md" />
        <div className="h-10 bg-gray-200 rounded-md" />
        <div className="h-10 bg-gray-200 rounded-md" />
      </div>

      <div className="w-full max-w-grid mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-card">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-[246px] bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
