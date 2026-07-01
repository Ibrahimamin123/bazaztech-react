import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addService, updateService } from "../services/serviceApi";
import { uploadImage } from "../services/adminApi";

const emptyForm = {
  title: "",
  description: "",
  icon: "",
  image: "",
  features: "",
  order: 0,
  status: true,
};

const ServiceModal = ({ show, onClose, refreshServices, editData }) => {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        icon: editData.icon || "",
        image: editData.image || "",
        features: (editData.features || []).join(", "),
        order: editData.order || 0,
        status: editData.status ?? true,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editData, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, image: res.data.imageUrl }));
      Swal.fire({
        icon: "success",
        title: "Uploaded",
        text: "Image uploaded successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      icon: form.icon,
      image: form.image,
      order: Number(form.order) || 0,
      status: form.status,
      features: form.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      setSaving(true);

      if (editData?._id) {
        await updateService(editData._id, payload);
      } else {
        await addService(payload);
      }

      await refreshServices();
      onClose();

      Swal.fire({
        icon: "success",
        title: editData ? "Updated" : "Created",
        text: `Service ${editData ? "updated" : "added"} successfully.`,
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal d-block admin-modal-backdrop">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{editData ? "Edit Service" : "Add Service"}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Icon (emoji or text)</label>
                  <input
                    className="form-control"
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                    placeholder="🚀"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-8">
                  <label className="form-label">Image URL</label>
                  <input
                    className="form-control"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </div>

                {form.image && (
                  <div className="col-12">
                    <img src={form.image} alt="Preview" className="modal-preview" />
                  </div>
                )}

                <div className="col-md-8">
                  <label className="form-label">Features (comma separated)</label>
                  <input
                    className="form-control"
                    name="features"
                    value={form.features}
                    onChange={handleChange}
                    placeholder="Custom Design, SEO Optimized"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Display Order</label>
                  <input
                    type="number"
                    className="form-control"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="status"
                      checked={form.status}
                      onChange={handleChange}
                      id="serviceStatus"
                    />
                    <label className="form-check-label" htmlFor="serviceStatus">
                      Active on website
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving..." : editData ? "Update Service" : "Save Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
