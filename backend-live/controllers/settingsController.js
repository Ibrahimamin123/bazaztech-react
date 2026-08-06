import WebsiteSettings from "../models/WebsiteSettings.js";
import { validateEmail, validatePhone, sanitizeString, validateRequired, validateUrl } from "../utils/validate.js";

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

    if (payload.founderVideoUrl !== undefined) {
      const founderVideoCheck = validateUrl(payload.founderVideoUrl, "Founder video URL");
      if (!founderVideoCheck.valid) {
        return res.status(400).json({ success: false, message: founderVideoCheck.message });
      }
      payload.founderVideoUrl = founderVideoCheck.value;
    }

    if (payload.youtubeChannelUrl !== undefined) {
      const youtubeChannelCheck = validateUrl(payload.youtubeChannelUrl, "YouTube channel URL");
      if (!youtubeChannelCheck.valid) {
        return res.status(400).json({ success: false, message: youtubeChannelCheck.message });
      }
      payload.youtubeChannelUrl = youtubeChannelCheck.value;
    }

    payload.tagline = sanitizeString(payload.tagline, 200);

    if (payload.aboutHeading !== undefined) {
      const headingCheck = validateRequired(payload.aboutHeading, "About heading", 120);
      if (!headingCheck.valid) {
        return res.status(400).json({ success: false, message: headingCheck.message });
      }
      payload.aboutHeading = headingCheck.value;
    }
    if (payload.aboutSubtitle !== undefined) {
      payload.aboutSubtitle = sanitizeString(payload.aboutSubtitle, 300);
    }
    if (payload.aboutDescription !== undefined) {
      payload.aboutDescription = sanitizeString(payload.aboutDescription, 1000);
    }

    const profileFields = [
      { image: "founderImage", name: "founderName", designation: "founderDesignation", desc: "founderDescription", label: "Founder" },
      { image: "ceoImage", name: "ceoName", designation: "ceoDesignation", desc: "ceoDescription", label: "CEO" },
      { image: "missionImage", name: "missionTitle", designation: null, desc: "missionDescription", label: "Mission" },
      { image: "visionImage", name: "visionTitle", designation: null, desc: "visionDescription", label: "Vision" },
    ];

    for (const p of profileFields) {
      if (payload[p.image] !== undefined) {
        payload[p.image] = sanitizeString(payload[p.image], 500);
      }
      if (payload[p.name] !== undefined) {
        payload[p.name] = sanitizeString(payload[p.name], 100);
      }
      if (p.designation && payload[p.designation] !== undefined) {
        payload[p.designation] = sanitizeString(payload[p.designation], 100);
      }
      if (payload[p.desc] !== undefined) {
        payload[p.desc] = sanitizeString(payload[p.desc], 1000);
      }
    }

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
