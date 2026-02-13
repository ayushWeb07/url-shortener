import z from "zod";

const signupSchema = z.object({
  name: z.string().min(5).max(100),
  email: z.email().min(5).max(100),
  password: z.string().min(8).max(100),
});

const loginSchema = z.object({
  email: z.email().min(5).max(100),
  password: z.string().min(8).max(100),
});

export { signupSchema, loginSchema };
