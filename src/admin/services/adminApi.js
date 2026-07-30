import API from "../../config/api";

export const loginAdmin = (data) => API.post("/admin/login", data);

export const getProfile = () => API.get("/admin/profile");
export const updateProfile = (data) => API.put("/admin/profile", data);

export const getAdmins = () => API.get("/admin");
export const registerAdmin = (data) => API.post("/admin/register", data);
export const updateAdmin = (id, data) => API.put(`/admin/${id}`, data);
export const deleteAdmin = (id) => API.delete(`/admin/${id}`);

export const getDashboardStats = () => API.get("/dashboard/stats");

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default API;
