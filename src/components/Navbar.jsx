import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../images/logo-head.png";
import WhatsAppButton from "./WhatsAppButton";

const Navbar = () => {
  const [showTraining, setShowTraining] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="Logo" className="logo-img" />
          <div className="brand-text">
            <h1 className="brand-title">Bazaz Tech</h1>
            <span className="brand-tag">Gateway To Success</span>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto gap-lg-4 text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/casestudies">
                Case Studies
              </Link>
            </li>

            <li
              className="nav-item training-dropdown"
              onClick={() => setShowTraining(!showTraining)}
            >
              <span className="nav-link training-link">
                Training Programs {showTraining ? "▲" : "▼"}
              </span>

              <motion.ul
                className={`training-menu ${showTraining ? "show-training" : ""}`}
                initial={false}
                animate={{ opacity: showTraining ? 1 : 0.95 }}
              >
                <li>
                  <Link className="dropdown-link" to="/corporatetraining">
                    Corporate Training
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-link" to="/corporatetraining">
                    AI Automation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-link" to="/corporatetraining">
                    Digital Marketing
                  </Link>
                </li>
              </motion.ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
          </ul>

          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
