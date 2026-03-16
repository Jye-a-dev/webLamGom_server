import { CategoryModel } from "./categories.model";
import { ICategory } from "./categories.type";

export class CategoriesService {

  static async create(data: Partial<ICategory>) {
    return CategoryModel.create(data);
  }

  static async findAll() {
    return CategoryModel.find();
  }

  static async findById(id: string) {
    return CategoryModel.findById(id);
  }

  static async findBySlug(slug: string) {
    return CategoryModel.findOne({ slug });
  }

  static async update(id: string, data: Partial<ICategory>) {
    return CategoryModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  static async delete(id: string) {
    return CategoryModel.findByIdAndDelete(id);
  }

  static async countAll() {
    return CategoryModel.countDocuments();
  }

}