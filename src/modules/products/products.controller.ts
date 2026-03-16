import { Request, Response } from "express";
import { ProductsService } from "./products.service";

type IdParams = {
	id: string;
};

type SlugParams = {
	slug: string;
};

export class ProductsController {
	static async create(req: Request, res: Response) {
		try {
			const product = await ProductsService.create(req.body);

			res.status(201).json({
				message: "Product created",
				data: product,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
		}
	}

	static async getAll(req: Request, res: Response) {
		try {
			const products = await ProductsService.findAll();

			res.json({
				data: products,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
	static async html(req: Request, res: Response) {
		try {
			const products = await ProductsService.findAll();

			const data = products.map((p: any) => ({
				_id: p._id,
				name: p.name,
				slug: p.slug,
				price: p.price,
				stock: p.stock,
				category: p.categoryId?.name,
				isFeatured: p.isFeatured,
				images : p.images
			}));

			const columns = data.length > 0 ? Object.keys(data[0]) : [];

			res.render("endpoint", {
				title: "Products API",
				apiRoutes: [
					{ methods: "GET", path: "/api/products" },
					{ methods: "GET", path: "/api/products/count" },
					{ methods: "GET", path: "/api/products/:id" },
					{ methods: "GET", path: "/api/products/slug/:slug" },
					{ methods: "POST", path: "/api/products" },
					{ methods: "PATCH", path: "/api/products/:id" },
					{ methods: "DELETE", path: "/api/products/:id" },
				],
				columns,
				data,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
	/* COUNT PRODUCTS */

	static async countAll(req: Request, res: Response) {
		try {
			const total = await ProductsService.countAll();

			res.json({
				total,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}

	static async getById(req: Request<IdParams>, res: Response) {
		try {
			const product = await ProductsService.findById(req.params.id);

			if (!product) {
				return res.status(404).json({
					message: "Product not found",
				});
			}

			res.json({
				data: product,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}

	static async getBySlug(req: Request<SlugParams>, res: Response) {
		try {
			const product = await ProductsService.findBySlug(req.params.slug);

			if (!product) {
				return res.status(404).json({
					message: "Product not found",
				});
			}

			res.json({
				data: product,
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}

	static async update(req: Request<IdParams>, res: Response) {
		try {
			const product = await ProductsService.update(req.params.id, req.body);

			if (!product) {
				return res.status(404).json({
					message: "Product not found",
				});
			}

			res.json({
				message: "Product updated",
				data: product,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
		}
	}

	static async delete(req: Request<IdParams>, res: Response) {
		try {
			const product = await ProductsService.delete(req.params.id);

			if (!product) {
				return res.status(404).json({
					message: "Product not found",
				});
			}

			res.json({
				message: "Product deleted",
			});
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			});
		}
	}
}
