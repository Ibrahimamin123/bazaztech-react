import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { getDashboardStats } from "../services/adminApi";
import {
  FaUsers,
  FaServicestack,
  FaImages,
  FaEnvelope,
  FaPlus,
  FaCog,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalCaseStudies: 0,
    totalMessages: 0,
    totalAdmins: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.stats);
        setRecentMessages(res.data.recentMessages || []);
      } catch {
        setStats({
          totalServices: 0,
          totalCaseStudies: 0,
          totalMessages: 0,
          totalAdmins: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    { icon: FaServicestack, value: stats.totalServices, label: "Total Services" },
    { icon: FaImages, value: stats.totalCaseStudies, label: "Case Studies" },
    { icon: FaEnvelope, value: stats.totalMessages, label: "Messages" },
    { icon: FaUsers, value: stats.totalAdmins, label: "Admins" },
  ];

  return (
    <AdminLayout>
      <div className="dashboard-content container-fluid">
        <div className="welcome-banner mb-4">
          <div>
            <h2>Welcome Back</h2>
            <p>Manage your complete BazazTech website from one place.</p>
          </div>
          <Link to="/" className="btn btn-light" target="_blank">
            View Website
          </Link>
        </div>

        <div className="row g-4">
          {cards.map(({ icon: Icon, value, label }) => (
            <div className="col-lg-3 col-md-6" key={label}>
              <div className="dashboard-card">
                <Icon />
                <h2>{loading ? "..." : value}</h2>
                <p>{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="action-card">
              <h4>Quick Actions</h4>
              <Link to="/admin/services" className="btn btn-primary w-100 mt-3">
                <FaPlus className="me-2" /> Add New Service
              </Link>
              <Link to="/admin/portfolio" className="btn btn-success w-100 mt-3">
                <FaImages className="me-2" /> Manage Case Studies
              </Link>
              <Link to="/admin/settings" className="btn btn-dark w-100 mt-3">
                <FaCog className="me-2" /> Website Settings
              </Link>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="table-card">
              <h4 className="mb-3">Recent Messages</h4>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="3" className="text-center py-3">
                        <div className="spinner-border spinner-border-sm text-primary" />
                      </td>
                    </tr>
                  )}

                  {!loading && recentMessages.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-3">
                        No messages yet.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    recentMessages.map((msg) => (
                      <tr key={msg._id}>
                        <td>{msg.name}</td>
                        <td>{msg.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              msg.status === "new"
                                ? "bg-success"
                                : msg.status === "pending"
                                  ? "bg-warning"
                                  : "bg-secondary"
                            }`}
                          >
                            {msg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
