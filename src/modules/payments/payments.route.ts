import { Router } from "express";
import { PaymentsController } from "./payments.controller";
import { validate } from "../../middlewares/validate.middleware";

import {
  paymentSchema,
  updatePaymentSchema
} from "./payments.validator";

const router = Router();
router.get("/html", PaymentsController.html);
router.get("/", PaymentsController.getAll);

router.get("/:id", PaymentsController.getById);

router.post(
  "/",
  validate(paymentSchema),
  PaymentsController.pay
);

router.put(
  "/:id",
  validate(updatePaymentSchema),
  PaymentsController.update
);

router.delete("/:id", PaymentsController.delete);

export default router;