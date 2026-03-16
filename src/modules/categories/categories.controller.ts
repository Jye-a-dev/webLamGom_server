import { Request, Response } from "express";
import { CategoriesService } from "./categories.service";

type IdParams = {
  id: string;
};

type SlugParams = {
  slug: string;
};

export class CategoriesController {

  static async create(req: Request, res: Response) {
    try {
      const category = await CategoriesService.create(req.body);

      res.status(201).json({
        message: "Category created",
        data: category,
      });

    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const categories = await CategoriesService.findAll();

      res.json({
        data: categories,
      });

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async html(req: Request, res: Response) {
    try {
      const categories = await CategoriesService.findAll();

      const data = categories.map((c: any) => ({
        _id: c._id,
        name: c.name,
        slug: c.slug,
        description: c.description,
      }));

      const columns = data.length > 0 ? Object.keys(data[0]) : [];

      res.render("endpoint", {
        title: "Categories API",
        apiRoutes: [
          { methods: "GET", path: "/api/categories" },
          { methods: "GET", path: "/api/categories/count" },
          { methods: "GET", path: "/api/categories/:id" },
          { methods: "GET", path: "/api/categories/slug/:slug" },
          { methods: "POST", path: "/api/categories" },
          { methods: "PATCH", path: "/api/categories/:id" },
          { methods: "DELETE", path: "/api/categories/:id" },
        ],
        columns,
        data,
      });

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async countAll(req: Request, res: Response) {
    try {
      const total = await CategoriesService.countAll();

      res.json({
        total,
      });

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getById(req: Request<IdParams>, res: Response) {
    try {
      const category = await CategoriesService.findById(req.params.id);

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      res.json({
        data: category,
      });

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getBySlug(req: Request<SlugParams>, res: Response) {
    try {
      const category = await CategoriesService.findBySlug(req.params.slug);

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      res.json({
        data: category,
      });

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async update(req: Request<IdParams>, res: Response) {
    try {
      const category = await CategoriesService.update(req.params.id, req.body);

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      res.json({
        message: "Category updated",
        data: category,
      });

    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async delete(req: Request<IdParams>, res: Response) {
    try {
      const category = await CategoriesService.delete(req.params.id);

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      res.json({
        message: "Category deleted",
      });

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

}   