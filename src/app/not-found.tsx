import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
