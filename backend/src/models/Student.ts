import { Schema, model, type InferSchemaType } from "mongoose";

const studentSchema = new Schema(
  {
    _id: { type: String },
    rollNumber: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    program: { type: String, required: true },
    semester: { type: String, required: true },
    section: { type: String, required: true },
    advisor: { type: String, required: true },
    attendancePercentage: { type: Number, required: true },
    status: { type: String, required: true, enum: ["active", "pending", "completed"] },
  },
  { timestamps: true },
);

export type StudentDocument = InferSchemaType<typeof studentSchema>;
export const StudentModel = model("Student", studentSchema);
