import { Router } from "express";
import { UsersController } from "./users.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema, userIdSchema } from "./users.validator";

const router = Router();

router.get("/html", UsersController.html);
router.get("/", UsersController.getAll);
router.get("/count",UsersController.countAll)
router.get("/:id", validate(userIdSchema), UsersController.getById);
router.post("/", validate(createUserSchema), UsersController.create);
router.patch("/:id", validate(userIdSchema), validate(updateUserSchema), UsersController.update);
router.delete("/:id", validate(userIdSchema), UsersController.delete);

export default router;
