import { z } from "zod";

export const createProductSchema = z.object({
	body: z.object({
		name: z.string().min(2, "Product name must be at least 2 characters"),

		slug: z.string().min(2, "Slug is required"),

		description: z.string().optional(),

		price: z.number().min(0, "Price must be >= 0"),

		stock: z.number().min(0).optional(),

		categoryId: z.string().min(1, "categoryId is required"),

		images: z.array(z.string().url()).optional(),

		isFeatured: z.boolean().optional(),
	}),
});

export const updateProductSchema = z.object({
	body: z.object({
		name: z.string().min(2).optional(),

		slug: z.string().min(2).optional(),

		description: z.string().optional(),

		price: z.number().min(0).optional(),

		stock: z.number().min(0).optional(),

		categoryId: z.string().optional(),

		images: z.array(z.string().url()).optional(),

		isFeatured: z.boolean().optional(),
	}),
});

export const productIdSchema = z.object({
	params: z.object({
		id: z.string().min(1),
	}),
});

export const productSlugSchema = z.object({
	params: z.object({
		slug: z.string().min(1),
	}),
});
