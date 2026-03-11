"use client";

import { ErrorContent } from "@/features/shared/components/error-content";

export default function LocationError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorContent title="Failed to load location" error={error} reset={reset} />;
}
