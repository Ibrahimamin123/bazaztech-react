import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: "" },
    description: { type: String, required: true },
    results: [{ type: String }],
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", caseStudySchema);
