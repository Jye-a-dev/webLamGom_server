import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
	static async register(req: Request, res: Response) {
		try {
			const user = await AuthService.register(req.body);

			res.status(201).json({
				message: "Register success",
				data: user,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
		}
	}

	static async login(req: Request, res: Response) {
		try {
			const result = await AuthService.login(req.body);

			res.json({
				message: "Login success",
				data: result,
			});
		} catch (error: any) {
			res.status(400).json({
				message: error.message,
			});
		}
	}

	static async profile(req: Request, res: Response) {
		const userId = (req as any).user.id;

		const user = await AuthService.getProfile(userId);

		res.json({
			data: user,
		});
	}
	static async logout(req: Request, res: Response) {
		const result = await AuthService.logout();

		res.json(result);
	}
}
