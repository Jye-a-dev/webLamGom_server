import { ProductModel } from "./products.model";
import { IProduct } from "./products.type";

export class ProductsService {

  static async create(data: Partial<IProduct>) {
    return ProductModel.create(data);
  }

  static async findAll() {
    return ProductModel.find()
      .populate("categoryId", "name slug");
  }

  static async findById(id: string) {
    return ProductModel.findById(id)
      .populate("categoryId", "name slug");
  }

  static async findBySlug(slug: string) {
    return ProductModel.findOne({ slug })
      .populate("categoryId", "name slug");
  }

  static async update(id: string, data: Partial<IProduct>) {
    return ProductModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  static async delete(id: string) {
    return ProductModel.findByIdAndDelete(id);
  }

    static async countAll() {
    return ProductModel.countDocuments();
  }
}