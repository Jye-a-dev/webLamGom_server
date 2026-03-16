import { Types } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser {
	_id?: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	phone?: string;
	avatar?: string;
	isVerified: boolean;
	createdAt: Date;
}

export interface RegisterInput {
	name: string;
	email: string;
	password: string;
}

export interface LoginInput {
	email: string;
	password: string;
}
