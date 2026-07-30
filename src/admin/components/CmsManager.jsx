import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import AdminLayout from "../layouts/AdminLayout";
import { uploadImage } from "../services/adminApi";
import { ICON_REGISTRY } from "../../utils/iconRegistry";
import {
  collectErrors,
  hasErrors,
  validateImageFile,
  validateMaxLength,
  validateNumber,
  validateRequired,
  validateUrl,
} from "../../utils/validation";

const CmsManager = ({
  title,
  subtitle,
  api,
  fields,
  dataKey,
  defaultItem = {},
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const emptyForm = useMemo(() => {
    const base = { status: true, ...defaultItem };
    fields.forEach((field) => {
      base[field.name] = field.defaultValue ?? (field.type === "multiupload" ? [] : "");
    });
    return base;
  }, [fields, defaultItem]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await api.getAll();
      setItems(res.data[dataKey] || []);
    } catch {
      Swal.fire("Error", `Failed to load ${title.toLowerCase()}.`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filtered = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const openCreate = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    const nextForm = { ...emptyForm, ...item };

    fields.forEach((field) => {
      if (field.type === "tags" && Array.isArray(item[field.name])) {
        nextForm[field.name] = item[field.name].join(", ");
      }
    });

    setForm(nextForm);
    setErrors({});
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileError = validateImageFile(file, { maxSizeMB: 1 });
    if (fileError) {
      setErrors((prev) => ({ ...prev, [fieldName]: fileError }));
      return;
    }

    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, [fieldName]: res.data.imageUrl }));
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Image upload failed. Please upload a valid image up to 1MB.",
      }));
    }
  };

  const handleMultiImageUpload = async (e, fieldName) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const uploaded = [];
    let failed = false;

    for (const file of files) {
      const fileError = validateImageFile(file, { maxSizeMB: 1 });
      if (fileError) {
        failed = true;
        continue;
      }
      try {
        const res = await uploadImage(file);
        uploaded.push(res.data.imageUrl);
      } catch {
        failed = true;
      }
    }

    if (uploaded.length) {
      setForm((prev) => ({
        ...prev,
        [fieldName]: [...(Array.isArray(prev[fieldName]) ? prev[fieldName] : []), ...uploaded],
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: failed
        ? "Some images could not be uploaded (each must be a valid image up to 1MB)."
        : "",
    }));

    e.target.value = "";
  };

  const removeMultiImage = (fieldName, index) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: (prev[fieldName] || []).filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const checks = [];

    fields.forEach((field) => {
      const value = form[field.name];
      if (field.required) {
        checks.push({
          field: field.name,
          message: validateRequired(value, field.label),
        });
      }

      if (field.type === "number") {
        checks.push({
          field: field.name,
          message: validateNumber(value, field.label, {
            required: field.required,
            min: field.min,
            max: field.max,
            integer: true,
          }),
        });
      }

      if (field.type === "upload" && value) {
        checks.push({
          field: field.name,
          message: validateUrl(value, `${field.label} URL`),
        });
      }

      if (field.url) {
        checks.push({
          field: field.name,
          message: validateUrl(value, field.label, { required: field.required }),
        });
      }

      if (field.maxLength) {
        checks.push({
          field: field.name,
          message: validateMaxLength(value, field.maxLength, field.label),
        });
      }
    });

    const nextErrors = collectErrors(checks);
    setErrors(nextErrors);
    return !hasErrors(nextErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...form };

    fields.forEach((field) => {
      if (field.type === "tags") {
        payload[field.name] = String(form[field.name] || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      if (field.type === "number") {
        payload[field.name] = Number(form[field.name]) || 0;
      }
    });

    try {
      if (editItem?._id) {
        await api.update(editItem._id, payload);
      } else {
        await api.create(payload);
      }

      setShowModal(false);
      await loadItems();

      Swal.fire({
        icon: "success",
        title: editItem ? "Updated" : "Created",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Save failed.", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await api.remove(id);
      await loadItems();
      Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
    } catch {
      Swal.fire("Error", "Delete failed.", "error");
    }
  };

  return (
    <AdminLayout title={title}>
      <div className="dashboard-content">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2>{title}</h2>
            {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
          </div>
          <button className="btn btn-primary" onClick={openCreate}>
            <FaPlus className="me-2" /> Add New
          </button>
        </div>

        <div className="search-box mb-3">
          <FaSearch />
          <input
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="table-card">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  {fields.slice(0, 3).map((field) => (
                    <th key={field.name}>{field.label}</th>
                  ))}
                  <th>Status</th>
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

                {!loading && paginated.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No records found.
                    </td>
                  </tr>
                )}

                {!loading &&
                  paginated.map((item) => (
                    <tr key={item._id}>
                      {fields.slice(0, 3).map((field) => (
                        <td key={field.name}>
                          {field.type === "image" || field.type === "upload" ? (
                            <img
                              src={item[field.name] || "https://via.placeholder.com/50"}
                              alt=""
                              className="table-thumb"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "https://via.placeholder.com/50";
                              }}
                            />
                          ) : field.type === "multiupload" ? (
                            <img
                              src={(item[field.name] || [])[0] || "https://via.placeholder.com/50"}
                              alt=""
                              className="table-thumb"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "https://via.placeholder.com/50";
                              }}
                            />
                          ) : (
                            String(item[field.name] || "").slice(0, 80)
                          )}
                        </td>
                      ))}
                      <td>
                        <span className={`badge ${item.status ? "bg-success" : "bg-secondary"}`}>
                          {item.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => openEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn btn-sm btn-light"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </button>
              <span className="align-self-center small">
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-light"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {showModal && (
          <div className="modal d-block admin-modal-backdrop">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{editItem ? `Edit ${title}` : `Add ${title}`}</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row g-3">
                      {fields.map((field) => (
                        <div className={field.col || "col-12"} key={field.name}>
                          <label className="form-label">{field.label}</label>

                          {field.type === "textarea" ? (
                            <textarea
                              className="form-control"
                              name={field.name}
                              rows={field.rows || 3}
                              value={form[field.name] || ""}
                              onChange={handleChange}
                              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                              required={field.required}
                            />
                          ) : field.type === "select" ? (
                            <select
                              className="form-select"
                              name={field.name}
                              value={form[field.name] || ""}
                              onChange={handleChange}
                              required={field.required}
                            >
                              {field.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "checkbox" ? (
                            <div className="form-check mt-2">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name={field.name}
                                checked={!!form[field.name]}
                                onChange={handleChange}
                                id={field.name}
                              />
                              <label className="form-check-label" htmlFor={field.name}>
                                {field.checkboxLabel || "Active"}
                              </label>
                            </div>
                          ) : field.type === "iconpicker" ? (
                            <div className="icon-picker-grid">
                              <button
                                type="button"
                                className={`icon-picker-option ${!form[field.name] ? "active" : ""}`}
                                onClick={() =>
                                  setForm((prev) => ({ ...prev, [field.name]: "" }))
                                }
                                title="None"
                              >
                                None
                              </button>
                              {Object.entries(ICON_REGISTRY).map(([name, { label, Icon }]) => (
                                <button
                                  type="button"
                                  key={name}
                                  className={`icon-picker-option ${form[field.name] === name ? "active" : ""}`}
                                  onClick={() =>
                                    setForm((prev) => ({ ...prev, [field.name]: name }))
                                  }
                                  title={label}
                                >
                                  <Icon />
                                </button>
                              ))}
                            </div>
                          ) : field.type === "multiupload" ? (
                            <>
                              <input
                                type="file"
                                className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                                accept="image/*"
                                multiple
                                onChange={(e) => handleMultiImageUpload(e, field.name)}
                              />
                              <small className="text-muted d-block mt-1">
                                {field.hint || "Optional. Supported: JPG, PNG, GIF, WebP, SVG. Max 1MB each."}
                              </small>
                              {Array.isArray(form[field.name]) && form[field.name].length > 0 && (
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                  {form[field.name].map((url, idx) => (
                                    <div key={`${url}-${idx}`} className="position-relative">
                                      <img src={url} alt="" className="table-thumb" />
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 p-0"
                                        style={{ width: 18, height: 18, lineHeight: "16px", fontSize: 10 }}
                                        onClick={() => removeMultiImage(field.name, idx)}
                                        title="Remove image"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : field.type === "upload" ? (
                            <>
                              <input
                                type="file"
                                className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, field.name)}
                              />
                              <small className="text-muted d-block mt-1">
                                {field.hint || "Supported: JPG, PNG, GIF, WebP, SVG. Maximum file size: 1MB."}
                              </small>
                              {form[field.name] && (
                                <small className="text-success d-block mt-1">Image uploaded successfully.</small>
                              )}
                            </>
                          ) : (
                            <input
                              className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                              type={field.type || "text"}
                              name={field.name}
                              value={form[field.name] ?? ""}
                              onChange={handleChange}
                              min={field.min}
                              max={field.max}
                              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                              required={field.required}
                            />
                          )}
                          {errors[field.name] && (
                            <div className="invalid-feedback d-block">{errors[field.name]}</div>
                          )}
                          {field.helpText && <small className="text-muted d-block mt-1">{field.helpText}</small>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CmsManager;
