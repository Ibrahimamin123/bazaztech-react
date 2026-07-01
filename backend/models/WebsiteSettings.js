import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "BazazTech" },
    tagline: { type: String, default: "" },
    logo: { type: String, default: "" },
    email: { type: String, default: "info@bazaztech.com" },
    phone: { type: String, default: "+92 327 8445721" },
    address: {
      type: String,
      default:
        "CM 67 mezzanine floor, Shamsi Society near Malir Halt, Karachi, Pakistan",
    },
    footerText: {
      type: String,
      default:
        "Bazaz Tech is a creative digital agency providing modern web development and business solutions.",
    },
    copyright: { type: String, default: "© 2026 Bazaz Tech. All Rights Reserved." },
    whatsapp: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
