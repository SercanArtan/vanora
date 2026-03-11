import { notFound } from "next/navigation";
import { getEpisode } from "@/features/episode/api";
import { getCharactersByUrls } from "@/features/character/api";
import { EpisodeDetail } from "@/features/episode/components/episode-detail";
import {
  DetailPageWrapper,
  createDetailMetadata,
  type DetailPageParams,
} from "@/features/shared/components/detail-page";
import { parseId } from "@/lib/utils";

export default async function EpisodePage({ params }: DetailPageParams) {
  const id = parseId(params.id);
  const episode = await getEpisode(id);
  if (!episode) return notFound();

  const characters = await getCharactersByUrls(episode.characters.slice(0, 20));

  return (
    <DetailPageWrapper>
      <EpisodeDetail episode={episode} characters={characters} />
    </DetailPageWrapper>
  );
}

export const generateMetadata = createDetailMetadata("Episode", getEpisode, (episode) => ({
  title: `${episode.name} (${episode.episode}) | Rick and Morty Explorer`,
  description: `${episode.name} aired on ${episode.air_date}. ${episode.characters.length} characters appear in this episode.`,
}));
