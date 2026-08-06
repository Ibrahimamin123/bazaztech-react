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
    founderVideoUrl: {
      type: String,
      default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    youtubeChannelUrl: { type: String, default: "" },
    aboutHeading: { type: String, default: "About Us" },
    aboutSubtitle: {
      type: String,
      default: "Learn more about our company, vision, mission and the values that drive us.",
    },
    aboutDescription: { type: String, default: "" },
    founderImage: { type: String, default: "" },
    founderName: { type: String, default: "" },
    founderDesignation: { type: String, default: "Founder" },
    founderDescription: { type: String, default: "" },
    ceoImage: { type: String, default: "" },
    ceoName: { type: String, default: "" },
    ceoDesignation: { type: String, default: "Chief Executive Officer" },
    ceoDescription: { type: String, default: "" },
    missionTitle: { type: String, default: "Our Mission" },
    missionDescription: { type: String, default: "" },
    missionImage: { type: String, default: "" },
    visionTitle: { type: String, default: "Our Vision" },
    visionDescription: { type: String, default: "" },
    visionImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
