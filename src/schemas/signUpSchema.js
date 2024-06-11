import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Please enter your name"),
    phonenumber: z
      .string()
      .min(10, "Phone number must be of 10 digits")
      .max(14, "Phone number can't be more than 14 digits"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password should contains at least 8 characters"),
    confirmPassword: z.string().min(1, "Enter the confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
