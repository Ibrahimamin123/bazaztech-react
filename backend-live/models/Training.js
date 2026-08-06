import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    additionalImages: { type: [String], default: [] },
    section: {
      type: String,
      enum: ["hero", "feature", "program"],
      default: "program",
    },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Training", trainingSchema);
