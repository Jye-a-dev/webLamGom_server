import mongoose, { Schema } from "mongoose";
import { IPayment } from "./payments.type";

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    method: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "pending"
    },

    transactionId: String,

    paidAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const PaymentModel = mongoose.model<IPayment>(
  "Payment",
  PaymentSchema
);