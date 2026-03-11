import Image from "next/image";
import { DetailLayout, SectionHeading } from "@/features/shared/components/detail-layout";
import { InfoRow } from "@/features/shared/components/info-row";
import type { Character } from "../types";
import type { Episode } from "@/features/episode/types";

interface CharacterDetailProps {
  character: Character;
  episodes: Episode[];
}

export function CharacterDetail({ character, episodes }: CharacterDetailProps) {
  const locationId = extractId(character.location.url);
  const locationHref = locationId ? `/location/${locationId}` : undefined;

  return (
    <DetailLayout>
      <div className="pt-10 pb-8">
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-[6px] border-[#f0f2f5] shadow-sm mb-6">
            <Image
              src={character.image}
              alt={`${character.name} - ${character.species}`}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 192px, 256px"
            />
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 text-center">
            {character.name}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 px-2 md:px-0">
        <div>
          <SectionHeading>Informations</SectionHeading>

          <div className="flex flex-col">
            <InfoRow label="Gender" value={character.gender} />
            <InfoRow label="Status" value={character.status} />
            <InfoRow label="Specie" value={character.species} />
            <InfoRow label="Origin" value={character.origin.name} />
            <InfoRow label="Type" value={character.type || "Unknown"} />
            <InfoRow label="Location" value={character.location.name} href={locationHref} />
          </div>
        </div>
        <div>
          <SectionHeading>Episodes</SectionHeading>
          <div className="flex flex-col">
            {episodes.map((episode) => (
              <InfoRow
                key={episode.id}
                label={episode.episode}
                value={episode.name}
                subtitle={episode.air_date}
                href={`/episode/${episode.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </DetailLayout>
  );
}

function extractId(url: string): string | null {
  const id = url.split("/").pop();
  return id && !isNaN(Number(id)) ? id : null;
}
