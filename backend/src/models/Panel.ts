import { Schema, model, type InferSchemaType } from "mongoose";

const panelSchema = new Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    venue: { type: String, required: true },
    status: { type: String, required: true, enum: ["scheduled", "in-review", "completed"] },
  },
  { timestamps: true },
);

export type PanelDocument = InferSchemaType<typeof panelSchema>;
export const PanelModel = model("Panel", panelSchema);
