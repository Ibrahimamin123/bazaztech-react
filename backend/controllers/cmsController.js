import { createCrudController } from "../utils/crudController.js";
import {
  validateEmail,
  validateRequired,
  validatePhone,
  sanitizeString,
} from "../utils/validate.js";
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
      const nameCheck = validateRequired(req.body.name, "Name", 80);
      const emailCheck = validateEmail(req.body.email);
      const messageCheck = validateRequired(req.body.message, "Message", 2000);
      const phoneCheck = validatePhone(req.body.phone);

      if (!nameCheck.valid || !emailCheck.valid || !messageCheck.valid || !phoneCheck.valid) {
        return res.status(400).json({
          success: false,
          message:
            nameCheck.message ||
            emailCheck.message ||
            messageCheck.message ||
            phoneCheck.message,
        });
      }

      const message = await Message.create({
        name: nameCheck.value,
        email: emailCheck.value,
        phone: phoneCheck.value,
        subject: sanitizeString(req.body.subject, 150),
        message: messageCheck.value,
      });

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
