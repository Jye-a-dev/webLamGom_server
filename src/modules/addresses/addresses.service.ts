import { AddressModel } from "./addresses.model";

export class AddressesService {

  static async create(data: any) {
    return AddressModel.create(data);
  }

  static async findByUser(userId: string) {
    return AddressModel.find({ userId });
  }

  static async update(id: string, data: any) {
    return AddressModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  static async delete(id: string) {
    return AddressModel.findByIdAndDelete(id);
  }
}