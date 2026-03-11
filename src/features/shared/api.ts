import type { z } from "zod";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export { API_BASE };

export async function fetchApi<T>(
  url: string,
  schema: { parse: (data: unknown) => T },
  revalidate = 60
): Promise<T> {
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${url}`);
  }
  const data = await res.json();
  return schema.parse(data);
}

export async function fetchManyByUrls<T>(
  urls: string[],
  endpoint: string,
  schema: { parse: (data: unknown) => T },
  revalidate = 60
): Promise<T[]> {
  if (!urls || urls.length === 0) return [];

  const ids = urls.map((url) => url.split("/").pop()).filter(Boolean);
  if (ids.length === 0) return [];

  try {
    const res = await fetch(`${API_BASE}/${endpoint}/${ids.join(",")}`, {
      next: { revalidate },
    });
    if (!res.ok) return [];

    const data = await res.json();
    const arr = Array.isArray(data) ? data : [data];
    return arr.map((item) => schema.parse(item));
  } catch (error) {
    console.error(`Error fetching ${endpoint} by IDs:`, error);
    return [];
  }
}
