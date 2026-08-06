import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // tab label, e.g. "Our Founder"
    text: { type: String, required: true }, // bio / section content
    name: { type: String, default: "" }, // person's name, e.g. "Ibrahim Amin" (optional — used for Founder/CEO)
    subtitle: { type: String, default: "" }, // role/subtitle shown under the name, e.g. "Founder & CEO" (optional)
    image: { type: String, default: "" }, // profile photo URL (optional)
    order: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
