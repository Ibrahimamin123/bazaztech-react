import express from "express";
import {
  addService,
  getServices,
  getPublicServices,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/public", getPublicServices);
router.get("/", protect, getServices);
router.post("/", protect, addService);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

export default router;
