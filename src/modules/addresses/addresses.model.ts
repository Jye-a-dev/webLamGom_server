import mongoose, { Schema } from "mongoose";
import { IAddress } from "./addresses.type";

const AddressSchema = new Schema<IAddress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    province: String,
    district: String,
    ward: String,
    detail: String,
  },
  {
    versionKey: false,
  }
);

export const AddressModel = mongoose.model<IAddress>(
  "Address",
  AddressSchema
);