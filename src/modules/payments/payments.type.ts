import { Types } from "mongoose";

export interface IPayment {
  _id?: Types.ObjectId;

  orderId: Types.ObjectId;

  method: string;
  status: string;

  transactionId?: string;

  paidAt?: Date;
}