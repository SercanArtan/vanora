import { notFound } from "next/navigation";
import { getCharacter } from "@/features/character/api";
import { getEpisodesByUrls } from "@/features/episode/api";
import { CharacterDetail } from "@/features/character/components/character-detail";
import {
  DetailPageWrapper,
  createDetailMetadata,
  type DetailPageParams,
} from "@/features/shared/components/detail-page";
import { parseId } from "@/lib/utils";

export default async function CharacterPage({ params }: DetailPageParams) {
  const id = parseId(params.id);
  const character = await getCharacter(id);
  if (!character) return notFound();

  const episodes = await getEpisodesByUrls(character.episode);

  return (
    <DetailPageWrapper>
      <CharacterDetail character={character} episodes={episodes} />
    </DetailPageWrapper>
  );
}

export const generateMetadata = createDetailMetadata("Character", getCharacter, (character) => ({
  title: `${character.name} | Rick and Morty Explorer`,
  description: `Details for ${character.name}, a ${character.status} ${character.species} from ${character.origin.name}.`,
  openGraph: { images: [character.image] },
}));
