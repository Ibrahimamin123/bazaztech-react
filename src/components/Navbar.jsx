import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.webp";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">

        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/features" onClick={() => setMenuOpen(false)}>Capabilities</Link></li>
          <li><Link to="/pricing" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/solutions" onClick={() => setMenuOpen(false)}>Solutions</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>Capabilities</Link></li>
        </ul>

        <div className="nav-buttons">
          <button className="btn-outline">Request A Demo</button>
          <button className="btn-primary">Get Started</button>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </div>

      </div>
    </header>
  );
};

export default Navbar;