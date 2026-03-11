import Image from "next/image";
import { getCharacters } from "@/features/character/api";
import { CharacterGrid } from "@/features/character/components/character-grid";
import { CharacterFilters } from "@/features/character/components/character-filters";
import { CharacterFiltersSchema } from "@/features/character/schemas";
import type { CharacterFilters as FiltersType } from "@/features/character/types";

import heroImage from "@/assets/image.png";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Home({ searchParams }: Props) {
  const parsed = CharacterFiltersSchema.safeParse(searchParams);
  const filters: FiltersType = parsed.success ? parsed.data : {};

  const response = await getCharacters(filters);
  const initialCharacters = response?.results || [];
  const initialInfo = response?.info || null;

  return (
    <div className="container mx-auto px-4 pb-8 max-w-6xl">
      <div className="flex justify-center mt-hero-top mb-10 max-w-xl w-full mx-auto">
        <Image
          src={heroImage}
          alt="Rick and Morty"
          width={800}
          height={250}
          unoptimized
          priority
          className="w-full h-auto object-contain"
        />
      </div>

      <CharacterFilters />

      <CharacterGrid
        initialCharacters={initialCharacters}
        initialInfo={initialInfo}
        filters={filters}
      />
    </div>
  );
}
