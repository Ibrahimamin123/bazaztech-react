import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { deleteAdmin, getAdmins, registerAdmin } from "../services/adminApi";
import {
  collectErrors,
  hasErrors,
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/validation";

const ADMIN_ROLES = [
  "Super Administrator",
  "Administrator",
  "Content Manager",
  "Content Editor",
  "Operations Manager",
  "Support Manager",
];

const PERMISSIONS = [
  { key: "dashboard_access", label: "Dashboard Access" },
  { key: "create_records", label: "Create Records" },
  { key: "edit_records", label: "Edit Records" },
  { key: "delete_records", label: "Delete Records" },
  { key: "view_records", label: "View Records" },
  { key: "manage_users", label: "Manage Users" },
  { key: "manage_admins", label: "Manage Admins" },
  { key: "manage_messages", label: "Manage Messages" },
  { key: "manage_website_settings", label: "Manage Website Settings" },
  { key: "manage_case_studies", label: "Manage Case Studies" },
  { key: "manage_services", label: "Manage Services" },
  { key: "manage_training_programs", label: "Manage Training Programs" },
  { key: "manage_contact_information", label: "Manage Contact Information" },
  { key: "manage_media", label: "Manage Media" },
  { key: "full_access", label: "Full Access" },
];

const AdminsAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Administrator",
    permissions: ["dashboard_access", "view_records"],
  });

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const res = await getAdmins();
      setAdmins(res.data.admins || []);
    } catch {
      Swal.fire("Error", "Failed to load admins.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = collectErrors([
      { field: "name", message: validateRequired(form.name, "Name") },
      { field: "email", message: validateEmail(form.email) },
      { field: "password", message: validatePassword(form.password, { minLength: 6 }) },
      {
        field: "permissions",
        message:
          form.role === "Super Administrator" || form.permissions.length > 0
            ? ""
            : "Select at least one permission.",
      },
    ]);

    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    try {
      await registerAdmin(form);
      setForm({
        name: "",
        email: "",
        password: "",
        role: "Administrator",
        permissions: ["dashboard_access", "view_records"],
      });
      setErrors({});
      await loadAdmins();
      Swal.fire({ icon: "success", title: "Admin created", timer: 1400, showConfirmButton: false });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Create failed.", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete admin account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAdmin(id);
      await loadAdmins();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Delete failed.", "error");
    }
  };

  const togglePermission = (permission) => {
    setForm((prev) => {
      if (permission === "full_access") {
        const exists = prev.permissions.includes("full_access");
        return {
          ...prev,
          permissions: exists ? [] : PERMISSIONS.map((item) => item.key),
        };
      }

      const exists = prev.permissions.includes(permission);
      const next = exists
        ? prev.permissions.filter((item) => item !== permission)
        : [...prev.permissions, permission];

      return {
        ...prev,
        permissions: next.includes("full_access")
          ? next
          : next.filter((item) => item !== "full_access"),
      };
    });
    setErrors((prev) => ({ ...prev, permissions: "" }));
  };

  return (
    <AdminLayout title="Admin Accounts">
      <div className="dashboard-content">
        <p className="text-muted mb-4">Manage dashboard users with role-based permissions.</p>

        <form className="table-card mb-4" onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Name"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
              />
              {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
            </div>
            <div className="col-md-3">
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              {errors.password && (
                <div className="invalid-feedback d-block">{errors.password}</div>
              )}
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={form.role}
                onChange={(e) => {
                  const nextRole = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    role: nextRole,
                    permissions:
                      nextRole === "Super Administrator"
                        ? PERMISSIONS.map((item) => item.key)
                        : prev.permissions.filter((permission) => permission !== "full_access"),
                  }));
                }}
              >
                {ADMIN_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-1">
              <button className="btn btn-primary w-100">Add</button>
            </div>
          </div>
          <div className="mt-3">
            <label className="form-label fw-semibold mb-2">Permissions</label>
            <div className="row g-2">
              {PERMISSIONS.map((permission) => (
                <div className="col-md-4" key={permission.key}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={permission.key}
                      checked={
                        form.role === "Super Administrator" ||
                        form.permissions.includes(permission.key)
                      }
                      onChange={() => togglePermission(permission.key)}
                      disabled={form.role === "Super Administrator"}
                    />
                    <label className="form-check-label" htmlFor={permission.key}>
                      {permission.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {errors.permissions && (
              <div className="invalid-feedback d-block">{errors.permissions}</div>
            )}
          </div>
        </form>

        <div className="table-card">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Permissions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-primary" />
                    </td>
                  </tr>
                )}

                {!loading &&
                  admins.map((admin) => (
                    <tr key={admin._id}>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.role}</td>
                      <td>{admin.permissions?.length || 0} assigned</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(admin._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminsAdmin;
