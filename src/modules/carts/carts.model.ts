import mongoose, { Schema } from "mongoose";
import { ICart } from "./carts.type";

const CartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [CartItemSchema],

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

export const CartModel = mongoose.model<ICart>("Cart", CartSchema);