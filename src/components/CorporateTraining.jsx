import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConsultationModal from "./ConsultationModal";
import ContentCard from "./ContentCard";
import ReadMoreModal from "./ReadMoreModal";
import WhatsAppButton from "./WhatsAppButton";
import "../App.css";
import { getPublicTraining } from "../services/publicApi";
import { resolveImageSrc } from "../utils/image";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop";

const CorporateTraining = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConsultation, setShowConsultation] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const loadTraining = async () => {
      try {
        const res = await getPublicTraining();
        const items = res.data.trainings || [];
        // Only show program cards from the dashboard (hero / why-choose sections removed).
        setPrograms(
          items.filter((item) => item.section === "program" || !item.section),
        );
      } catch {
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    loadTraining();
  }, []);

  return (
    <>
      <Navbar />

      <section className="program-section page-with-navbar">
        <div className="container">
          <div className="text-center mt-3 ">
            <h2>Training Programs</h2>
            <p>
              Whether you're an individual ready to learn or a business
              investing in your team, we have the right training program for
              you.
            </p>
          </div>

          {loading && (
            <div className="text-center py-4 mt-1">
              <div className="spinner-border text-primary" />
            </div>
          )}

          <div className="content-card-grid mt-5">
            {!loading && programs.length === 0 && (
              <div className="col-12 text-center text-muted">
                Training programs will appear here once added from the admin
                panel.
              </div>
            )}

            {programs.map((program) => (
              <ContentCard
                key={program._id}
                image={resolveImageSrc(program.image) || PLACEHOLDER}
                title={program.title}
                description={program.description || "No description available."}
                onReadMore={() => setSelectedProgram(program)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ConsultationModal
        show={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
      <ReadMoreModal
        show={!!selectedProgram}
        onClose={() => setSelectedProgram(null)}
        item={selectedProgram}
        footer={
          selectedProgram && (
            <WhatsAppButton
              className="btn whatsapp-btn w-100"
              message={`Hello! I'd like to apply for the "${selectedProgram.title}" training program.`}
            >
              Apply Now
            </WhatsAppButton>
          )
        }
      />
    </>
  );
};

export default CorporateTraining;
