import { UserModel } from "./users.model";
import { IUser } from "./users.type";

export class UsersService {

  static async create(data: Partial<IUser>) {
    return UserModel.create(data);
  }

  static async findAll() {
    return UserModel.find().select("-password");
  }

  static async findById(id: string) {
    return UserModel.findById(id).select("-password");
  }

  static async update(id: string, data: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    ).select("-password");
  }

  static async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }

    static async countAll() {
    return UserModel.countDocuments();
  }
}