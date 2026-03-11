import { z } from "zod";
import { EpisodeSchema } from "./schemas";

export type Episode = z.infer<typeof EpisodeSchema>;
