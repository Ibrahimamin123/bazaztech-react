import Hero from "../models/Hero.js";
import { validateRequired, validateUrl } from "../utils/validate.js";

const validateHeroPayload = (payload) => {
  const headline = validateRequired(payload.headline, "Headline", 160);
  if (!headline.valid) return headline;

  const description = validateRequired(payload.description, "Description", 1200);
  if (!description.valid) return description;

  const image = validateRequired(payload.backgroundImage, "Background Image", 500);
  if (!image.valid) return image;

  const imageUrl = validateUrl(image.value, "Background Image URL", { required: true });
  if (!imageUrl.valid) return imageUrl;

  const ctaText = validateRequired(payload.ctaText, "CTA Text", 80);
  if (!ctaText.valid) return ctaText;

  const ctaLink = validateRequired(payload.ctaLink, "CTA Link", 300);
  if (!ctaLink.valid) return ctaLink;

  return { valid: true };
};

export const getHero = async (_req, res) => {
  try {
    const hero = await Hero.findOne({ status: true }).sort({ updatedAt: -1 });

    res.json({ success: true, hero });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllHeroes = async (_req, res) => {
  try {
    const heroes = await Hero.find().sort({ updatedAt: -1 });
    res.json({ success: true, heroes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const upsertHero = async (req, res) => {
  try {
    const validation = validateHeroPayload(req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    let hero = await Hero.findOne();

    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      hero = await Hero.create(req.body);
    }

    res.json({
      success: true,
      message: "Hero section saved successfully.",
      hero,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
