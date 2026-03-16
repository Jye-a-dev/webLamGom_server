import { z } from "zod";

export const paymentSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    method: z.string().min(1)
  })
});

export const updatePaymentSchema = z.object({
  body: z.object({
    method: z.string().optional(),
    status: z.string().optional(),
    transactionId: z.string().optional()
  })
});