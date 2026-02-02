import { z } from "zod";

export const registerSchema = z.object({
  
   name: z.string({ required_error: "name is required" }),

  Id: z.string({required_error: "Id is required"}),

  email: z.string({required_error: "Email is required"}).email("Invalid email"),

  password: z.string({required_error: "password is required"}).min(6, "min 6 characters"),
});
