import Service from "../models/service.js";
import CaseStudy from "../models/CaseStudy.js";
import TeamMember from "../models/TeamMember.js";
import Message from "../models/Message.js";
import Admin from "../models/Admin.js";
import Testimonial from "../models/Testimonial.js";
import FAQ from "../models/FAQ.js";

export const getDashboardStats = async (_req, res) => {
  try {
    const [
      totalServices,
      totalCaseStudies,
      totalTeamMembers,
      totalMessages,
      totalAdmins,
      totalTestimonials,
      totalFaqs,
      recentMessages,
    ] = await Promise.all([
      Service.countDocuments(),
      CaseStudy.countDocuments(),
      TeamMember.countDocuments(),
      Message.countDocuments(),
      Admin.countDocuments(),
      Testimonial.countDocuments(),
      FAQ.countDocuments(),
      Message.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({
      success: true,
      stats: {
        totalServices,
        totalCaseStudies,
        totalTeamMembers,
        totalMessages,
        totalAdmins,
        totalTestimonials,
        totalFaqs,
      },
      recentMessages,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
