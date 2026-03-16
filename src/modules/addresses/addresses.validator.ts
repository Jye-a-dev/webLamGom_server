import { z } from "zod";

export const addressUserSchema = z.object({
	params: z.object({
		userId: z.string().min(1),
	}),
});

export const addressIdSchema = z.object({
	params: z.object({
		id: z.string().min(1),
	}),
});

export const createAddressSchema = z.object({
	body: z.object({
		userId: z.string().min(1),

		name: z.string().min(2),

		phone: z.string().min(8),

		province: z.string(),

		district: z.string(),

		ward: z.string(),

		detail: z.string(),
	}),
});

export const updateAddressSchema = z.object({
	body: z.object({
		name: z.string().optional(),

		phone: z.string().optional(),

		province: z.string().optional(),

		district: z.string().optional(),

		ward: z.string().optional(),

		detail: z.string().optional(),
	}),
});
