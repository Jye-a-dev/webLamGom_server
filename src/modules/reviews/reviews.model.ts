import mongoose, { Schema } from "mongoose";
import { IReview } from "./reviews.type";

const ReviewSchema = new Schema<IReview>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},

		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},

		comment: {
			type: String,
		},

		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ versionKey: false },
);

export const ReviewModel = mongoose.model<IReview>("Review", ReviewSchema);
