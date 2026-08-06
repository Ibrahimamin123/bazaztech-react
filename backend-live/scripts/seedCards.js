import dotenv from "dotenv";
import connectDB from "../config/db.js";
import StatsCard from "../models/StatsCard.js";
import FooterCard from "../models/FooterCard.js";

dotenv.config();

const defaultStatsCards = [
  { useStars: true, value: "1200+", label: "Happy Clients", order: 1 },
  { title: "Trustpilot", value: "4.9", label: "Rating", order: 2 },
  { title: "Capterra", value: "4.8", label: "Reviews", order: 3 },
  { title: "Projects", value: "500+", label: "Delivered", order: 4 },
];

const defaultFooterCards = [
  { value: "10+", label: "Industries Served", order: 1 },
  { value: "100+", label: "Projects Delivered", order: 2 },
  { value: "100%", label: "Client Satisfaction", order: 3 },
  { value: "50+", label: "Professional Team", order: 4 },
  { value: "10 Years", label: "Market Experience", order: 5 },
];

const seedCards = async () => {
  await connectDB();

  const statsCount = await StatsCard.countDocuments();
  if (statsCount === 0) {
    await StatsCard.insertMany(defaultStatsCards);
    console.log(`Seeded ${defaultStatsCards.length} stats cards.`);
  } else {
    console.log(`Stats cards already exist (${statsCount}), skipping.`);
  }

  const footerCount = await FooterCard.countDocuments();
  if (footerCount === 0) {
    await FooterCard.insertMany(defaultFooterCards);
    console.log(`Seeded ${defaultFooterCards.length} footer cards.`);
  } else {
    console.log(`Footer cards already exist (${footerCount}), skipping.`);
  }

  process.exit(0);
};

seedCards().catch((err) => {
  console.error(err);
  process.exit(1);
});
