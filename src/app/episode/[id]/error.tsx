"use client";

import { ErrorContent } from "@/features/shared/components/error-content";

export default function EpisodeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorContent title="Failed to load episode" error={error} reset={reset} />;
}
