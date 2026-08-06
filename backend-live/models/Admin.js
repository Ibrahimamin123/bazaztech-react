import mongoose from "mongoose";

export const ADMIN_ROLES = [
  "Super Administrator",
  "Administrator",
  "Content Manager",
  "Content Editor",
  "Operations Manager",
  "Support Manager",
];

export const ADMIN_PERMISSIONS = [
  "dashboard_access",
  "create_records",
  "edit_records",
  "delete_records",
  "view_records",
  "manage_users",
  "manage_admins",
  "manage_messages",
  "manage_website_settings",
  "manage_case_studies",
  "manage_services",
  "manage_training_programs",
  "manage_contact_information",
  "manage_media",
  "full_access",
];

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ADMIN_ROLES,
      default: "Administrator",
    },
    permissions: [
      {
        type: String,
        enum: ADMIN_PERMISSIONS,
      },
    ],

    avatar: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;