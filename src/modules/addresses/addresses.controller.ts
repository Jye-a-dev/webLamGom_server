import { Request, Response } from "express";
import { AddressesService } from "./addresses.service";

type UserParams = {
  userId: string;
};

type AddressParams = {
  id: string;
};

export class AddressesController {

  static async create(req: Request, res: Response) {
    try {

      const address = await AddressesService.create(req.body);

      res.status(201).json({
        message: "Address created",
        data: address,
      });

    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async getByUser(req: Request<UserParams>, res: Response) {
    try {

      const addresses = await AddressesService.findByUser(
        req.params.userId
      );

      res.json({
        data: addresses,
      });

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async update(req: Request<AddressParams>, res: Response) {
    try {

      const address = await AddressesService.update(
        req.params.id,
        req.body
      );

      res.json({
        message: "Address updated",
        data: address,
      });

    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async delete(req: Request<AddressParams>, res: Response) {
    try {

      await AddressesService.delete(req.params.id);

      res.json({
        message: "Address deleted",
      });

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}