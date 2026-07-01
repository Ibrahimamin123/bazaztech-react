import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { getAdminSettings, updateSettings } from "../services/cmsApi";
import { uploadImage } from "../services/adminApi";

const SettingsAdmin = () => {
  const [form, setForm] = useState({
    siteName: "",
    tagline: "",
    logo: "",
    email: "",
    phone: "",
    address: "",
    footerText: "",
    copyright: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAdminSettings();
        if (res.data.settings) setForm({ ...form, ...res.data.settings });
      } catch {
        Swal.fire("Error", "Failed to load settings.", "error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, logo: res.data.imageUrl }));
    } catch {
      Swal.fire("Error", "Logo upload failed.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateSettings(form);
      Swal.fire({ icon: "success", title: "Settings saved", timer: 1400, showConfirmButton: false });
    } catch {
      Swal.fire("Error", "Failed to save settings.", "error");
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
        <h2 className="mb-1">Website Settings</h2>
        <p className="text-muted mb-4">Manage contact info, footer content, and branding.</p>

        <form className="table-card" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Site Name</label>
              <input className="form-control" name="siteName" value={form.siteName} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Tagline</label>
              <input className="form-control" name="tagline" value={form.tagline} onChange={handleChange} />
            </div>
            <div className="col-md-8">
              <label className="form-label">Logo URL</label>
              <input className="form-control" name="logo" value={form.logo} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Upload Logo</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleLogoUpload} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input className="form-control" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <textarea className="form-control" rows="2" name="address" value={form.address} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Footer About Text</label>
              <textarea className="form-control" rows="3" name="footerText" value={form.footerText} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Copyright</label>
              <input className="form-control" name="copyright" value={form.copyright} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">WhatsApp Number</label>
              <input className="form-control" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SettingsAdmin;
