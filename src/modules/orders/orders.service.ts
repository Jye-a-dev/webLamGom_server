import { OrderModel } from "./orders.model";
import { CartModel } from "../carts/carts.model";

export class OrdersService {

  static async create(userId: string, addressId: string) {

    const cart = await CartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart empty");
    }

    const order = await OrderModel.create({
      userId,
      addressId,
      items: cart.items,
      totalPrice: cart.totalPrice
    });

    await CartModel.findOneAndUpdate(
      { userId },
      { items: [], totalPrice: 0 }
    );

    return order;
  }

  static async getAll() {

    return OrderModel
      .find()
      .populate("userId")
      .populate("items.productId")
      .populate("addressId");
  }

  static async getUserOrders(userId: string) {

    return OrderModel
      .find({ userId })
      .populate("items.productId")
      .populate("addressId");
  }

  static async getById(id: string) {

    return OrderModel
      .findById(id)
      .populate("items.productId")
      .populate("addressId");
  }

  /**
   * UPDATE thường (admin)
   */
  static async update(id: string, data: any) {

    return OrderModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    )
    .populate("items.productId")
    .populate("addressId");
  }

  /**
   * UPDATE status
   */
  static async updateStatus(id: string, status: string) {

    return OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }

  /**
   * UPDATE theo userId
   * user chỉ sửa order của mình
   */
  static async updateByUserId(userId: string, orderId: string, data: any) {

    return OrderModel.findOneAndUpdate(
      { _id: orderId, userId },
      data,
      { new: true }
    )
    .populate("items.productId")
    .populate("addressId");
  }

  static async delete(id: string) {

    return OrderModel.findByIdAndDelete(id);
  }

}