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
  FaChartBar,
  FaLayerGroup,
  FaHandshake,
  FaAddressCard,
} from "react-icons/fa";
import Logo from "../../components/Logo";
import { useAdmin } from "../context/AdminContext";
import { MODULE_PERMISSIONS, CRUD_PERMISSIONS, hasPermission } from "../constants/permissions";

const navItems = [
  { to: "/admin/dashboard", icon: FaHome, label: "Dashboard" },
  {
    to: "/admin/services",
    icon: FaServicestack,
    label: "Services",
    permission: [MODULE_PERMISSIONS.services, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/portfolio",
    icon: FaImages,
    label: "Case Studies",
    permission: [MODULE_PERMISSIONS.portfolio, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/training",
    icon: FaGraduationCap,
    label: "Training",
    permission: [MODULE_PERMISSIONS.training, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/about",
    icon: FaAddressCard,
    label: "About Us",
    permission: [MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/admins",
    icon: FaUsers,
    label: "Admins",
    permission: [MODULE_PERMISSIONS.admins, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/messages",
    icon: FaEnvelope,
    label: "Messages",
    permission: [MODULE_PERMISSIONS.messages, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/stats-cards",
    icon: FaChartBar,
    label: "Hero Stats Cards",
    permission: [MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/footer-cards",
    icon: FaLayerGroup,
    label: "Winning Deeds Cards",
    permission: [MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/trusted-logos",
    icon: FaHandshake,
    label: "Trusted-By Logos",
    permission: [MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view],
  },
  {
    to: "/admin/settings",
    icon: FaCog,
    label: "Settings",
    permission: [MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view],
  },
  { to: "/admin/profile", icon: FaUserCircle, label: "My Profile" },
];

const Sidebar = ({ collapsed, mobileOpen, onNavigate, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = useAdmin();

  const visibleNavItems = navItems.filter((item) => hasPermission(admin, item.permission));

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
        {visibleNavItems.map(({ to, icon: Icon, label }) => (
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
