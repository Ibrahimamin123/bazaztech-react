import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { getProfile, updateProfile, uploadImage } from "../services/adminApi";
import { useAdmin } from "../context/AdminContext";
import {
  collectErrors,
  hasErrors,
  validateEmail,
  validateImageFile,
  validateMaxLength,
  validatePassword,
  validateRequired,
} from "../../utils/validation";

const ProfileAdmin = () => {
  const { syncAdmin } = useAdmin();
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => {
        const admin = res.data.admin;
        setForm((prev) => ({
          ...prev,
          name: admin.name || "",
          email: admin.email || "",
          avatar: admin.avatar || "",
        }));
      })
      .catch(() => Swal.fire("Error", "Failed to load profile.", "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileError = validateImageFile(file);
    if (fileError) {
      setErrors((prev) => ({ ...prev, avatar: fileError }));
      return;
    }

    try {
      setUploading(true);
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, avatar: res.data.imageUrl }));
    } catch {
      Swal.fire("Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const nextErrors = collectErrors([
      { field: "name", message: validateRequired(form.name, "Name") },
      { field: "email", message: validateEmail(form.email) },
      { field: "name", message: validateMaxLength(form.name, 80, "Name") },
      {
        field: "password",
        message: form.password
          ? validatePassword(form.password, { minLength: 6 })
          : "",
      },
      {
        field: "confirmPassword",
        message:
          form.password && form.password !== form.confirmPassword
            ? "Passwords do not match."
            : "",
      },
      {
        field: "currentPassword",
        message:
          form.password && !form.currentPassword
            ? "Current password is required to change password."
            : "",
      },
    ]);

    setErrors(nextErrors);
    return !hasErrors(nextErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        avatar: form.avatar,
      };

      if (form.password) {
        payload.password = form.password;
        payload.currentPassword = form.currentPassword;
      }

      const res = await updateProfile(payload);
      syncAdmin(res.data.admin);
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }));

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Update failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="My Profile">
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-4">
          <p className="text-muted mb-0">Update your account details and profile picture.</p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : (
          <div className="table-card profile-card">
            <form onSubmit={handleSubmit}>
              <div className="row g-4 align-items-start">
                <div className="col-md-4 text-center">
                  <div className="profile-avatar-wrap mx-auto">
                    <img
                      src={
                        form.avatar ||
                        "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(form.name || "Admin") +
                          "&background=0D6EFD&color=fff"
                      }
                      alt="Profile"
                      className="profile-avatar-lg"
                    />
                  </div>
                  <label className="btn btn-outline-primary btn-sm mt-3">
                    {uploading ? "Uploading..." : "Change Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                    />
                  </label>
                  <small className="text-muted d-block mt-2" style={{ whiteSpace: "pre-line" }}>
                    Maximum File Size: 1 MB
                    {"\n"}Recommended Dimensions: 400 × 400 px
                    {"\n"}Width: 400 px
                    {"\n"}Height: 400 px
                  </small>
                  {errors.avatar && (
                    <div className="text-danger small mt-2">{errors.avatar}</div>
                  )}
                </div>

                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="invalid-feedback d-block">{errors.name}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback d-block">{errors.email}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <hr />
                      <h6 className="mb-3">Change Password (optional)</h6>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        className={`form-control ${errors.currentPassword ? "is-invalid" : ""}`}
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                      />
                      {errors.currentPassword && (
                        <div className="invalid-feedback d-block">{errors.currentPassword}</div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback d-block">{errors.password}</div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default ProfileAdmin;
