import { Request, Response } from "express";
import { ReviewsService } from "./reviews.service";

type IdParams = {
	id: string;
};

type ProductParams = {
	productId: string;
};

type UserParams = {
	userId: string;
};

export class ReviewsController {
	static async create(req: Request, res: Response) {
		try {
			const review = await ReviewsService.create(req.body);

			res.status(201).json({
				message: "Review created",
				data: review,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
		}
	}

	static async getAll(req: Request, res: Response) {
		try {
			const reviews = await ReviewsService.findAll();

			res.json({
				data: reviews,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}

	/* COUNT REVIEWS */

	static async countAll(req: Request, res: Response) {
		try {
			const total = await ReviewsService.countAll();

			res.json({
				total,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}

	static async getByProduct(req: Request<ProductParams>, res: Response) {
		try {
			const reviews = await ReviewsService.findByProduct(req.params.productId);

			res.json({
				data: reviews,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}

	static async getByUser(req: Request<UserParams>, res: Response) {
		try {
			const reviews = await ReviewsService.findByUser(req.params.userId);

			res.json({
				data: reviews,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}

	static async update(req: Request<IdParams>, res: Response) {
		try {
			const review = await ReviewsService.update(req.params.id, req.body);

			if (!review) {
				return res.status(404).json({
					message: "Review not found",
				});
			}

			res.json({
				message: "Review updated",
				data: review,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
		}
	}

	static async delete(req: Request<IdParams>, res: Response) {
		try {
			const review = await ReviewsService.delete(req.params.id);

			if (!review) {
				return res.status(404).json({
					message: "Review not found",
				});
			}

			res.json({
				message: "Review deleted",
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
}
