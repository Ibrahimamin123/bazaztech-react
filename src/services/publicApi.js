import API from "../config/api";

export const getPublicServices = () => API.get("/services/public");
export const getPublicAbout = () => API.get("/cms/about/public");
export const getPublicTeam = () => API.get("/cms/team/public");
export const getPublicCaseStudies = () => API.get("/cms/case-studies/public");
export const getPublicTraining = () => API.get("/cms/training/public");
export const getPublicTestimonials = () => API.get("/cms/testimonials/public");
export const getPublicFaqs = () => API.get("/cms/faqs/public");
export const getPublicSocial = () => API.get("/cms/social/public");
export const getPublicSettings = () => API.get("/settings/public");
export const getPublicHero = () => API.get("/hero/public");

export const submitContactMessage = (data) => API.post("/cms/messages", data);
