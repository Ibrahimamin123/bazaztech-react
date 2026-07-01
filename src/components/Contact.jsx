import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getPublicSettings, submitContactMessage } from "../services/publicApi";
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
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getPublicSettings()
      .then((res) => setSettings(res.data.settings))
      .catch(() => setSettings(null));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch {
      Swal.fire("Error", "Failed to send message. Please try again.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="contact-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1>Contact Us</h1>
            <p className="text-muted">
              Have a project in mind? Send us a message and our team will respond shortly.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="contact-info-card h-100">
                <h4>Get In Touch</h4>
                <p>📧 {settings?.email || "info@bazaztech.com"}</p>
                <p>📞 {settings?.phone || "+92 327 8445721"}</p>
                <p>📍 {settings?.address || "Karachi, Pakistan"}</p>
              </div>
            </div>

            <div className="col-lg-7">
              <form className="contact-form-card" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input className="form-control" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control" rows="5" name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary px-4" disabled={sending}>
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
