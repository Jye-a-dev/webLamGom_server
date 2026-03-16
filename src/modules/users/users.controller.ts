import { Request, Response } from "express";
import { UsersService } from "./users.service";

type IdParams = {
  id: string;
};

export class UsersController {

  static async create(req: Request, res: Response) {
    try {

      const user = await UsersService.create(req.body);

      res.status(201).json({
        message: "User created",
        data: user
      });

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

  static async getAll(req: Request, res: Response) {
    try {

      const users = await UsersService.findAll();

      res.json({
        data: users
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message
      });

    }
  }

  /* COUNT USERS */

  static async countAll(req: Request, res: Response) {
    try {

      const total = await UsersService.countAll();

      res.json({
        total
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message
      });

    }
  }

  /* ===== HTML VIEW ===== */

  static async html(req: Request, res: Response) {
    try {

      const users = await UsersService.findAll();

      const data = users.map((u: any) => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        phone: u.phone,
        isVerified: u.isVerified
      }));

      const columns =
        data.length > 0
          ? Object.keys(data[0])
          : [];

      res.render("endpoint", {
        title: "Users API",
        apiRoutes: [
          { methods: "GET", path: "/api/users" },
          { methods: "GET", path: "/api/users/count" },
          { methods: "GET", path: "/api/users/:id" },
          { methods: "POST", path: "/api/users" },
          { methods: "PATCH", path: "/api/users/:id" },
          { methods: "DELETE", path: "/api/users/:id" }
        ],
        columns,
        data
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message
      });

    }
  }

  static async getById(req: Request<IdParams>, res: Response) {
    try {

      const user = await UsersService.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json({
        data: user
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message
      });

    }
  }

  static async update(req: Request<IdParams>, res: Response) {
    try {

      const user = await UsersService.update(
        req.params.id,
        req.body
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json({
        message: "User updated",
        data: user
      });

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

  static async delete(req: Request<IdParams>, res: Response) {
    try {

      const user = await UsersService.delete(
        req.params.id
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json({
        message: "User deleted"
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message
      });

    }
  }

}