import { z } from "zod";
import * as schemas from "./schemas";

export type Info = z.infer<typeof schemas.InfoSchema>;
export type LocationRef = z.infer<typeof schemas.LocationRefSchema>;
