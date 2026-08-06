import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConsultationModal from "./ConsultationModal";
import ContentCard from "./ContentCard";
import "../App.css";
import { getPublicCaseStudies } from "../services/publicApi";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop";

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConsultation, setShowConsultation] = useState(false);

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

  const openCaseStudyLink = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar />

  <motion.section
  className="case-hero page-with-navbar"
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  style={{ 
    paddingTop: '100px',  // Navbar ke neeche space
    paddingBottom: '10px', 
    marginBottom: 0 
  }}
>
  <div className="container text-center" style={{ 
    paddingTop: 0, 
    paddingBottom: 0 
  }}>
    <h1 style={{ marginBottom: 8 }}>Case Studies</h1>
    <p style={{ marginBottom: 0 }}>
      Real projects. Real results. Discover how Bazaz Tech helps businesses grow through
      innovative digital solutions.
    </p>
  </div>
</motion.section>

<section className="case-section" style={{ paddingTop: 0, marginTop: -15 }}>
  <div className="container" style={{ paddingTop: 0 }}>
    {/* Cards grid */}
    <div className="content-card-grid" style={{ marginTop: 0, paddingTop: 0 }}>
      {/* Cards */}
    </div>
  </div>
</section>

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

          {!loading && caseStudies.length > 0 && (
            <div className="content-card-grid">
              {caseStudies.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ContentCard
                    image={item.image || PLACEHOLDER}
                    title={item.title}
                    description={item.description}
                    onReadMore={() => openCaseStudyLink(item.externalUrl)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

     

      <Footer />
      <ConsultationModal show={showConsultation} onClose={() => setShowConsultation(false)} />
    </>
  );
};

export default CaseStudies;
