import express from "express";
import { protect } from "../middleware/authMiddleware.js";

export const createCrudRoutes = (controller, { publicRead = true } = {}) => {
  const router = express.Router();

  if (publicRead) {
    router.get("/public", controller.getPublic);
  }

  router.get("/", protect, controller.getAll);
  router.get("/:id", protect, controller.getOne);
  router.post("/", protect, controller.create);
  router.put("/:id", protect, controller.update);
  router.delete("/:id", protect, controller.remove);

  return router;
};
