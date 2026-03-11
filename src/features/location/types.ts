import { z } from "zod";
import { LocationSchema } from "./schemas";

export type Location = z.infer<typeof LocationSchema>;
