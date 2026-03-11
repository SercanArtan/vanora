"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { CharacterCard } from "./character-card";
import { Button } from "@/components/ui/button";
import { getCharacters } from "../api";
import type { Character, CharacterFilters } from "../types";
import type { Info } from "@/features/shared/types";

interface CharacterGridProps {
  initialCharacters: Character[];
  initialInfo: Info | null;
  filters: CharacterFilters;
}

export function CharacterGrid({ initialCharacters, initialInfo, filters }: CharacterGridProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [info, setInfo] = useState<Info | null>(initialInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCharacters(initialCharacters);
    setInfo(initialInfo);
  }, [initialCharacters, initialInfo]);

  if (characters.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No characters found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-card mb-section">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      {info?.next && (
        <Button variant="loadMore" onClick={handleLoadMore} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              LOADING...
            </>
          ) : (
            "LOAD MORE"
          )}
        </Button>
      )}
    </div>
  );

  async function handleLoadMore() {
    if (!info?.next || loading) return;

    setLoading(true);

    const nextUrl = new URL(info.next);
    const nextPage = Number(nextUrl.searchParams.get("page"));

    try {
      const res = await getCharacters({ ...filters, page: nextPage });
      if (res) {
        setCharacters((prev) => [...prev, ...res.results]);
        setInfo(res.info);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
}
