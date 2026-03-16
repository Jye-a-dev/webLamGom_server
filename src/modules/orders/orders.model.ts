import mongoose, { Schema } from "mongoose";
import { IOrder } from "./orders.type";

const OrderItemSchema = new Schema(
{
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  quantity: Number,

  price: Number
},
{ _id: false }
);

const OrderSchema = new Schema<IOrder>(
{
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  addressId: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },

  items: [OrderItemSchema],

  totalPrice: Number,

  status: {
    type: String,
    default: "pending"
  },

  paymentStatus: {
    type: String,
    default: "unpaid"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
},
{ versionKey: false }
);

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);