import Hero from "../models/Hero.js";

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
