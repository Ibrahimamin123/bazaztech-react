import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-head.png";
import ConsultationModal from "./ConsultationModal";

const Navbar = () => {
  const [showConsultation, setShowConsultation] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark custom-navbar fixed-top ${
        scrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
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

            <li className="nav-item">
              <Link className="nav-link" to="/corporatetraining">
                Training Programs
              </Link>
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
            <button type="button" className="btn btn-primary custom-btn" onClick={() => setShowConsultation(true)}>
              Get Free Consultation
            </button>
           
          </div>
        </div>
      </div>
      <ConsultationModal show={showConsultation} onClose={() => setShowConsultation(false)} />
 
    </nav>
  );
};

export default Navbar;
