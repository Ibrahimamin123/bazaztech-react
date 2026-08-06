import Service from "../models/service.js";
import { validateRequired, validateUrl } from "../utils/validate.js";

const validateServicePayload = (payload, { partial = false } = {}) => {
  if (!partial || payload.title !== undefined) {
    const title = validateRequired(payload.title, "Title", 120);
    if (!title.valid) return title;
  }
  if (!partial || payload.description !== undefined) {
    const description = validateRequired(payload.description, "Description", 1200);
    if (!description.valid) return description;
  }
  if (!partial || payload.image !== undefined) {
    const image = validateRequired(payload.image, "Image", 500);
    if (!image.valid) return image;
    const imageUrl = validateUrl(image.value, "Image URL", { required: true });
    if (!imageUrl.valid) return imageUrl;
  }
  return { valid: true };
};

export const addService = async (req, res) => {
  try {
    const validation = validateServicePayload(req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      service,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getServices = async (_req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPublicServices = async (_req, res) => {
  try {
    const services = await Service.find({ status: true }).sort({ createdAt: -1 });

    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const validation = validateServicePayload(req.body, { partial: true });
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    res.json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    res.json({ success: true, message: "Service deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
