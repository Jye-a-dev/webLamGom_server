import { z } from "zod";

export const cartUserSchema = z.object({
  params: z.object({
    userId: z.string().min(1)
  })
});

export const cartItemParamsSchema = z.object({
  params: z.object({
    userId: z.string().min(1),
    productId: z.string().min(1)
  })
});

export const addItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1),
    quantity: z.number().min(1),
    price: z.number().min(0)
  })
});

export const updateItemSchema = z.object({
  body: z.object({
    quantity: z.number().min(1)
  })
});