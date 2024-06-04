import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username can't be more than 20 characters");

export const emailValidation = z
  .string()
  .email({ message: "Invalid email address" });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 characters" }),
});
