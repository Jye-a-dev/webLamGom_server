import { Router, Request, Response } from "express";

import { moduleRoutes } from "./modules.routes";
import { extractRoutes } from "../utils/extractRoutes";
import { Model } from "mongoose";

const router = Router();

/* ================= REGISTER MODULE ROUTES ================= */

moduleRoutes.forEach((r) => {
  router.use(r.path, r.router);
});

/* ================= ROUTE LIST ================= */

const routes = moduleRoutes.map((r) => r.name);

/* ================= API ROUTE MAP ================= */

const apiRoutesMap = Object.fromEntries(
  moduleRoutes.map((r) => [
    r.name,
    extractRoutes(r.router, `/api${r.path}`)
  ])
);

/* ================= RENDER ROUTE LIST ================= */

router.get("/", (req: Request, res: Response) => {

  res.render("routes", {
    routes
  });

});

/* ================= AUTO MODULE HTML ================= */

router.get("/:module/html", async (req: Request<{ module: string }>, res: Response) => {

  const moduleName = req.params.module;

  const mod = moduleRoutes.find((m) => m.name === moduleName);

  if (!mod) {
    return res.status(404).send("Module not found");
  }

  const data = await (mod.model as Model<any>).find().lean();

  const columns =
    data.length > 0
      ? Object.keys(data[0])
      : [];

  res.render("endpoint", {
    title: `${moduleName.toUpperCase()} API`,
    apiRoutes: apiRoutesMap[moduleName],
    columns,
    data
  });

});

export default router;