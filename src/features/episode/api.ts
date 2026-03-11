import { fetchApi, fetchManyByUrls, API_BASE } from "@/features/shared/api";
import { EpisodeSchema } from "./schemas";
import type { Episode } from "./types";

export async function getEpisode(id: number): Promise<Episode | null> {
  try {
    return await fetchApi(`${API_BASE}/episode/${id}`, EpisodeSchema, 3600);
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) return null;
    console.error(`Error fetching episode ${id}:`, error);
    return null;
  }
}

export async function getEpisodesByUrls(urls: string[]): Promise<Episode[]> {
  return fetchManyByUrls(urls, "episode", EpisodeSchema, 3600);
}
