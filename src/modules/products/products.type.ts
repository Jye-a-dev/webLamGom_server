import { Types } from "mongoose";

export interface IProduct {
	_id?: Types.ObjectId;
	name: string;
	slug: string;
	description: string;
	price: number;
	stock: number;
	categoryId: Types.ObjectId;
	images: string[];
	isFeatured: boolean;
	createdAt: Date;
}
