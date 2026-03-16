import { Request, Response } from "express";
import { CartsService } from "./carts.service";

type UserParams = {
	userId: string;
};

type CartItemParams = {
	userId: string;
	productId: string;
};

export class CartsController {
	static async getCart(req: Request<UserParams>, res: Response) {
		try {
			const cart = await CartsService.getCart(req.params.userId);

			res.json({ data: cart });
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}

	static async addItem(req: Request<UserParams>, res: Response) {
		try {
			const cart = await CartsService.addItem(req.params.userId, req.body);

			res.json({
				message: "Item added to cart",
				data: cart,
			});
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async updateItem(req: Request<CartItemParams>, res: Response) {
		try {
			const cart = await CartsService.updateItem(req.params.userId, req.params.productId, req.body.quantity);

			res.json({
				message: "Cart updated",
				data: cart,
			});
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async removeItem(req: Request<CartItemParams>, res: Response) {
		try {
			const cart = await CartsService.removeItem(req.params.userId, req.params.productId);

			res.json({
				message: "Item removed",
				data: cart,
			});
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async clear(req: Request<UserParams>, res: Response) {
		try {
			const cart = await CartsService.clearCart(req.params.userId);

			res.json({
				message: "Cart cleared",
				data: cart,
			});
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}
	static async html(req: Request, res: Response) {
		try {
			const carts = await CartsService.getAll();

			const data = carts.flatMap((cart: any) =>
				cart.items.map((i: any) => ({
					cartId: cart._id,
					userId: cart.userId?._id,
					userEmail: cart.userId?.email,
					productId: i.productId?._id,
					productName: i.productId?.name,
					price: i.price,
					quantity: i.quantity,
					total: (i.price || 0) * i.quantity,
				})),
			);

			const columns = data.length > 0 ? Object.keys(data[0]) : [];

			res.render("endpoint", {
				title: "Carts API",
				apiRoutes: [
					{ methods: "GET", path: "/api/carts" },
					{ methods: "GET", path: "/api/carts/:userId" },
					{ methods: "POST", path: "/api/carts/:userId/items" },
					{ methods: "PATCH", path: "/api/carts/:userId/items/:productId" },
					{ methods: "DELETE", path: "/api/carts/:userId/items/:productId" },
					{ methods: "DELETE", path: "/api/carts/:userId/clear" },
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
}
