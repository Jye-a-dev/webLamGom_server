import { CartModel } from "./carts.model";
import { Types } from "mongoose";

export class CartsService {

  static calcTotal(items: any[]) {
    return items.reduce((sum: number, i: any) => {
      return sum + (i.price || 0) * i.quantity;
    }, 0);
  }

  static async getAll() {
    return CartModel
      .find()
      .populate("userId")
      .populate("items.productId");
  }

  static async getCart(userId: string) {

    const cart = await CartModel
      .findOne({ userId })
      .populate("items.productId");

    if (!cart) return null;

    cart.totalPrice = this.calcTotal(cart.items);

    return cart;
  }

  static async addItem(userId: string, item: any) {

    let cart = await CartModel.findOne({ userId });

    if (!cart) {

      cart = await CartModel.create({
        userId,
        items: [item],
        totalPrice: (item.price || 0) * item.quantity
      });

      return cart;
    }

    const existItem = cart.items.find(
      (i) => i.productId.toString() === item.productId.toString()
    );

    if (existItem) {
      existItem.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    cart.totalPrice = this.calcTotal(cart.items);

    await cart.save();

    return cart;
  }

  static async updateItem(userId: string, productId: string, quantity: number) {

    const cart = await CartModel.findOne({ userId });

    if (!cart) return null;

    const item = cart.items.find(
      (i) => i.productId.toString() === productId.toString()
    );

    if (!item) return null;

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId.toString()
      );
    } else {
      item.quantity = quantity;
    }

    cart.totalPrice = this.calcTotal(cart.items);

    await cart.save();

    return cart;
  }

  static async removeItem(userId: string, productId: string) {

    const cart = await CartModel.findOne({ userId });

    if (!cart) return null;

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId.toString()
    );

    cart.totalPrice = this.calcTotal(cart.items);

    await cart.save();

    return cart;
  }

  static async clearCart(userId: string) {

    return CartModel.findOneAndUpdate(
      { userId },
      {
        items: [],
        totalPrice: 0
      },
      { new: true }
    );
  }
}