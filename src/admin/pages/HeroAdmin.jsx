import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { getHero, saveHero } from "../services/cmsApi";
import { uploadImage } from "../services/adminApi";

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
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, backgroundImage: res.data.imageUrl }));
    } catch {
      Swal.fire("Error", "Upload failed.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              <input className="form-control" name="headline" value={form.headline} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Subheadline</label>
              <input className="form-control" name="subheadline" value={form.subheadline} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="4" name="description" value={form.description} onChange={handleChange} />
            </div>
            <div className="col-md-8">
              <label className="form-label">Background Image URL</label>
              <input className="form-control" name="backgroundImage" value={form.backgroundImage} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Upload Background</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleUpload} />
            </div>
            <div className="col-md-6">
              <label className="form-label">CTA Text</label>
              <input className="form-control" name="ctaText" value={form.ctaText} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">CTA Link</label>
              <input className="form-control" name="ctaLink" value={form.ctaLink} onChange={handleChange} />
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
