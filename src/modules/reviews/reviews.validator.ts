import { z } from "zod";

export const createReviewSchema = z.object({
	body: z.object({
		userId: z.string().min(1, "userId is required"),

		productId: z.string().min(1, "productId is required"),

		rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),

		comment: z.string().optional(),
	}),
});

export const updateReviewSchema = z.object({
	body: z.object({
		rating: z.number().min(1).max(5).optional(),

		comment: z.string().optional(),
	}),
});

export const reviewIdSchema = z.object({
	params: z.object({
		id: z.string().min(1),
	}),
});

export const productIdSchema = z.object({
	params: z.object({
		productId: z.string().min(1),
	}),
});

export const userIdSchema = z.object({
	params: z.object({
		userId: z.string().min(1),
	}),
});
