import { Router } from "express";
import { ReviewsController } from "./reviews.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createReviewSchema, updateReviewSchema, reviewIdSchema, productIdSchema, userIdSchema } from "./reviews.validator";

const router = Router();

router.get("/", ReviewsController.getAll);

router.get("/count", ReviewsController.countAll);

router.get("/product/:productId", validate(productIdSchema), ReviewsController.getByProduct);

router.get("/user/:userId", validate(userIdSchema), ReviewsController.getByUser);

router.post("/", validate(createReviewSchema), ReviewsController.create);

router.patch("/:id", validate(reviewIdSchema), validate(updateReviewSchema), ReviewsController.update);

router.delete("/:id", validate(reviewIdSchema), ReviewsController.delete);

export default router;
