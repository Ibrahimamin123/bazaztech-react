import Service from "../models/service.js";

export const addService = async (req, res) => {
  try {
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
    const services = await Service.find().sort({ order: 1, createdAt: -1 });

    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPublicServices = async (_req, res) => {
  try {
    const services = await Service.find({ status: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
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
