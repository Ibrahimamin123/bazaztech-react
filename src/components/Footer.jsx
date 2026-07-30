import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { getPublicSettings, getPublicSocial } from "../services/publicApi";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

const Footer = () => {
  const [settings, setSettings] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const [settingsRes, socialRes] = await Promise.all([
          getPublicSettings(),
          getPublicSocial(),
        ]);

        setSettings(settingsRes.data.settings);
        setSocialLinks(socialRes.data.socialLinks || []);
      } catch {
        setSettings(null);
        setSocialLinks([]);
      }
    };

    loadFooterData();
  }, []);

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            {settings?.logo ? (
              <img src={settings.logo} className="footer-logo" alt="logo" />
            ) : (
              <h4 className="footer-brand">{settings?.siteName || "BazazTech"}</h4>
            )}

            <p className="footer-text mt-3">
              {settings?.footerText ||
                "Bazaz Tech is a creative digital agency providing modern web development and business solutions."}
            </p>

            <div className="footer-social">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.platform?.toLowerCase()] || FaLinkedinIn;
                return (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Pages</h5>
            <ul className="footer-links">
              <li><Link to="/casestudies">Case Studies</Link></li>
              <li><Link to="/corporatetraining">Training</Link></li>
              <li><Link to="/services">Services</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Contact</h5>
            <p className="footer-contact">📧 {settings?.email || "info@bazaztech.com"}</p>
            <p className="footer-contact">📞 {settings?.phone || "+92 327 8445721"}</p>
            <p className="footer-contact">
              📍 {settings?.address || "Karachi, Pakistan"}
            </p>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="text-center footer-bottom">
          {settings?.copyright || "© 2026 Bazaz Tech. All Rights Reserved."}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
