import API from "../../config/api";

export const getServices = () => API.get("/services");
export const getPublicServices = () => API.get("/services/public");
export const addService = (data) => API.post("/services", data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);
