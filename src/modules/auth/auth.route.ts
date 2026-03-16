import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "./auth.validator";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);

router.post("/login", validate(loginSchema), AuthController.login);

router.get("/profile", authMiddleware, AuthController.profile);

router.post("/logout", authMiddleware, AuthController.logout);

export default router;
