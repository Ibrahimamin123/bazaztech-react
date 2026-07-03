import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import AdminLayout from "../layouts/AdminLayout";
import { uploadImage } from "../services/adminApi";

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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const emptyForm = useMemo(() => {
    const base = { status: true, ...defaultItem };
    fields.forEach((field) => {
      base[field.name] = field.defaultValue ?? "";
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
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, [fieldName]: res.data.imageUrl }));
    } catch {
      Swal.fire("Error", "Image upload failed.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const field of fields) {
      if (field.required && !String(form[field.name] ?? "").trim()) {
        Swal.fire("Validation Error", `${field.label} is required.`, "warning");
        return;
      }
    }

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
                          {field.type === "image" ? (
                            <img
                              src={item[field.name] || "https://via.placeholder.com/50"}
                              alt=""
                              className="table-thumb"
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
                              required={field.required}
                            />
                          ) : field.type === "select" ? (
                            <select
                              className="form-select"
                              name={field.name}
                              value={form[field.name] || ""}
                              onChange={handleChange}
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
                          ) : field.type === "upload" ? (
                            <>
                              <input
                                className="form-control mb-2"
                                name={field.name}
                                value={form[field.name] || ""}
                                onChange={handleChange}
                                placeholder="Image URL"
                              />
                              <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, field.name)}
                              />
                            </>
                          ) : (
                            <input
                              className="form-control"
                              type={field.type || "text"}
                              name={field.name}
                              value={form[field.name] ?? ""}
                              onChange={handleChange}
                              required={field.required}
                            />
                          )}
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
