import express from "express";
import { getHero, getAllHeroes, upsertHero } from "../controllers/heroController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/public", getHero);
router.get("/", protect, getAllHeroes);
router.post("/", protect, upsertHero);
router.put("/", protect, upsertHero);

export default router;
