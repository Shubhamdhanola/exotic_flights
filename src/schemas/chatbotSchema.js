import { z } from "zod";

export const chatbotSchema = z.object({
  search: z
    .string()
});
