import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { deleteAdmin, getAdmins, registerAdmin, updateAdmin } from "../services/adminApi";
import { useAdmin } from "../context/AdminContext";
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

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "Administrator",
  permissions: ["dashboard_access", "view_records"],
};

const PermissionGrid = ({ form, setForm, errors, setErrors, idPrefix }) => {
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
    <div className="mt-3">
      <label className="form-label fw-semibold mb-2">Permissions</label>
      <div className="row g-2">
        {PERMISSIONS.map((permission) => (
          <div className="col-md-4" key={permission.key}>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`${idPrefix}-${permission.key}`}
                checked={
                  form.role === "Super Administrator" ||
                  form.permissions.includes(permission.key)
                }
                onChange={() => togglePermission(permission.key)}
                disabled={form.role === "Super Administrator"}
              />
              <label className="form-check-label" htmlFor={`${idPrefix}-${permission.key}`}>
                {permission.label}
              </label>
            </div>
          </div>
        ))}
      </div>
      {errors.permissions && <div className="invalid-feedback d-block">{errors.permissions}</div>}
    </div>
  );
};

const AdminsAdmin = () => {
  const { admin: loggedInAdmin } = useAdmin();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(emptyForm);

  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editErrors, setEditErrors] = useState({});
  const [savingEdit, setSavingEdit] = useState(false);

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
      setForm(emptyForm);
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

  const openEdit = (adminRow) => {
    setEditTarget(adminRow);
    setEditForm({
      name: adminRow.name || "",
      email: adminRow.email || "",
      password: "",
      role: adminRow.role || "Administrator",
      permissions: adminRow.permissions?.length ? adminRow.permissions : ["dashboard_access"],
      isActive: adminRow.isActive !== false,
    });
    setEditErrors({});
  };

  const closeEdit = () => {
    setEditTarget(null);
    setEditErrors({});
    setSavingEdit(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTarget) return;

    const nextErrors = collectErrors([
      { field: "name", message: validateRequired(editForm.name, "Name") },
      { field: "email", message: validateEmail(editForm.email) },
      {
        field: "password",
        message: validatePassword(editForm.password, { minLength: 6, required: false }),
      },
      {
        field: "permissions",
        message:
          editForm.role === "Super Administrator" || editForm.permissions.length > 0
            ? ""
            : "Select at least one permission.",
      },
    ]);

    setEditErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    const payload = {
      name: editForm.name,
      email: editForm.email,
      role: editForm.role,
      permissions: editForm.permissions,
      isActive: editForm.isActive,
    };
    if (editForm.password) payload.password = editForm.password;

    try {
      setSavingEdit(true);
      await updateAdmin(editTarget._id, payload);
      await loadAdmins();
      closeEdit();
      Swal.fire({ icon: "success", title: "Admin updated", timer: 1400, showConfirmButton: false });
    } catch (err) {
      setSavingEdit(false);
      Swal.fire("Error", err.response?.data?.message || "Update failed.", "error");
    }
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

          <PermissionGrid
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            idPrefix="create"
          />
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-primary" />
                    </td>
                  </tr>
                )}

                {!loading &&
                  admins.map((adminRow) => (
                    <tr key={adminRow._id}>
                      <td>{adminRow.name}</td>
                      <td>{adminRow.email}</td>
                      <td>{adminRow.role}</td>
                      <td>{adminRow.permissions?.length || 0} assigned</td>
                      <td>
                        <span
                          className={`badge ${adminRow.isActive === false ? "bg-secondary" : "bg-success"}`}
                        >
                          {adminRow.isActive === false ? "Inactive" : "Active"}
                        </span>
                      </td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => openEdit(adminRow)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          disabled={adminRow._id === loggedInAdmin?.id}
                          title={
                            adminRow._id === loggedInAdmin?.id
                              ? "You cannot delete your own account."
                              : undefined
                          }
                          onClick={() => handleDelete(adminRow._id)}
                        >
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

      {editTarget && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEdit();
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit} noValidate>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Admin — {editTarget.name}</h5>
                  <button type="button" className="btn-close" onClick={closeEdit} />
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        className={`form-control ${editErrors.name ? "is-invalid" : ""}`}
                        value={editForm.name}
                        onChange={(e) => {
                          setEditForm({ ...editForm, name: e.target.value });
                          setEditErrors((prev) => ({ ...prev, name: "" }));
                        }}
                      />
                      {editErrors.name && (
                        <div className="invalid-feedback d-block">{editErrors.name}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${editErrors.email ? "is-invalid" : ""}`}
                        value={editForm.email}
                        onChange={(e) => {
                          setEditForm({ ...editForm, email: e.target.value });
                          setEditErrors((prev) => ({ ...prev, email: "" }));
                        }}
                      />
                      {editErrors.email && (
                        <div className="invalid-feedback d-block">{editErrors.email}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">New Password (optional)</label>
                      <input
                        type="password"
                        className={`form-control ${editErrors.password ? "is-invalid" : ""}`}
                        placeholder="Leave blank to keep current password"
                        value={editForm.password}
                        onChange={(e) => {
                          setEditForm({ ...editForm, password: e.target.value });
                          setEditErrors((prev) => ({ ...prev, password: "" }));
                        }}
                      />
                      {editErrors.password && (
                        <div className="invalid-feedback d-block">{editErrors.password}</div>
                      )}
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        value={editForm.role}
                        onChange={(e) => {
                          const nextRole = e.target.value;
                          setEditForm((prev) => ({
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
                    <div className="col-md-3 d-flex align-items-end">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="edit-isActive"
                          checked={editForm.isActive}
                          onChange={(e) =>
                            setEditForm({ ...editForm, isActive: e.target.checked })
                          }
                        />
                        <label className="form-check-label" htmlFor="edit-isActive">
                          Account Active
                        </label>
                      </div>
                    </div>
                  </div>

                  <PermissionGrid
                    form={editForm}
                    setForm={setEditForm}
                    errors={editErrors}
                    setErrors={setEditErrors}
                    idPrefix="edit"
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={closeEdit}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={savingEdit}>
                    {savingEdit ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminsAdmin;
