import { Router } from "express";
import { CartsController } from "./carts.controller";
import { validate } from "../../middlewares/validate.middleware";

import { cartUserSchema, addItemSchema, updateItemSchema, cartItemParamsSchema } from "./carts.validator";

const router = Router();
router.get("/html", CartsController.html);
router.get("/:userId", validate(cartUserSchema), CartsController.getCart);

router.post("/:userId/items", validate(cartUserSchema), validate(addItemSchema), CartsController.addItem);

router.patch("/:userId/items/:productId", validate(cartItemParamsSchema), validate(updateItemSchema), CartsController.updateItem);

router.delete("/:userId/items/:productId", validate(cartItemParamsSchema), CartsController.removeItem);

router.delete("/:userId/clear", validate(cartUserSchema), CartsController.clear);

export default router;
