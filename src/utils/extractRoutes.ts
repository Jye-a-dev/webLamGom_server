import { Router } from "express";

export interface ApiRoute {
  methods: string;
  path: string;
}

export function extractRoutes(
  router: Router,
  basePath: string
): ApiRoute[] {

  const routes: ApiRoute[] = [];

  router.stack.forEach((layer: any) => {

    if (layer.route) {

      const path = layer.route.path;

      const methods = Object.keys(layer.route.methods)
        .map((m) => m.toUpperCase())
        .join(",");

      routes.push({
        methods,
        path: `${basePath}${path === "/" ? "" : path}`
      });

    }

  });

  return routes;
}