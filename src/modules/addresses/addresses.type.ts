import { Types } from "mongoose";

export interface IAddress {
  _id?: Types.ObjectId;

  userId: Types.ObjectId;

  name: string;
  phone: string;

  province: string;
  district: string;
  ward: string;

  detail: string;
}