import { OrderModel } from "../orders/orders.model";
import { PaymentModel } from "./payments.model";

export class PaymentsService {

  static async findAll() {

    return PaymentModel
      .find()
      .populate({
        path: "orderId",
        select: "_id totalPrice status paymentStatus"
      });

  }

  static async getAll() {
    return this.findAll();
  }

  static async getById(id: string) {

    return PaymentModel
      .findById(id)
      .populate("orderId");

  }

  static async pay(orderId: string, method: string) {

    const payment = await PaymentModel.create({
      orderId,
      method,
      status: "paid",
      paidAt: new Date()
    });

    await OrderModel.findByIdAndUpdate(
      orderId,
      { paymentStatus: "paid" }
    );

    return payment;
  }

  static async update(id: string, data: any) {

    return PaymentModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

  }

  static async delete(id: string) {

    return PaymentModel.findByIdAndDelete(id);

  }

}