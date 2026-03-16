import { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createCategorySchema, updateCategorySchema, categoryIdSchema, categorySlugSchema } from "./categories.validator";

const router = Router();

router.get("/html", CategoriesController.html);

router.get("/", CategoriesController.getAll);

router.get("/count", CategoriesController.countAll);

router.get("/slug/:slug", validate(categorySlugSchema), CategoriesController.getBySlug);

router.get("/:id", validate(categoryIdSchema), CategoriesController.getById);

router.post("/", validate(createCategorySchema), CategoriesController.create);

router.patch("/:id", validate(categoryIdSchema), validate(updateCategorySchema), CategoriesController.update);

router.delete("/:id", validate(categoryIdSchema), CategoriesController.delete);

export default router;
