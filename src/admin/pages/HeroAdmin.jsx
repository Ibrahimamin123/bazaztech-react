import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { getHero, saveHero } from "../services/cmsApi";
import { uploadImage } from "../services/adminApi";
import {
  collectErrors,
  hasErrors,
  validateImageFile,
  validateMaxLength,
  validateRequired,
  validateUrl,
} from "../../utils/validation";

const HeroAdmin = () => {
  const [form, setForm] = useState({
    headline: "",
    subheadline: "",
    description: "",
    backgroundImage: "",
    ctaText: "Get Started",
    ctaLink: "/contact",
    status: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadHero = async () => {
      try {
        const res = await getHero();
        if (res.data.hero) {
          setForm({ ...form, ...res.data.hero });
        }
      } catch {
        Swal.fire("Error", "Failed to load hero section.", "error");
      } finally {
        setLoading(false);
      }
    };

    loadHero();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileError = validateImageFile(file, { maxSizeMB: 1 });
    if (fileError) {
      setErrors((prev) => ({ ...prev, backgroundImage: fileError }));
      return;
    }

    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, backgroundImage: res.data.imageUrl }));
      setErrors((prev) => ({ ...prev, backgroundImage: "" }));
    } catch {
      Swal.fire("Error", "Upload failed.", "error");
    }
  };

  const validateForm = () => {
    const nextErrors = collectErrors([
      { field: "headline", message: validateRequired(form.headline, "Headline") },
      { field: "description", message: validateRequired(form.description, "Description") },
      { field: "backgroundImage", message: validateRequired(form.backgroundImage, "Background Image") },
      { field: "backgroundImage", message: validateUrl(form.backgroundImage, "Background Image URL", { required: true }) },
      { field: "ctaText", message: validateRequired(form.ctaText, "CTA Text") },
      { field: "ctaLink", message: validateRequired(form.ctaLink, "CTA Link") },
      { field: "headline", message: validateMaxLength(form.headline, 160, "Headline") },
      { field: "subheadline", message: validateMaxLength(form.subheadline, 200, "Subheadline") },
      { field: "description", message: validateMaxLength(form.description, 1200, "Description") },
    ]);

    setErrors(nextErrors);
    return !hasErrors(nextErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);
      await saveHero(form);
      Swal.fire({ icon: "success", title: "Hero saved", timer: 1400, showConfirmButton: false });
    } catch {
      Swal.fire("Error", "Failed to save hero section.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="dashboard-content text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard-content">
        <h2 className="mb-1">Hero Section</h2>
        <p className="text-muted mb-4">Manage the homepage hero banner content.</p>

        <form className="table-card" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Headline</label>
              <input className={`form-control ${errors.headline ? "is-invalid" : ""}`} name="headline" value={form.headline} onChange={handleChange} placeholder="Main hero headline" />
              {errors.headline && <div className="invalid-feedback d-block">{errors.headline}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Subheadline</label>
              <input className={`form-control ${errors.subheadline ? "is-invalid" : ""}`} name="subheadline" value={form.subheadline} onChange={handleChange} placeholder="Supporting hero subheadline" />
              {errors.subheadline && <div className="invalid-feedback d-block">{errors.subheadline}</div>}
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className={`form-control ${errors.description ? "is-invalid" : ""}`} rows="4" name="description" value={form.description} onChange={handleChange} placeholder="Describe your value proposition" />
              {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
            </div>
            <div className="col-md-12">
              <label className="form-label">Upload Background</label>
              <input type="file" className={`form-control ${errors.backgroundImage ? "is-invalid" : ""}`} accept="image/*" onChange={handleUpload} />
              <small className="text-muted d-block mt-1" style={{ whiteSpace: "pre-line" }}>
                Maximum File Size: 1 MB
                {"\n"}Recommended Dimensions: 1920 × 1080 px
                {"\n"}Width: 1920 px
                {"\n"}Height: 1080 px
              </small>
              {errors.backgroundImage && <div className="invalid-feedback d-block">{errors.backgroundImage}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">CTA Text</label>
              <input className={`form-control ${errors.ctaText ? "is-invalid" : ""}`} name="ctaText" value={form.ctaText} onChange={handleChange} placeholder="e.g. Get Started" />
              {errors.ctaText && <div className="invalid-feedback d-block">{errors.ctaText}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">CTA Link</label>
              <input className={`form-control ${errors.ctaLink ? "is-invalid" : ""}`} name="ctaLink" value={form.ctaLink} onChange={handleChange} placeholder="e.g. /contact" />
              {errors.ctaLink && <div className="invalid-feedback d-block">{errors.ctaLink}</div>}
            </div>
            <div className="col-12">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="status" checked={form.status} onChange={handleChange} id="heroStatus" />
                <label className="form-check-label" htmlFor="heroStatus">Active on website</label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4" disabled={saving}>
            {saving ? "Saving..." : "Save Hero Section"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default HeroAdmin;
