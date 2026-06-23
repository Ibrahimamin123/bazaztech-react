import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-head.png";
import emailjs from "@emailjs/browser";


const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTraining, setShowTraining] = useState(false);


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7iqhes5",
        "template_wftjo39",
        e.target,
        "goGGNwAhFAXemLMDB"
      )
      .then(() => {
        alert("Email Sent Successfully");
        setShowModal(false);
      })
      .catch((error) => {
        alert("Error: " + error.text);
      });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
        <div className="container">

          {/* BRAND */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="Logo" className="logo-img" />
            <div className="brand-text">
              <h1 className="brand-title">Bazaz Tech</h1>
              <span className="brand-tag">Gateway To Success</span>
            </div>
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NAV LINKS */}
          <div className="collapse navbar-collapse" id="navbarContent">

            <ul className="navbar-nav mx-auto gap-lg-4 text-center">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
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

  <ul
    className={`training-menu ${
      showTraining ? "show-training" : ""
    }`}
  >
    <li>
      <Link className="dropdown-link" to="/corporatetraining">
        Coorporate Training
      </Link>
    </li>

    <li>
      <Link className="dropdown-link" to="/aiautomation">
        AI Automation
      </Link>
    </li>

    <li>
      <Link className="dropdown-link" to="/digitalmarketing">
        Digital Marketing
      </Link>
    </li>
  </ul>
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

            {/* BUTTON */}
            <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

              <button
                className="btn btn-primary custom-btn"
                onClick={() => setShowModal(true)}
              >
                Get a free consultation
              </button>

            </div>

          </div>
        </div>
      </nav>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">

            {/* CLOSE */}
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h3 className="mb-3">Get Consultation</h3>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/+92 327 8445721"
              target="_blank"
              rel="noreferrer"
              className="btn btn-success w-100 mb-3"
            >
              Chat on WhatsApp
            </a>

            {/* EMAIL FORM */}
            <form onSubmit={sendEmail} className="d-flex flex-column gap-2">

              <input
                name="user_name"
                placeholder="Your Name"
                className="form-control"
                required
              />

              <input
                name="user_email"
                placeholder="Your Email"
                className="form-control"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                className="form-control"
                rows="4"
                required
              />

              <button type="submit" className="btn btn-primary w-100">
                Send Email
              </button>

            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;