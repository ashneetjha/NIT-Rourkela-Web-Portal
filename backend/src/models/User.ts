import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "coordinator", "faculty"] },
    department: { type: String, required: true },
    avatarUrl: { type: String, required: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = model("User", userSchema);
