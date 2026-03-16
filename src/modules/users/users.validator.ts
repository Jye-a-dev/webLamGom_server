import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "admin"]).optional(),
    phone: z.string().optional(),
    avatar: z.string().url().optional()
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["user", "admin"]).optional(),
    phone: z.string().optional(),
    avatar: z.string().url().optional()
  })
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});