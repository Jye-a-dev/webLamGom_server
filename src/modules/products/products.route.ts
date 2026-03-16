import { Router } from "express";
import { ProductsController } from "./products.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema, productIdSchema, productSlugSchema } from "./products.validator";

const router = Router();
router.get("/html", ProductsController.html);
router.get("/", ProductsController.getAll);

router.get("/count", ProductsController.countAll);

router.get("/slug/:slug", validate(productSlugSchema), ProductsController.getBySlug);

router.get("/:id", validate(productIdSchema), ProductsController.getById);

router.post("/", validate(createProductSchema), ProductsController.create);

router.patch("/:id", validate(productIdSchema), validate(updateProductSchema), ProductsController.update);

router.delete("/:id", validate(productIdSchema), ProductsController.delete);

export default router;
