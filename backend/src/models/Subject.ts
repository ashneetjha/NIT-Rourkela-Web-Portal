import { Schema, model, type InferSchemaType } from "mongoose";

const subjectSchema = new Schema(
  {
    _id: { type: String },
    code: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    credits: { type: Number, required: true },
    semester: { type: String, required: true },
    coordinatorEmail: { type: String, required: true },
  },
  { timestamps: true },
);

export type SubjectDocument = InferSchemaType<typeof subjectSchema>;
export const SubjectModel = model("Subject", subjectSchema);
