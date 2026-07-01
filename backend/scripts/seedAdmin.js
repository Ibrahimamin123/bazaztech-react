import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const existing = await Admin.findOne();

  if (existing) {
    console.log("Admin already exists:", existing.email);
    process.exit(0);
  }

  const password = await bcrypt.hash("Admin@123", 10);

  const admin = await Admin.create({
    name: "Super Admin",
    email: "admin@bazaztech.com",
    password,
    role: "Super Admin",
  });

  console.log("Default admin created:");
  console.log("Email:", admin.email);
  console.log("Password: Admin@123");
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
