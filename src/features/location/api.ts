import { fetchApi, API_BASE } from "@/features/shared/api";
import { LocationSchema } from "./schemas";
import type { Location } from "./types";

export async function getLocation(id: number): Promise<Location | null> {
  try {
    return await fetchApi(`${API_BASE}/location/${id}`, LocationSchema, 3600);
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) return null;
    console.error(`Error fetching location ${id}:`, error);
    return null;
  }
}
