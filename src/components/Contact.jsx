import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getPublicSettings, submitContactMessage } from "../services/publicApi";
import {
  collectErrors,
  hasErrors,
  validateEmail,
  validateMaxLength,
  validatePhone,
  validateRequired,
} from "../utils/validation";
import "../App.css";

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getPublicSettings()
      .then((res) => setSettings(res.data.settings))
      .catch(() => setSettings(null));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = collectErrors([
      { field: "name", message: validateRequired(form.name, "Name") },
      { field: "email", message: validateEmail(form.email) },
      { field: "phone", message: validatePhone(form.phone) },
      { field: "subject", message: validateMaxLength(form.subject, 150, "Subject") },
      { field: "message", message: validateRequired(form.message, "Message") },
      { field: "message", message: validateMaxLength(form.message, 2000, "Message") },
    ]);
    setErrors(nextErrors);
    return !hasErrors(nextErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSending(true);
      await submitContactMessage(form);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "We will get back to you soon.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to send message. Please try again.",
        "error"
      );
    } finally {
      setSending(false);
    }
  };

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
            <p className="text-muted">
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
              <motion.form
                className="contact-form-card"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      name="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      name="phone"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback d-block">{errors.phone}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && (
                      <div className="invalid-feedback d-block">{errors.subject}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <textarea
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      rows="5"
                      name="message"
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <div className="invalid-feedback d-block">{errors.message}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <motion.button
                      className="btn btn-primary px-4"
                      disabled={sending}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default Contact;
