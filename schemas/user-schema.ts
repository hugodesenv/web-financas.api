import { z } from "zod";

export const UserAuth = z.object({
  user: z.string(),
  password: z.string()
})