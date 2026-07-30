import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getPublicSettings } from "../services/publicApi";
import ContactForm from "./ContactForm";
import "../App.css";

const Contact = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getPublicSettings()
      .then((res) => setSettings(res.data.settings))
      .catch(() => setSettings(null));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />

      <motion.section
        className="contact-section page-with-navbar"
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="text-center mb-5 contact-heading">
            <h1>Contact Us</h1>
            <p>
              Have a project in mind? Send us a message and our team will respond shortly.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <motion.div
                className="contact-info-card h-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h4>Get In Touch</h4>
                <p>📧 {settings?.email || "info@bazaztech.com"}</p>
                <p>📞 {settings?.phone || "+92 327 8445721"}</p>
                <p>📍 {settings?.address || "Karachi, Pakistan"}</p>
              </motion.div>
            </div>

            <div className="col-lg-7">
              <ContactForm showWhatsApp />
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default Contact;
