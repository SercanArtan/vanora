import { z } from "zod";
import { InfoSchema, LocationRefSchema } from "@/features/shared/schemas";

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"] as const),
  species: z.string(),
  type: z.string(),
  gender: z.enum(["Female", "Male", "Genderless", "unknown"] as const),
  origin: LocationRefSchema,
  location: LocationRefSchema,
  image: z.string(),
  episode: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

export const CharacterResponseSchema = z.object({
  info: InfoSchema,
  results: z.array(CharacterSchema),
});

export const CharacterFiltersSchema = z.object({
  name: z.string().optional(),
  status: z.enum(["Alive", "Dead", "unknown"]).optional(),
  species: z.string().optional(),
  gender: z.enum(["Female", "Male", "Genderless", "unknown"]).optional(),
  page: z.number().optional(),
});
