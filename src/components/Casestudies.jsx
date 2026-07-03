import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import "../App.css";
import { getPublicCaseStudies } from "../services/publicApi";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop";

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        const res = await getPublicCaseStudies();
        setCaseStudies(res.data.caseStudies || []);
      } catch {
        setCaseStudies([]);
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudies();
  }, []);

  return (
    <>
      <Navbar />

      <motion.section
        className="case-hero page-with-navbar"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container text-center">
          <h1>Case Studies</h1>
          <p>
            Real projects. Real results. Discover how Bazaz Tech helps businesses grow through
            innovative digital solutions.
          </p>
        </div>
      </motion.section>

      <section className="case-section">
        <div className="container">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          )}

          {!loading && caseStudies.length === 0 && (
            <div className="text-center py-5 text-muted">
              Case studies will appear here once added from the admin panel.
            </div>
          )}

          {!loading &&
            caseStudies.map((item, index) => (
              <motion.div
                key={item._id}
                className={`row align-items-center case-row ${
                  index % 2 !== 0 ? "flex-lg-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <div className="case-image-wrapper">
                    <img
                      src={item.image || PLACEHOLDER}
                      alt={item.title}
                      className="case-image"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER;
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="case-content">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>

                    {item.results?.length > 0 && (
                      <div className="row g-3 mt-4">
                        {item.results.map((result, i) => (
                          <div className="col-md-4" key={i}>
                            <div className="result-card">{result}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      <motion.section
        className="case-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <h2>Ready To Become Our Next Success Story?</h2>
          <p>Let&apos;s build innovative digital solutions that drive real business growth.</p>
          <WhatsAppButton>Get Free Consultation</WhatsAppButton>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default CaseStudies;
