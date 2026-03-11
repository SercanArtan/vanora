"use client";

interface ErrorContentProps {
  title?: string;
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorContent({ title = "Something went wrong!", error, reset }: ErrorContentProps) {
  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-500 mb-8">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
