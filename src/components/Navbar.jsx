import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-head.png";

const Navbar = () => {
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <ul className="navbar-nav mx-auto gap-lg-4 text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/capabilities">
                Capabilities
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/solutions">
                Solutions
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
          </ul>

          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
            <button className="btn btn-outline-light">
              Request A Demo
            </button>

            <button className="btn btn-primary custom-btn">
              Get Started
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;