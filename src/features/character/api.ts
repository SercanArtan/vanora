import { fetchApi, fetchManyByUrls, API_BASE } from "@/features/shared/api";
import { CharacterResponseSchema, CharacterSchema } from "./schemas";
import type { CharacterResponse, CharacterFilters, Character } from "./types";

export async function getCharacters(filters?: CharacterFilters): Promise<CharacterResponse | null> {
  const url = new URL(`${API_BASE}/character`);

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    return await fetchApi(url.toString(), CharacterResponseSchema);
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) return null;
    console.error("Error fetching characters:", error);
    return null;
  }
}

export async function getCharacter(id: number): Promise<Character | null> {
  try {
    return await fetchApi(`${API_BASE}/character/${id}`, CharacterSchema);
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) return null;
    console.error(`Error fetching character ${id}:`, error);
    return null;
  }
}

export async function getCharactersByUrls(urls: string[]): Promise<Character[]> {
  return fetchManyByUrls(urls, "character", CharacterSchema);
}
