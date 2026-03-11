import { z } from "zod";
import { CharacterSchema, CharacterResponseSchema, CharacterFiltersSchema } from "./schemas";

export type Character = z.infer<typeof CharacterSchema>;
export type CharacterResponse = z.infer<typeof CharacterResponseSchema>;
export type CharacterFilters = z.infer<typeof CharacterFiltersSchema>;
