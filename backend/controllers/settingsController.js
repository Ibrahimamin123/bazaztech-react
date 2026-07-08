import WebsiteSettings from "../models/WebsiteSettings.js";
import { validateEmail, validatePhone, sanitizeString, validateRequired } from "../utils/validate.js";

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
    const payload = { ...req.body };

    const siteNameCheck = validateRequired(payload.siteName, "Site name", 100);
    if (!siteNameCheck.valid) {
      return res.status(400).json({ success: false, message: siteNameCheck.message });
    }
    payload.siteName = siteNameCheck.value;

    if (payload.email) {
      const emailCheck = validateEmail(payload.email);
      if (!emailCheck.valid) {
        return res.status(400).json({ success: false, message: emailCheck.message });
      }
      payload.email = emailCheck.value;
    }

    if (payload.phone) {
      const phoneCheck = validatePhone(payload.phone);
      if (!phoneCheck.valid) {
        return res.status(400).json({ success: false, message: phoneCheck.message });
      }
      payload.phone = phoneCheck.value;
    }

    if (payload.whatsapp) {
      payload.whatsapp = sanitizeString(payload.whatsapp, 30);
    }

    payload.tagline = sanitizeString(payload.tagline, 200);

    let settings = await WebsiteSettings.findOne();

    if (settings) {
      settings = await WebsiteSettings.findByIdAndUpdate(settings._id, payload, {
        new: true,
        runValidators: true,
      });
    } else {
      settings = await WebsiteSettings.create(payload);
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
