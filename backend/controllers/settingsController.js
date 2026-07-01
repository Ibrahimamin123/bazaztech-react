import WebsiteSettings from "../models/WebsiteSettings.js";

export const getSettings = async (_req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = await WebsiteSettings.create({});
    }

    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();

    if (settings) {
      settings = await WebsiteSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      settings = await WebsiteSettings.create(req.body);
    }

    res.json({
      success: true,
      message: "Settings updated successfully.",
      settings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
