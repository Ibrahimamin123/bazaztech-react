import { Link } from "react-router-dom";
import {
  FaHome,
  FaGlobe,
  FaServicestack,
  FaUserTie,
  FaImages,
  FaUsers,
  FaEnvelope,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
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
          <Link to="/admin/team">
            <FaUserTie /> Team
          </Link>
        </li>

        <li>
          <Link to="/admin/portfolio">
            <FaImages /> Portfolio
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
          <Link to="/admin/chatbot">
            <FaRobot /> Chatbot
          </Link>
        </li>

        <li>
          <Link to="/admin/settings">
            <FaCog /> Settings
          </Link>
        </li>

        <li>
          <Link to="/">
            <FaSignOutAlt /> Logout
          </Link>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;