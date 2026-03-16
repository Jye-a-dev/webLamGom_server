import mongoose, { Schema } from "mongoose";
import { ICategory } from "./categories.type";

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },
  },
  { versionKey: false }
);

export const CategoryModel = mongoose.model<ICategory>(
  "Category",
  CategorySchema
);