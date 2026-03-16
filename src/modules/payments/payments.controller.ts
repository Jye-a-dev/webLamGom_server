import { Request, Response } from "express";
import { PaymentsService } from "./payments.service";

type IdParams = {
	id: string;
};

export class PaymentsController {
	static async getAll(req: Request, res: Response) {
		const payments = await PaymentsService.getAll();

		res.json({
			message: "Payments list",
			data: payments,
		});
	}

	static async getById(req: Request<IdParams>, res: Response) {
		const payment = await PaymentsService.getById(req.params.id);

		res.json({
			message: "Payment detail",
			data: payment,
		});
	}
	static async html(req: Request, res: Response) {
		try {
			const payments = await PaymentsService.findAll();

			const data = payments.map((p: any) => ({
				_id: p._id,
				orderId: p.orderId?._id,
				method: p.method,
				status: p.status,
				transactionId: p.transactionId,
				paidAt: p.paidAt,
			}));

			const columns = data.length > 0 ? Object.keys(data[0]) : [];

			res.render("endpoint", {
				title: "Payments API",
				apiRoutes: [
					{ methods: "GET", path: "/api/payments" },
					{ methods: "GET", path: "/api/payments/:id" },
					{ methods: "POST", path: "/api/payments" },
					{ methods: "PUT", path: "/api/payments/:id" },
					{ methods: "DELETE", path: "/api/payments/:id" },
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
	static async pay(req: Request, res: Response) {
		const payment = await PaymentsService.pay(req.body.orderId, req.body.method);

		res.json({
			message: "Payment success",
			data: payment,
		});
	}

	static async update(req: Request<IdParams>, res: Response) {
		const payment = await PaymentsService.update(req.params.id, req.body);

		res.json({
			message: "Payment updated",
			data: payment,
		});
	}

	static async delete(req: Request<IdParams>, res: Response) {
		await PaymentsService.delete(req.params.id);

		res.json({
			message: "Payment deleted",
		});
	}
}
