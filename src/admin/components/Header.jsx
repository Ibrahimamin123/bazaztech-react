import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useAdmin } from "../context/AdminContext";
import Logo from "../../components/Logo";

const Header = ({ title, onMenuClick, onToggleCollapse }) => {
  const { admin } = useAdmin();
  const navigate = useNavigate();

  const avatarSrc =
    admin?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(admin?.name || "Admin")}&background=0D6EFD&color=fff`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="sidebar-toggle d-lg-none"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
        <button
          type="button"
          className="sidebar-toggle d-none d-lg-inline-flex"
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <div className="header-brand d-none d-md-flex">
          <Logo />
        </div>
        <h2>{title}</h2>
      </div>

      <div className="profile">
        <Link to="/admin/profile" className="profile-link">
          <motion.img
            src={avatarSrc}
            alt={admin?.name || "Admin"}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <div className="profile-info d-none d-sm-block">
            <h6>{admin?.name || "Admin"}</h6>
            <span>{admin?.role || "Administrator"}</span>
          </div>
        </Link>

        <button
          type="button"
          className="btn btn-sm btn-outline-danger ms-2 d-none d-md-inline-flex"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-1" /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
