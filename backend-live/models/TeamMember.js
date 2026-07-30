import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: "" },
    bio: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    order: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("TeamMember", teamMemberSchema);
