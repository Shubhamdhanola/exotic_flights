import { z } from "zod";

export const quesitonsSchema = z.object({
  question: z
    .string()
    .min(1, "This field is required"),

    answer: z
    .string()
    .min(1, "This field is required"),

    parentQuestion: z
    .string(),

    nextQuestion: z
    .array(z.string())
});
