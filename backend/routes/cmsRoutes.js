import express from "express";
import { createCrudRoutes } from "../utils/createCrudRoutes.js";
import {
  aboutController,
  teamController,
  caseStudyController,
  trainingController,
  testimonialController,
  faqController,
  socialController,
  messageController,
} from "../controllers/cmsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/about", createCrudRoutes(aboutController));
router.use("/team", createCrudRoutes(teamController));
router.use("/case-studies", createCrudRoutes(caseStudyController));
router.use("/training", createCrudRoutes(trainingController));
router.use("/testimonials", createCrudRoutes(testimonialController));
router.use("/faqs", createCrudRoutes(faqController));
router.use("/social", createCrudRoutes(socialController));

router.post("/messages", messageController.create);
router.get("/messages", protect, messageController.getAll);
router.get("/messages/:id", protect, messageController.getOne);
router.put("/messages/:id", protect, messageController.update);
router.delete("/messages/:id", protect, messageController.remove);

export default router;
