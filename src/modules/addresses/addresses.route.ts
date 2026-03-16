import { Router } from "express";
import { AddressesController } from "./addresses.controller";
import { validate } from "../../middlewares/validate.middleware";

import { createAddressSchema, updateAddressSchema, addressIdSchema, addressUserSchema } from "./addresses.validator";

const router = Router();

router.get("/user/:userId", validate(addressUserSchema), AddressesController.getByUser);

router.post("/", validate(createAddressSchema), AddressesController.create);

router.patch("/:id", validate(addressIdSchema), validate(updateAddressSchema), AddressesController.update);

router.delete("/:id", validate(addressIdSchema), AddressesController.delete);

export default router;
