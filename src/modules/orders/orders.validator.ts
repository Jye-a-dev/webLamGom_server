import { z } from "zod";

/**
 * orderId param
 */
export const orderIdSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});

/**
 * get user orders
 */
export const userOrderSchema = z.object({
  params: z.object({
    userId: z.string().min(1)
  })
});

/**
 * create order
 */
export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().min(1),
    addressId: z.string().min(1)
  })
});

/**
 * update status
 */
export const updateStatusSchema = z.object({
  body: z.object({
    status: z.string().min(1)
  })
});

/**
 * update order (admin)
 */
export const updateOrderSchema = z.object({
  body: z.object({
    status: z.string().optional(),
    paymentStatus: z.string().optional(),
    addressId: z.string().optional()
  })
});

/**
 * update by user
 */
export const updateUserOrderSchema = z.object({
  params: z.object({
    userId: z.string().min(1),
    orderId: z.string().min(1)
  }),
  body: z.object({
    addressId: z.string().optional()
  })
});