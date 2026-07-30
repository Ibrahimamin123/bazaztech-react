import { createCrudController } from "../utils/crudController.js";
import {
  validateEmail,
  validateNumber,
  validatePhone,
  validateRequired,
  validateUrl,
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
import StatsCard from "../models/StatsCard.js";
import FooterCard from "../models/FooterCard.js";
import TrustedLogo from "../models/TrustedLogo.js";

const withValidation = (baseController, validator) => ({
  ...baseController,
  create: async (req, res) => {
    const result = validator(req.body);
    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message });
    }
    req.body = { ...req.body, ...result.data };
    return baseController.create(req, res);
  },
  update: async (req, res) => {
    const result = validator(req.body, { partial: true });
    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message });
    }
    req.body = { ...req.body, ...result.data };
    return baseController.update(req, res);
  },
});

const validateCaseStudy = (payload, { partial = false } = {}) => {
  if (!partial || payload.title !== undefined) {
    const title = validateRequired(payload.title, "Title", 120);
    if (!title.valid) return title;
  }
  if (!partial || payload.description !== undefined) {
    const description = validateRequired(payload.description, "Description", 1000);
    if (!description.valid) return description;
  }
  if (!partial || payload.image !== undefined) {
    const image = validateRequired(payload.image, "Image", 500);
    if (!image.valid) return image;
    const imageUrl = validateUrl(image.value, "Image URL", { required: true });
    if (!imageUrl.valid) return imageUrl;
  }
  return { valid: true, data: {} };
};

const validateTraining = (payload, { partial = false } = {}) => {
  if (!partial || payload.title !== undefined) {
    const title = validateRequired(payload.title, "Title", 120);
    if (!title.valid) return title;
  }
  if (!partial || payload.description !== undefined) {
    const description = validateRequired(payload.description, "Description", 1000);
    if (!description.valid) return description;
  }
  if (payload.subtitle !== undefined && payload.subtitle) {
    const subtitle = sanitizeString(payload.subtitle, 200);
    if (!subtitle) {
      return { valid: false, message: "Subtitle is too long." };
    }
  }
  if (!partial || payload.image !== undefined) {
    const image = validateRequired(payload.image, "Image", 500);
    if (!image.valid) return image;
    const imageUrl = validateUrl(image.value, "Image URL", { required: true });
    if (!imageUrl.valid) return imageUrl;
  }
  if (payload.additionalImages !== undefined) {
    if (!Array.isArray(payload.additionalImages)) {
      return { valid: false, message: "Additional images must be a list of image URLs." };
    }
    for (const url of payload.additionalImages) {
      const imageUrl = validateUrl(url, "Additional image URL", { required: true });
      if (!imageUrl.valid) return imageUrl;
    }
  }
  if (payload.section !== undefined) {
    const sections = ["hero", "feature", "program"];
    if (!sections.includes(payload.section)) {
      return { valid: false, message: "Section must be hero, feature, or program." };
    }
  }
  return { valid: true, data: {} };
};

const validateSocial = (payload, { partial = false } = {}) => {
  if (!partial || payload.platform !== undefined) {
    const platform = validateRequired(payload.platform, "Platform", 60);
    if (!platform.valid) return platform;
  }
  if (!partial || payload.url !== undefined) {
    const url = validateUrl(payload.url, "URL", { required: true });
    if (!url.valid) return url;
  }
  return { valid: true, data: {} };
};

const validateAbout = (payload, { partial = false } = {}) => {
  if (!partial || payload.title !== undefined) {
    const title = validateRequired(payload.title, "Title", 120);
    if (!title.valid) return title;
  }
  if (!partial || payload.text !== undefined) {
    const text = validateRequired(payload.text, "Content", 2000);
    if (!text.valid) return text;
  }
  if (payload.name !== undefined && payload.name) {
    const name = validateRequired(payload.name, "Name", 120);
    if (!name.valid) return name;
  }
  if (payload.subtitle !== undefined && payload.subtitle) {
    const subtitle = validateRequired(payload.subtitle, "Subtitle", 120);
    if (!subtitle.valid) return subtitle;
  }
  if (payload.image !== undefined && payload.image) {
    const image = validateUrl(payload.image, "Image URL", { required: true });
    if (!image.valid) return image;
  }
  if (payload.order !== undefined) {
    const order = validateNumber(payload.order, "Order", { min: 0, integer: true });
    if (!order.valid) return order;
  }
  return { valid: true, data: {} };
};

const validateFaq = (payload, { partial = false } = {}) => {
  if (!partial || payload.question !== undefined) {
    const question = validateRequired(payload.question, "Question", 220);
    if (!question.valid) return question;
  }
  if (!partial || payload.answer !== undefined) {
    const answer = validateRequired(payload.answer, "Answer", 1500);
    if (!answer.valid) return answer;
  }
  if (payload.order !== undefined) {
    const order = validateNumber(payload.order, "Order", { min: 0, integer: true });
    if (!order.valid) return order;
  }
  return { valid: true, data: {} };
};

const validateTeam = (payload, { partial = false } = {}) => {
  if (!partial || payload.name !== undefined) {
    const name = validateRequired(payload.name, "Name", 80);
    if (!name.valid) return name;
  }
  if (!partial || payload.role !== undefined) {
    const role = validateRequired(payload.role, "Role", 80);
    if (!role.valid) return role;
  }
  if (!partial || payload.image !== undefined) {
    const image = validateRequired(payload.image, "Photo", 500);
    if (!image.valid) return image;
    const imageUrl = validateUrl(image.value, "Photo URL", { required: true });
    if (!imageUrl.valid) return imageUrl;
  }
  if (payload.linkedin !== undefined && payload.linkedin) {
    const linkedin = validateUrl(payload.linkedin, "LinkedIn URL");
    if (!linkedin.valid) return linkedin;
  }
  return { valid: true, data: {} };
};

const validateTestimonial = (payload, { partial = false } = {}) => {
  if (!partial || payload.name !== undefined) {
    const name = validateRequired(payload.name, "Client Name", 80);
    if (!name.valid) return name;
  }
  if (!partial || payload.message !== undefined) {
    const message = validateRequired(payload.message, "Testimonial", 1200);
    if (!message.valid) return message;
  }
  if (!partial || payload.image !== undefined) {
    const image = validateRequired(payload.image, "Photo", 500);
    if (!image.valid) return image;
    const imageUrl = validateUrl(image.value, "Photo URL", { required: true });
    if (!imageUrl.valid) return imageUrl;
  }
  if (!partial || payload.rating !== undefined) {
    const rating = validateNumber(payload.rating, "Rating", {
      required: true,
      min: 1,
      max: 5,
      integer: true,
    });
    if (!rating.valid) return rating;
  }
  return { valid: true, data: {} };
};

const validateStatsCard = (payload, { partial = false } = {}) => {
  if (!partial || payload.value !== undefined) {
    const value = validateRequired(payload.value, "Value", 80);
    if (!value.valid) return value;
  }
  if (payload.label !== undefined && payload.label) {
    const label = validateRequired(payload.label, "Label", 80);
    if (!label.valid) return label;
  }
  if (payload.title !== undefined && payload.title) {
    const title = validateRequired(payload.title, "Title", 80);
    if (!title.valid) return title;
  }
  if (payload.icon !== undefined && payload.icon) {
    const icon = validateRequired(payload.icon, "Icon", 60);
    if (!icon.valid) return icon;
  }
  if (payload.image !== undefined && payload.image) {
    const imageUrl = validateUrl(payload.image, "Image URL");
    if (!imageUrl.valid) return imageUrl;
  }
  if (payload.order !== undefined) {
    const order = validateNumber(payload.order, "Order", { min: 0, integer: true });
    if (!order.valid) return order;
  }
  return { valid: true, data: {} };
};

const validateFooterCard = (payload, { partial = false } = {}) => {
  if (!partial || payload.value !== undefined) {
    const value = validateRequired(payload.value, "Value", 40);
    if (!value.valid) return value;
  }
  if (!partial || payload.label !== undefined) {
    const label = validateRequired(payload.label, "Label", 80);
    if (!label.valid) return label;
  }
  if (payload.order !== undefined) {
    const order = validateNumber(payload.order, "Order", { min: 0, integer: true });
    if (!order.valid) return order;
  }
  return { valid: true, data: {} };
};

const validateTrustedLogo = (payload, { partial = false } = {}) => {
  if (!partial || payload.image !== undefined) {
    const image = validateRequired(payload.image, "Image", 500);
    if (!image.valid) return image;
    const imageUrl = validateUrl(image.value, "Image URL", { required: true });
    if (!imageUrl.valid) return imageUrl;
  }
  if (payload.name !== undefined && payload.name) {
    const name = validateRequired(payload.name, "Name", 80);
    if (!name.valid) return name;
  }
  if (payload.order !== undefined) {
    const order = validateNumber(payload.order, "Order", { min: 0, integer: true });
    if (!order.valid) return order;
  }
  return { valid: true, data: {} };
};

export const statsCardController = withValidation(
  createCrudController(StatsCard, "statsCards", "statsCard"),
  validateStatsCard
);
export const footerCardController = withValidation(
  createCrudController(FooterCard, "footerCards", "footerCard"),
  validateFooterCard
);
export const trustedLogoController = withValidation(
  createCrudController(TrustedLogo, "trustedLogos", "trustedLogo"),
  validateTrustedLogo
);

export const aboutController = withValidation(
  createCrudController(About, "aboutSections", "aboutSection"),
  validateAbout
);
export const teamController = withValidation(
  createCrudController(TeamMember, "members", "member"),
  validateTeam
);
export const caseStudyController = withValidation(
  createCrudController(CaseStudy, "caseStudies", "caseStudy"),
  validateCaseStudy
);
export const trainingController = withValidation(
  createCrudController(Training, "trainings", "training"),
  validateTraining
);
export const testimonialController = withValidation(
  createCrudController(Testimonial, "testimonials", "testimonial"),
  validateTestimonial
);
export const faqController = withValidation(createCrudController(FAQ, "faqs", "faq"), validateFaq);
export const socialController = withValidation(
  createCrudController(SocialLink, "socialLinks", "socialLink"),
  validateSocial
);
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
