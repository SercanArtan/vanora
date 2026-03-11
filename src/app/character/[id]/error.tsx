"use client";

import { ErrorContent } from "@/features/shared/components/error-content";

export default function CharacterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorContent title="Failed to load character" error={error} reset={reset} />;
}
