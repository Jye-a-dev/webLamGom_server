import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../users/users.model";
import { RegisterInput, LoginInput } from "../users/users.type";

export class AuthService {
	/* ================= REGISTER ================= */

	static async register(data: RegisterInput) {
		const existed = await UserModel.findOne({ email: data.email });

		if (existed) {
			throw new Error("Email already exists");
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		const user = await UserModel.create({
			...data,
			password: hashedPassword,
		});

		return {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
	}

	/* ================= LOGIN ================= */

	static async login(data: LoginInput) {
		const user = await UserModel.findOne({ email: data.email });

		if (!user) {
			throw new Error("Invalid credentials");
		}

		const isMatch = await bcrypt.compare(data.password, user.password);

		if (!isMatch) {
			throw new Error("Invalid credentials");
		}

		const secret = process.env.JWT_SECRET;

		if (!secret) {
			throw new Error("JWT_SECRET not defined");
		}

		const token = jwt.sign(
			{
				id: user._id,
				role: user.role,
			},
			secret,
			{
				expiresIn: "7d",
			},
		);

		return {
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		};
	}

	/* ================= PROFILE ================= */

	static async getProfile(userId: string) {
		const user = await UserModel.findById(userId).select("-password");

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}

	/* ================= LOGOUT ================= */

	static async logout() {
		return {
			message: "Logout success",
		};
	}
}
