import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "../layouts/AdminLayout";
import { deleteAdmin, getAdmins, registerAdmin } from "../services/adminApi";

const AdminsAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
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

    try {
      await registerAdmin(form);
      setForm({ name: "", email: "", password: "", role: "Admin" });
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

  return (
    <AdminLayout>
      <div className="dashboard-content">
        <h2>Admin Accounts</h2>
        <p className="text-muted mb-4">Manage dashboard users and roles.</p>

        <form className="table-card mb-4" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-3">
              <input className="form-control" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="col-md-3">
              <input type="email" className="form-control" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="col-md-3">
              <input type="password" className="form-control" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="col-md-2">
              <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <div className="col-md-1">
              <button className="btn btn-primary w-100">Add</button>
            </div>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
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
