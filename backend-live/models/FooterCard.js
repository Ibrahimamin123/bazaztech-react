import mongoose from "mongoose";

// Powers the stat cards shown in the "Our Winning Deeds" section right
// above the Footer (e.g. "10+ Industries Served", "10 Years Market
// Experience").
const footerCardSchema = new mongoose.Schema(
  {
    value: { type: String, required: true }, // e.g. "10+", "10 Years"
    label: { type: String, required: true }, // e.g. "Industries Served"
    order: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("FooterCard", footerCardSchema);
