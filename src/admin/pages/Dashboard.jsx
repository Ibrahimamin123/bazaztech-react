import AdminLayout from "../layouts/AdminLayout";
import {
  FaUsers,
  FaServicestack,
  FaImages,
  FaEnvelope,
  FaPlus,
  FaCog,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="dashboard-content container-fluid">

        {/* Welcome */}

        <div className="welcome-banner mb-4">

          <div>
            <h2>Welcome Back 👋</h2>

            <p>
              Manage your complete BazazTech website from one place.
            </p>

          </div>

          <button className="btn btn-light">
            View Website
          </button>

        </div>

        {/* Cards */}

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">

            <div className="dashboard-card">

              <FaServicestack />

              <h2>12</h2>

              <p>Total Services</p>

            </div>

          </div>

          <div className="col-lg-3 col-md-6">

            <div className="dashboard-card">

              <FaImages />

              <h2>18</h2>

              <p>Portfolio Projects</p>

            </div>

          </div>

          <div className="col-lg-3 col-md-6">

            <div className="dashboard-card">

              <FaEnvelope />

              <h2>56</h2>

              <p>Messages</p>

            </div>

          </div>

          <div className="col-lg-3 col-md-6">

            <div className="dashboard-card">

              <FaUsers />

              <h2>3</h2>

              <p>Admins</p>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="row mt-5">

          <div className="col-lg-4">

            <div className="action-card">

              <h4>Quick Actions</h4>

              <button className="btn btn-primary w-100 mt-3">

                <FaPlus />

                Add New Service

              </button>

              <button className="btn btn-success w-100 mt-3">

                <FaImages />

                Add Portfolio

              </button>

              <button className="btn btn-dark w-100 mt-3">

                <FaCog />

                Website Settings

              </button>

            </div>

          </div>

          <div className="col-lg-8">

            <div className="table-card">

              <h4 className="mb-3">

                Recent Messages

              </h4>

              <table className="table table-hover">

                <thead>

                  <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  <tr>

                    <td>Ahmed</td>

                    <td>ahmed@gmail.com</td>

                    <td>

                      <span className="badge bg-success">

                        New

                      </span>

                    </td>

                  </tr>

                  <tr>

                    <td>Ali</td>

                    <td>ali@gmail.com</td>

                    <td>

                      <span className="badge bg-warning">

                        Pending

                      </span>

                    </td>

                  </tr>

                  <tr>

                    <td>Usman</td>

                    <td>usman@gmail.com</td>

                    <td>

                      <span className="badge bg-danger">

                        Closed

                      </span>

                    </td>

                  </tr>

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