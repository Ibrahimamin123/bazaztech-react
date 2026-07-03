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
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/register", protect, authorize("Super Admin"), registerAdmin);
router.get("/", protect, authorize("Super Admin", "Admin"), getAdmins);
router.put("/:id", protect, authorize("Super Admin"), updateAdmin);
router.delete("/:id", protect, authorize("Super Admin"), deleteAdmin);

export default router;
