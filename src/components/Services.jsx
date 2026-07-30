import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./Chatbot";
import ContentCard from "./ContentCard";
import ReadMoreModal from "./ReadMoreModal";
import WhatsAppButton from "./WhatsAppButton";
import { getPublicServices } from "../services/publicApi";
import { FaServicestack } from "react-icons/fa";
import "../App.css";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const res = await getPublicServices();
        setServices(res.data.services || []);
      } catch {
        setError("Unable to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <>
      <Navbar />

      <div className="services-page">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="services-hero text-center page-with-navbar"
        >
          <div className="container py-5">
            <span className="services-badge">What We Offer</span>
            <h1 className="display-4 fw-bold mt-3">Our Services</h1>
            <p className="services-subtitle mx-auto">
              Scalable digital solutions crafted for modern businesses — fully
              managed from your admin dashboard.
            </p>
          </div>
        </motion.section>

        <section className="container py-5">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {!loading && !error && services.length === 0 && (
            <div className="text-center py-5 services-empty">
              <FaServicestack size={48} className="mb-3 text-primary" />
              <h3>No services available yet</h3>
              <p className="text-muted">
                Services added from the admin panel will appear here automatically.
              </p>
            </div>
          )}

          {!loading && !error && services.length > 0 && (
            <div className="content-card-grid">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <ContentCard
                    image={service.image || PLACEHOLDER}
                    title={service.title}
                    description={service.description}
                    onReadMore={() => setSelectedService(service)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <motion.section
          className="services-cta text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container py-5">
            <h2 className="fw-bold mb-3">Ready to Grow Your Business?</h2>
            <p className="mb-4">
              Let&apos;s build something amazing together with BazazTech.
            </p>
            <Link to="/contact" className="btn btn-outline-light px-4 py-2">
              Contact Us
            </Link>
          </div>
        </motion.section>
      </div>

      <Footer />
      <Chatbot />
      <ReadMoreModal
        show={!!selectedService}
        onClose={() => setSelectedService(null)}
        item={selectedService ? { ...selectedService, list: selectedService.features } : null}
        listLabel="What's Included"
        footer={
          <div className="d-flex flex-wrap gap-2">
            <Link
              to="/contact"
              className="btn btn-primary px-4 py-2"
              onClick={() => setSelectedService(null)}
            >
              Get Quote
            </Link>
            {selectedService && (
              <WhatsAppButton
                className="btn cta-btn px-4 py-2"
                message={`Hello! I'd like to ask about your "${selectedService.title}" service.`}
              >
                Send Message on WhatsApp
              </WhatsAppButton>
            )}
          </div>
        }
      />
    </>
  );
};

export default Services;
