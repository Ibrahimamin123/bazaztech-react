import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaServicestack,
  FaImages,
  FaUsers,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Logo from "../../components/Logo";

const navItems = [
  { to: "/admin/dashboard", icon: FaHome, label: "Dashboard" },
  { to: "/admin/services", icon: FaServicestack, label: "Services" },
  { to: "/admin/portfolio", icon: FaImages, label: "Case Studies" },
  { to: "/admin/training", icon: FaGraduationCap, label: "Training" },
  { to: "/admin/admins", icon: FaUsers, label: "Admins" },
  { to: "/admin/messages", icon: FaEnvelope, label: "Messages" },
  { to: "/admin/settings", icon: FaCog, label: "Settings" },
  { to: "/admin/profile", icon: FaUserCircle, label: "My Profile" },
];

const Sidebar = ({ collapsed, mobileOpen, onNavigate, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <aside className={`sidebar ${mobileOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}>
      <div className="logo">
        <Link to="/admin/dashboard" onClick={onNavigate} className="logo-link">
          <Logo showText={!collapsed} />
        </Link>
        <button
          type="button"
          className="sidebar-collapse-btn d-none d-lg-inline-flex"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <ul>
        {navItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              onClick={onNavigate}
              className={location.pathname === to ? "active" : ""}
              title={collapsed ? label : undefined}
            >
              <Icon />
              {!collapsed && <span>{label}</span>}
            </Link>
          </li>
        ))}
        <li>
          <button type="button" className="sidebar-logout" onClick={handleLogout}>
            <FaSignOutAlt />
            {!collapsed && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
