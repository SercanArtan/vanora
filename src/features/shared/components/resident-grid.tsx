import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/features/character/types";

interface ResidentGridProps {
  characters: Character[];
  title: string;
}

export function ResidentGrid({ characters, title }: ResidentGridProps) {
  if (characters.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-sm">No {title.toLowerCase()} found.</div>
    );
  }

  return (
    <div>
      <h2 className="text-gray-500 font-semibold mb-4 text-sm uppercase tracking-wider">
        {title} ({characters.length})
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {characters.map((char) => (
          <Link
            key={char.id}
            href={`/character/${char.id}`}
            className="flex flex-col items-center p-3 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 hover:shadow-md transition-all group"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 mb-2">
              <Image
                src={char.image}
                alt={`${char.name} - ${char.species}`}
                fill
                unoptimized
                className="object-cover"
                sizes="64px"
              />
            </div>
            <p className="text-xs font-semibold text-gray-800 text-center truncate w-full group-hover:text-brand-blue transition-colors">
              {char.name}
            </p>
            <p className="text-[10px] text-gray-400 truncate w-full text-center">{char.species}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
