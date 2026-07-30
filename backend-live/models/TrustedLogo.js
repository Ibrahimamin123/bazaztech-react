import mongoose from "mongoose";

// Powers the logo cards in the "Trusted by Happy Customers" marquee on the
// homepage, right below the Hero section.
const trustedLogoSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" }, // e.g. "Swiss Treatment" (used as alt text)
    image: { type: String, required: true }, // uploaded logo image URL
    order: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("TrustedLogo", trustedLogoSchema);
