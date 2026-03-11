import { Film } from "lucide-react";
import { DetailLayout, SectionHeading } from "@/features/shared/components/detail-layout";
import { InfoRow } from "@/features/shared/components/info-row";
import { ResidentGrid } from "@/features/shared/components/resident-grid";
import type { Episode } from "../types";
import type { Character } from "@/features/character/types";

interface EpisodeDetailProps {
  episode: Episode;
  characters: Character[];
}

export function EpisodeDetail({ episode, characters }: EpisodeDetailProps) {
  return (
    <DetailLayout>
      <DetailLayout.Hero
        icon={<Film className="h-12 w-12 text-white" />}
        gradient="from-brand-green to-brand-lightBlue"
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 text-center">{episode.name}</h1>
        <p className="text-lg text-gray-500 mt-2 font-medium">{episode.episode}</p>
      </DetailLayout.Hero>
      <DetailLayout.Content>
        <div>
          <SectionHeading>Episode Info</SectionHeading>
          <div className="flex flex-col">
            <InfoRow label="Episode Code" value={episode.episode} />
            <InfoRow label="Air Date" value={episode.air_date} />
            <InfoRow label="Number of Characters" value={String(episode.characters.length)} />
          </div>
        </div>
        <ResidentGrid characters={characters} title="Characters" />
      </DetailLayout.Content>
    </DetailLayout>
  );
}
