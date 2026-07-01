import { useNavigate } from "react-router-dom";

const Header = () => {
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-header">
      <h2>Dashboard</h2>

      <div className="profile">
        <img src="https://i.pravatar.cc/50" alt="" />

        <div>
          <h6>{admin.name || "Admin"}</h6>
          <span>{admin.role || "Administrator"}</span>
        </div>

        <button className="btn btn-sm btn-outline-danger ms-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
