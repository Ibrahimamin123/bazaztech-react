import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useState } from "react";
import { submitContactMessage } from "../services/publicApi";
import WhatsAppButton from "./WhatsAppButton";
import {
  collectErrors,
  hasErrors,
  validateEmail,
  validateMaxLength,
  validatePhone,
  validateRequired,
} from "../utils/validation";

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactForm = ({ className = "contact-form-card", compact = false, onSubmitted, showWhatsApp = false }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

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
      setForm(defaultForm);
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "We will get back to you soon.",
        timer: 1800,
        showConfirmButton: false,
      });
      if (onSubmitted) onSubmitted();
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
    <motion.form
      className={className}
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="row g-3">
        <div className={compact ? "col-12" : "col-md-6"}>
          <input
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </div>
        <div className={compact ? "col-12" : "col-md-6"}>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </div>
        <div className={compact ? "col-12" : "col-md-6"}>
          <input
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
        </div>
        <div className={compact ? "col-12" : "col-md-6"}>
          <input
            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />
          {errors.subject && <div className="invalid-feedback d-block">{errors.subject}</div>}
        </div>
        <div className="col-12">
          <textarea
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            rows={compact ? "4" : "5"}
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <div className="invalid-feedback d-block">{errors.message}</div>}
        </div>
        <div className="col-12">
          <div className="contact-form-actions">
            <motion.button
              className="btn btn-primary px-4"
              disabled={sending}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {sending ? "Sending..." : "Send Message"}
            </motion.button>
            {showWhatsApp && (
              <WhatsAppButton
                className="btn whatsapp-btn whatsapp-cta-btn px-4"
                message="Hello! I'd like to get in touch with Bazaz Tech."
              >
                WhatsApp
              </WhatsAppButton>
            )}
          </div>
        </div>
      </div>
    </motion.form>
  );
};

export default ContactForm;
