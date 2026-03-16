import { ReviewModel } from "./reviews.model";
import { IReview } from "./reviews.type";

export class ReviewsService {
	static async create(data: Partial<IReview>) {
		return ReviewModel.create(data);
	}

	static async findAll() {
		return ReviewModel.find().populate("userId", "name avatar").populate("productId", "name slug");
	}

	static async findByProduct(productId: string) {
		return ReviewModel.find({ productId }).populate("userId", "name avatar");
	}

	static async findByUser(userId: string) {
		return ReviewModel.find({ userId }).populate("productId", "name slug images");
	}

	static async update(id: string, data: Partial<IReview>) {
		return ReviewModel.findByIdAndUpdate(id, data, { new: true });
	}

	static async delete(id: string) {
		return ReviewModel.findByIdAndDelete(id);
	}

	static async countAll() {
		return ReviewModel.countDocuments();
	}
}
