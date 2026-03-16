import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./users.type";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    phone: { type: String },

    avatar: { type: String },

    isVerified: {
      type: Boolean,
      default: false
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

/* HASH PASSWORD */

UserSchema.pre("save", async function () {

  const user = this as any;

  if (!user.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

});

export const UserModel = mongoose.model<IUser>("User", UserSchema);