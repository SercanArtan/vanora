import { notFound } from "next/navigation";
import { getLocation } from "@/features/location/api";
import { getCharactersByUrls } from "@/features/character/api";
import { LocationDetail } from "@/features/location/components/location-detail";
import {
  DetailPageWrapper,
  createDetailMetadata,
  type DetailPageParams,
} from "@/features/shared/components/detail-page";
import { parseId } from "@/lib/utils";

export default async function LocationPage({ params }: DetailPageParams) {
  const id = parseId(params.id);
  const location = await getLocation(id);
  if (!location) return notFound();

  const residents = await getCharactersByUrls(location.residents.slice(0, 20));

  return (
    <DetailPageWrapper>
      <LocationDetail location={location} residents={residents} />
    </DetailPageWrapper>
  );
}

export const generateMetadata = createDetailMetadata("Location", getLocation, (location) => ({
  title: `${location.name} | Rick and Morty Explorer`,
  description: `${location.name} is a ${location.type} in ${location.dimension}. ${location.residents.length} known residents.`,
}));
