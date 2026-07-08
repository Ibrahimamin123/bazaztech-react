import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getProfile,
  updateProfile,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";
import { protect, authorize, attachAdmin, authorizePermissions } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post(
  "/register",
  protect,
  attachAdmin,
  authorize("Super Administrator"),
  authorizePermissions("manage_admins"),
  registerAdmin
);
router.get("/", protect, attachAdmin, authorizePermissions("manage_admins"), getAdmins);
router.put("/:id", protect, attachAdmin, authorizePermissions("manage_admins"), updateAdmin);
router.delete("/:id", protect, attachAdmin, authorizePermissions("manage_admins"), deleteAdmin);

export default router;
