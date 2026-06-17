import { Link } from "react-router-dom";
import logo from "../images/logo-head.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">

                <div className="row gy-4">

                    {/* About */}
                    <div className="col-lg-4 col-md-6">
                        <img src={logo} className="footer-logo" alt="logo" />

                        <p className="footer-text mt-3">
                            Bazaz Tech is a creative digital agency providing
                            modern web development and business solutions.
                        </p>

                        {/* Social Icons */}
                        <div className="footer-social">

                            <a
                                href="https://www.facebook.com/YOUR_PAGE"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://www.instagram.com/YOUR_PROFILE"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/YOUR_PROFILE"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedinIn />
                            </a>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Pages */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="footer-title">Pages</h5>
                        <ul className="footer-links">
                            <li><Link to="/team">Team</Link></li>
                            <li><Link to="/portfolio">Portfolio</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/pricing">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="footer-title">Contact</h5>
                        <p className="footer-contact">📧 info@bazaztech.com</p>
                        <p className="footer-contact">📞 +92 300 1234567</p>
                        <p className="footer-contact">📍 Karachi, Pakistan</p>
                    </div>

                </div>

                <hr className="footer-divider" />

                <div className="text-center footer-bottom">
                    © 2026 Bazaz Tech. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;