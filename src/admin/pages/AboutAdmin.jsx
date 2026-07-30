import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { getAdminSettings, updateSettings } from "../services/cmsApi";
import { uploadImage } from "../services/adminApi";
import { clearSettingsCache } from "../../hooks/useWebsiteSettings";
import {
  collectErrors,
  hasErrors,
  validateImageFile,
  validateMaxLength,
  validateRequired,
} from "../../utils/validation";

const AboutAdmin = () => {
  const [form, setForm] = useState({
    aboutHeading: "",
    aboutSubtitle: "",
    aboutDescription: "",
    founderImage: "",
    founderName: "",
    founderDesignation: "",
    founderDescription: "",
    ceoImage: "",
    ceoName: "",
    ceoDesignation: "",
    ceoDescription: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAdminSettings();
        if (res.data.settings) setForm((prev) => ({ ...prev, ...res.data.settings }));
      } catch {
        Swal.fire("Error", "Failed to load About Us content.", "error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      setErrors((prev) => ({ ...prev, [fieldName]: "Image upload failed. Please try again." }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = collectErrors([
      { field: "aboutHeading", message: validateRequired(form.aboutHeading, "Section heading") },
      { field: "aboutHeading", message: validateMaxLength(form.aboutHeading, 120, "Section heading") },
      { field: "aboutSubtitle", message: validateMaxLength(form.aboutSubtitle, 300, "Section subtitle") },
      { field: "aboutDescription", message: validateMaxLength(form.aboutDescription, 1000, "Section description") },
      { field: "founderName", message: validateRequired(form.founderName, "Founder name") },
      { field: "founderDesignation", message: validateRequired(form.founderDesignation, "Founder designation") },
      { field: "founderDescription", message: validateRequired(form.founderDescription, "Founder description") },
      { field: "founderDescription", message: validateMaxLength(form.founderDescription, 1000, "Founder description") },
      { field: "ceoName", message: validateRequired(form.ceoName, "CEO name") },
      { field: "ceoDesignation", message: validateRequired(form.ceoDesignation, "CEO designation") },
      { field: "ceoDescription", message: validateRequired(form.ceoDescription, "CEO description") },
      { field: "ceoDescription", message: validateMaxLength(form.ceoDescription, 1000, "CEO description") },
    ]);

    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    try {
      setSaving(true);
      await updateSettings(form);
      clearSettingsCache();
      Swal.fire({ icon: "success", title: "About Us updated", timer: 1400, showConfirmButton: false });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to save About Us content.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="About Us">
        <div className="dashboard-content text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="About Us">
      <div className="dashboard-content">
        <p className="text-muted mb-4">
          Manage the content shown on the About Us page — section heading, Founder, and CEO.
        </p>

        <form className="table-card" onSubmit={handleSubmit} noValidate>
          <h5 className="mb-3">Section Information</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Section Heading</label>
              <input
                className={`form-control ${errors.aboutHeading ? "is-invalid" : ""}`}
                name="aboutHeading"
                value={form.aboutHeading}
                onChange={handleChange}
                placeholder="About Us"
              />
              {errors.aboutHeading && <div className="invalid-feedback d-block">{errors.aboutHeading}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Section Subtitle</label>
              <input
                className={`form-control ${errors.aboutSubtitle ? "is-invalid" : ""}`}
                name="aboutSubtitle"
                value={form.aboutSubtitle}
                onChange={handleChange}
                placeholder="Short line shown under the heading"
              />
              {errors.aboutSubtitle && <div className="invalid-feedback d-block">{errors.aboutSubtitle}</div>}
            </div>
            <div className="col-12">
              <label className="form-label">Section Description</label>
              <textarea
                className={`form-control ${errors.aboutDescription ? "is-invalid" : ""}`}
                rows="3"
                name="aboutDescription"
                value={form.aboutDescription}
                onChange={handleChange}
                placeholder="Optional extra paragraph shown below the subtitle"
              />
              {errors.aboutDescription && <div className="invalid-feedback d-block">{errors.aboutDescription}</div>}
            </div>
          </div>

          <hr className="my-4" />
          <h5 className="mb-3">Our Founder</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Founder Image</label>
              <input
                type="file"
                className={`form-control ${errors.founderImage ? "is-invalid" : ""}`}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "founderImage")}
              />
              <small className="text-muted d-block mt-1">Supported: JPG/PNG/GIF/WebP/SVG, max 1MB.</small>
              {errors.founderImage && <div className="invalid-feedback d-block">{errors.founderImage}</div>}
              {form.founderImage && (
                <img src={form.founderImage} alt="Founder preview" className="table-thumb mt-2" />
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Founder Name</label>
              <input
                className={`form-control ${errors.founderName ? "is-invalid" : ""}`}
                name="founderName"
                value={form.founderName}
                onChange={handleChange}
                placeholder="e.g. Ibrahim Amin"
              />
              {errors.founderName && <div className="invalid-feedback d-block">{errors.founderName}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Founder Designation</label>
              <input
                className={`form-control ${errors.founderDesignation ? "is-invalid" : ""}`}
                name="founderDesignation"
                value={form.founderDesignation}
                onChange={handleChange}
                placeholder="e.g. Founder"
              />
              {errors.founderDesignation && <div className="invalid-feedback d-block">{errors.founderDesignation}</div>}
            </div>
            <div className="col-12">
              <label className="form-label">Founder Description</label>
              <textarea
                className={`form-control ${errors.founderDescription ? "is-invalid" : ""}`}
                rows="4"
                name="founderDescription"
                value={form.founderDescription}
                onChange={handleChange}
                placeholder="Founder bio shown on the About Us page"
              />
              {errors.founderDescription && <div className="invalid-feedback d-block">{errors.founderDescription}</div>}
            </div>
          </div>

          <hr className="my-4" />
          <h5 className="mb-3">Our CEO</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">CEO Image</label>
              <input
                type="file"
                className={`form-control ${errors.ceoImage ? "is-invalid" : ""}`}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "ceoImage")}
              />
              <small className="text-muted d-block mt-1">Supported: JPG/PNG/GIF/WebP/SVG, max 1MB.</small>
              {errors.ceoImage && <div className="invalid-feedback d-block">{errors.ceoImage}</div>}
              {form.ceoImage && (
                <img src={form.ceoImage} alt="CEO preview" className="table-thumb mt-2" />
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">CEO Name</label>
              <input
                className={`form-control ${errors.ceoName ? "is-invalid" : ""}`}
                name="ceoName"
                value={form.ceoName}
                onChange={handleChange}
                placeholder="e.g. Ayesha Khan"
              />
              {errors.ceoName && <div className="invalid-feedback d-block">{errors.ceoName}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">CEO Designation</label>
              <input
                className={`form-control ${errors.ceoDesignation ? "is-invalid" : ""}`}
                name="ceoDesignation"
                value={form.ceoDesignation}
                onChange={handleChange}
                placeholder="e.g. Chief Executive Officer"
              />
              {errors.ceoDesignation && <div className="invalid-feedback d-block">{errors.ceoDesignation}</div>}
            </div>
            <div className="col-12">
              <label className="form-label">CEO Description</label>
              <textarea
                className={`form-control ${errors.ceoDescription ? "is-invalid" : ""}`}
                rows="4"
                name="ceoDescription"
                value={form.ceoDescription}
                onChange={handleChange}
                placeholder="CEO bio shown on the About Us page"
              />
              {errors.ceoDescription && <div className="invalid-feedback d-block">{errors.ceoDescription}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4" disabled={saving}>
            {saving ? "Saving..." : "Save About Us"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AboutAdmin;
