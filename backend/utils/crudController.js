export const createCrudController = (Model, resourceName, singularName) => {
  const singular = singularName || resourceName.replace(/s$/, "");

  return {
  getAll: async (_req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json({ success: true, [resourceName]: items });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getPublic: async (_req, res) => {
    try {
      const items = await Model.find({ status: true }).sort({ order: 1, createdAt: -1 });
      res.json({ success: true, [resourceName]: items });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);

      if (!item) {
        return res.status(404).json({ success: false, message: "Not found." });
      }

      res.json({ success: true, [singular]: item });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({
        success: true,
        message: "Created successfully.",
        [singular]: item,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!item) {
        return res.status(404).json({ success: false, message: "Not found." });
      }

      res.json({
        success: true,
        message: "Updated successfully.",
        [singular]: item,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);

      if (!item) {
        return res.status(404).json({ success: false, message: "Not found." });
      }

      res.json({ success: true, message: "Deleted successfully." });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  };
};
