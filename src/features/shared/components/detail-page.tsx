import type { ReactNode } from "react";
import type { Metadata } from "next";
import { parseId } from "@/lib/utils";

export type DetailPageParams = {
  params: { id: string };
};

export function DetailPageWrapper({ children }: { children: ReactNode }) {
  return <div className="container mx-auto px-4 pb-8 max-w-6xl">{children}</div>;
}

export function createDetailMetadata<T>(
  entityName: string,
  fetcher: (id: number) => Promise<T | null>,
  buildMeta: (entity: T) => Metadata
) {
  return async function generateMetadata({ params }: DetailPageParams): Promise<Metadata> {
    const id = parseId(params.id);
    const entity = await fetcher(id);
    if (!entity) return { title: `${entityName} Not Found` };
    return buildMeta(entity);
  };
}
