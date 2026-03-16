import mongoose, { Schema } from "mongoose";
import { IProduct } from "./products.type";

const ProductSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
		},

		slug: {
			type: String,
			required: true,
			unique: true,
		},

		description: {
			type: String,
		},

		price: {
			type: Number,
			required: true,
		},

		stock: {
			type: Number,
			default: 0,
		},

		categoryId: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},

		images: [
			{
				type: String,
			},
		],

		isFeatured: {
			type: Boolean,
			default: false,
		},

		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ versionKey: false },
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
