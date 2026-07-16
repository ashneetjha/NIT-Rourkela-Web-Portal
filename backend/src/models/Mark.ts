import { Schema, model, type InferSchemaType } from "mongoose";

const markSchema = new Schema(
  {
    _id: { type: String },
    studentRollNumber: { type: String, required: true },
    subjectCode: { type: String, required: true },
    internal: { type: Number, required: true },
    external: { type: Number, required: true },
    viva: { type: Number, required: true },
    status: { type: String, required: true, enum: ["pending", "submitted", "approved"] },
    remarks: { type: String, required: true },
  },
  { timestamps: true },
);

export type MarkDocument = InferSchemaType<typeof markSchema>;
export const MarkModel = model("Mark", markSchema);
