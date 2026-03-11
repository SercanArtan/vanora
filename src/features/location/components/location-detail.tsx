import { MapPin } from "lucide-react";
import { DetailLayout, SectionHeading } from "@/features/shared/components/detail-layout";
import { InfoRow } from "@/features/shared/components/info-row";
import { ResidentGrid } from "@/features/shared/components/resident-grid";
import type { Location } from "../types";
import type { Character } from "@/features/character/types";

interface LocationDetailProps {
  location: Location;
  residents: Character[];
}

export function LocationDetail({ location, residents }: LocationDetailProps) {
  return (
    <DetailLayout>
      <DetailLayout.Hero
        icon={<MapPin className="h-12 w-12 text-white" />}
        gradient="from-brand-blue to-brand-lightBlue"
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 text-center">
          {location.name}
        </h1>
      </DetailLayout.Hero>
      <DetailLayout.Content>
        <div>
          <SectionHeading>Location Info</SectionHeading>
          <div className="flex flex-col">
            <InfoRow label="Type" value={location.type || "Unknown"} />
            <InfoRow label="Dimension" value={location.dimension || "Unknown"} />
            <InfoRow label="Number of Residents" value={String(location.residents.length)} />
          </div>
        </div>
        <ResidentGrid characters={residents} title="Residents" />
      </DetailLayout.Content>
    </DetailLayout>
  );
}
