import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    slug: z.string().min(2).optional(),
    description: z.string().optional(),
  }),
});

export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().length(24),
  }),
});

export const categorySlugSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});