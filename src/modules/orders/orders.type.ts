import { Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  addressId: Types.ObjectId;

  items: IOrderItem[];

  totalPrice: number;

  status: string;
  paymentStatus: string;

  createdAt?: Date;
}