import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    headline: { type: String, default: "Build. Launch. Scale. Grow." },
    subheadline: { type: String, default: "Your Digital Presence" },
    description: { type: String, default: "" },
    backgroundImage: { type: String, default: "" },
    ctaText: { type: String, default: "Get Started" },
    ctaLink: { type: String, default: "/contact" },
    stats: [
      {
        label: String,
        value: String,
      },
    ],
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hero", heroSchema);
