import mongoose from "mongoose";

// Powers the 4 stat cards shown inside the Hero section (e.g. "1200+ Happy
// Clients", "Trustpilot 4.9 Rating"). `useStars` renders a 5-star row above
// the value (used for the "Happy Clients" style card); otherwise `title`
// (e.g. "Trustpilot") is shown above the value instead.
const statsCardSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" }, // e.g. "Trustpilot" (optional)
    value: { type: String, required: true }, // e.g. "1200+", "4.9"
    label: { type: String, default: "" }, // e.g. "Happy Clients", "Rating" (optional — legacy second line)
    icon: { type: String, default: "" }, // react-icons name, e.g. "FaRocket" (legacy, kept for older cards)
    image: { type: String, default: "" }, // uploaded icon/illustration image URL
    useStars: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("StatsCard", statsCardSchema);
