import API from "../../config/api";

const cms = (resource) => ({
  getAll: () => API.get(`/cms/${resource}`),
  getPublic: () => API.get(`/cms/${resource}/public`),
  create: (data) => API.post(`/cms/${resource}`, data),
  update: (id, data) => API.put(`/cms/${resource}/${id}`, data),
  remove: (id) => API.delete(`/cms/${resource}/${id}`),
});

export const aboutApi = cms("about");
export const teamApi = cms("team");
export const caseStudyApi = cms("case-studies");
export const trainingApi = cms("training");
export const testimonialApi = cms("testimonials");
export const faqApi = cms("faqs");
export const socialApi = cms("social");
export const statsCardApi = cms("stats-cards");
export const footerCardApi = cms("footer-cards");
export const trustedLogoApi = cms("trusted-logos");

export const getSettings = () => API.get("/settings/public");
export const updateSettings = (data) => API.put("/settings", data);
export const getAdminSettings = () => API.get("/settings");

export const getHero = () => API.get("/hero/public");
export const saveHero = (data) => API.put("/hero", data);

export const getMessages = () => API.get("/cms/messages");
export const updateMessage = (id, data) => API.put(`/cms/messages/${id}`, data);
export const deleteMessage = (id) => API.delete(`/cms/messages/${id}`);
