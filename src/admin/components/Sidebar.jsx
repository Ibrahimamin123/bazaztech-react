import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaGlobe,
  FaServicestack,
  FaUserTie,
  FaImages,
  FaUsers,
  FaEnvelope,
  FaQuestionCircle,
  FaStar,
  FaShareAlt,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h3>BazazTech</h3>
      </div>

      <ul>
        <li>
          <Link to="/admin/dashboard">
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/hero">
            <FaGlobe /> Hero Section
          </Link>
        </li>
        <li>
          <Link to="/admin/services">
            <FaServicestack /> Services
          </Link>
        </li>
        <li>
          <Link to="/admin/about">
            <FaGlobe /> About
          </Link>
        </li>
        <li>
          <Link to="/admin/team">
            <FaUserTie /> Team
          </Link>
        </li>
        <li>
          <Link to="/admin/portfolio">
            <FaImages /> Case Studies
          </Link>
        </li>
        <li>
          <Link to="/admin/training">
            <FaGraduationCap /> Training
          </Link>
        </li>
        <li>
          <Link to="/admin/testimonials">
            <FaStar /> Testimonials
          </Link>
        </li>
        <li>
          <Link to="/admin/faqs">
            <FaQuestionCircle /> FAQs
          </Link>
        </li>
        <li>
          <Link to="/admin/social">
            <FaShareAlt /> Social Links
          </Link>
        </li>
        <li>
          <Link to="/admin/admins">
            <FaUsers /> Admins
          </Link>
        </li>
        <li>
          <Link to="/admin/messages">
            <FaEnvelope /> Messages
          </Link>
        </li>
        <li>
          <Link to="/admin/settings">
            <FaCog /> Settings
          </Link>
        </li>
        <li>
          <button type="button" className="sidebar-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
