import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin, { ADMIN_PERMISSIONS } from "../models/Admin.js";

dotenv.config();

const ROLE_MIGRATIONS = {
  "Super Admin": "Super Administrator",
  Admin: "Administrator",
  Editor: "Content Editor",
};

const migrateLegacyAdmins = async () => {
  const legacyAdmins = await Admin.find({
    role: { $in: Object.keys(ROLE_MIGRATIONS) },
  });

  for (const admin of legacyAdmins) {
    await Admin.findByIdAndUpdate(admin._id, {
      role: ROLE_MIGRATIONS[admin.role],
      permissions: admin.permissions?.length ? admin.permissions : ADMIN_PERMISSIONS,
    });
    console.log(`Migrated role for ${admin.email}: ${admin.role} -> ${ROLE_MIGRATIONS[admin.role]}`);
  }
};

const seedAdmin = async () => {
  await connectDB();
  await migrateLegacyAdmins();

  const defaultEmail = "admin@bazaztech.com";
  const defaultPassword = "Admin@123";
  const resetPassword = process.argv.includes("--reset-password");
  const existing = await Admin.findOne({ email: defaultEmail });

  if (existing) {
    const updates = {};

    if (ROLE_MIGRATIONS[existing.role]) {
      updates.role = ROLE_MIGRATIONS[existing.role];
    }

    if (!existing.permissions?.length) {
      updates.permissions = ADMIN_PERMISSIONS;
    }

    if (existing.isActive === false) {
      updates.isActive = true;
    }

    if (resetPassword) {
      updates.password = await bcrypt.hash(defaultPassword, 10);
    }

    if (Object.keys(updates).length) {
      await Admin.findByIdAndUpdate(existing._id, updates);
      console.log("Existing admin updated:", defaultEmail, {
        ...updates,
        password: updates.password ? "[reset]" : undefined,
      });
    } else {
      console.log("Admin already exists:", existing.email);
    }

    if (resetPassword) {
      console.log(`Password reset to: ${defaultPassword}`);
    }

    process.exit(0);
  }

  const password = await bcrypt.hash(defaultPassword, 10);

  const admin = await Admin.create({
    name: "Super Administrator",
    email: defaultEmail,
    password,
    role: "Super Administrator",
    permissions: ADMIN_PERMISSIONS,
  });

  console.log("Default admin created:");
  console.log("Email:", admin.email);
  console.log(`Password: ${defaultPassword}`);
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
