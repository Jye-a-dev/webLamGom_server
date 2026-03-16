import { Request, Response } from "express";
import { OrdersService } from "./orders.service";

type UserParams = {
  userId: string;
};

type OrderParams = {
  id: string;
};

type UserOrderParams = {
  userId: string;
  orderId: string;
};

export class OrdersController {

  static async html(req: Request, res: Response) {
    try {

      const orders = await OrdersService.getAll();

      const data = orders.map((o: any) => ({
        _id: o._id,
        userId: o.userId?._id,
        addressId: o.addressId?._id,
        totalPrice: o.totalPrice,
        status: o.status,
        paymentStatus: o.paymentStatus,
        createdAt: o.createdAt
      }));

      const columns = data.length > 0 ? Object.keys(data[0]) : [];

      res.render("endpoint", {
        title: "Orders API",
        apiRoutes: [
          { methods: "GET", path: "/api/orders" },
          { methods: "GET", path: "/api/orders/:id" },
          { methods: "GET", path: "/api/orders/user/:userId" },
          { methods: "POST", path: "/api/orders" },
          { methods: "PATCH", path: "/api/orders/:id" },
          { methods: "PATCH", path: "/api/orders/:id/status" },
          { methods: "PATCH", path: "/api/orders/user/:userId/:orderId" },
          { methods: "DELETE", path: "/api/orders/:id" }
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

  static async create(req: Request, res: Response) {
    try {

      const order = await OrdersService.create(
        req.body.userId,
        req.body.addressId
      );

      res.json({
        message: "Order created",
        data: order
      });

    } catch (error: any) {

      res.status(400).json({
        message: error.message
      });

    }
  }

  static async getAll(req: Request, res: Response) {

    const orders = await OrdersService.getAll();

    res.json({
      data: orders
    });
  }

  static async getUserOrders(req: Request<UserParams>, res: Response) {

    const orders = await OrdersService.getUserOrders(
      req.params.userId
    );

    res.json({
      data: orders
    });
  }

  static async getById(req: Request<OrderParams>, res: Response) {

    const order = await OrdersService.getById(req.params.id);

    res.json({
      data: order
    });
  }

  /**
   * UPDATE thường (admin)
   */
  static async update(req: Request<OrderParams>, res: Response) {

    const order = await OrdersService.update(
      req.params.id,
      req.body
    );

    res.json({
      message: "Order updated",
      data: order
    });
  }

  /**
   * UPDATE status
   */
  static async updateStatus(req: Request<OrderParams>, res: Response) {

    const order = await OrdersService.updateStatus(
      req.params.id,
      req.body.status
    );

    res.json({
      message: "Order status updated",
      data: order
    });
  }

  /**
   * UPDATE theo userId
   */
  static async updateByUserId(
    req: Request<UserOrderParams>,
    res: Response
  ) {

    const order = await OrdersService.updateByUserId(
      req.params.userId,
      req.params.orderId,
      req.body
    );

    res.json({
      message: "Order updated by user",
      data: order
    });
  }

  static async delete(req: Request<OrderParams>, res: Response) {

    await OrdersService.delete(req.params.id);

    res.json({
      message: "Order deleted"
    });
  }

}