import Image from "next/image";
import Link from "next/link";
import { type Character } from "../types";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      href={`/character/${character.id}`}
      className="flex flex-col h-card rounded-lg border border-gray-100 overflow-hidden bg-white hover:bg-gray-50 transition-colors shadow-md hover:shadow-xl"
    >
      <div className="relative w-full h-card-image">
        <Image
          src={character.image}
          alt={`${character.name} - ${character.species}`}
          fill
          unoptimized
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="p-3 flex-grow flex flex-col justify-center">
        <h3 className="font-bold text-gray-900 truncate text-lg">{character.name}</h3>
        <p className="text-sm text-gray-500 truncate">{character.species}</p>
      </div>
    </Link>
  );
}
