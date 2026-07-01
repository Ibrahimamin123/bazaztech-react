import { createCrudController } from "../utils/crudController.js";
import About from "../models/About.js";
import TeamMember from "../models/TeamMember.js";
import CaseStudy from "../models/CaseStudy.js";
import Training from "../models/Training.js";
import Testimonial from "../models/Testimonial.js";
import Message from "../models/Message.js";
import FAQ from "../models/FAQ.js";
import SocialLink from "../models/SocialLink.js";

export const aboutController = createCrudController(About, "aboutSections", "aboutSection");
export const teamController = createCrudController(TeamMember, "members", "member");
export const caseStudyController = createCrudController(CaseStudy, "caseStudies", "caseStudy");
export const trainingController = createCrudController(Training, "trainings", "training");
export const testimonialController = createCrudController(Testimonial, "testimonials", "testimonial");
export const faqController = createCrudController(FAQ, "faqs", "faq");
export const socialController = createCrudController(SocialLink, "socialLinks", "socialLink");

export const messageController = {
  ...createCrudController(Message, "messages"),
  create: async (req, res) => {
    try {
      const message = await Message.create(req.body);
      res.status(201).json({
        success: true,
        message: "Message sent successfully.",
        data: message,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
