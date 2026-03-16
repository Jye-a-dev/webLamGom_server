import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { validate } from "../../middlewares/validate.middleware";

import { orderIdSchema, userOrderSchema, createOrderSchema, updateStatusSchema, updateOrderSchema, updateUserOrderSchema } from "./orders.validator";

const router = Router();

router.get("/html", OrdersController.html);

router.get("/", OrdersController.getAll);

router.get("/user/:userId", validate(userOrderSchema), OrdersController.getUserOrders);

router.get("/:id", validate(orderIdSchema), OrdersController.getById);

router.post("/", validate(createOrderSchema), OrdersController.create);

/**
 * update order (admin)
 */
router.patch("/:id", validate(orderIdSchema), validate(updateOrderSchema), OrdersController.update);

/**
 * update order status
 */
router.patch("/:id/status", validate(orderIdSchema), validate(updateStatusSchema), OrdersController.updateStatus);

/**
 * update order by user
 */
router.patch("/user/:userId/:orderId", validate(updateUserOrderSchema), OrdersController.updateByUserId);

router.delete("/:id", validate(orderIdSchema), OrdersController.delete);

export default router;
