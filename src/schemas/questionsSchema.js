import { z } from "zod";

export const quesitonsSchema = z.object({
  question: z
    .string()
    .min(1, "Question is required"),

    message: z
    .string().optional(), 

    parentQuestion: z
    .string().optional(),

    nextQuestion: z
    .array(z.string()).optional(),
});
