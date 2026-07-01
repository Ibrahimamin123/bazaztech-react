import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";
import { getPublicTraining } from "../services/publicApi";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop";

const CorporateTraining = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTraining = async () => {
      try {
        const res = await getPublicTraining();
        setTrainings(res.data.trainings || []);
      } catch {
        setTrainings([]);
      } finally {
        setLoading(false);
      }
    };

    loadTraining();
  }, []);

  const hero = trainings.find((item) => item.section === "hero");
  const features = trainings.filter((item) => item.section === "feature");
  const programs = trainings.filter((item) => item.section === "program");

  return (
    <>
      <Navbar />

      <section className="corporate-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="corp-title">
                {hero?.title || "Corporate Training Programs"}
              </h1>
              <p className="corp-text">
                {hero?.description ||
                  "Empower your workforce with industry-focused training programs designed to improve productivity, innovation, and business growth."}
              </p>
              <button className="btn corp-btn">Get Free Consultation</button>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src={hero?.image || PLACEHOLDER}
                alt="training"
                className="img-fluid corp-img"
                onError={(e) => {
                  e.currentTarget.src = PLACEHOLDER;
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Choose Us</h2>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            <div className="row g-4">
              {(features.length > 0
                ? features
                : [
                    { title: "Industry Experts", description: "Learn from experienced professionals." },
                    { title: "Hands-On Learning", description: "Practical projects and real scenarios." },
                    { title: "Certification", description: "Recognized completion certificates." },
                    { title: "Custom Programs", description: "Training tailored to company needs." },
                  ]
              ).map((item, index) => (
                <div className="col-md-6 col-lg-3" key={item._id || index}>
                  <div className="why-card">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="program-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Training Programs</h2>
          </div>

          <div className="row g-4">
            {programs.length === 0 && !loading && (
              <div className="col-12 text-center text-muted">
                Training programs will appear here once added from the admin panel.
              </div>
            )}

            {programs.map((program) => (
              <div className="col-md-6 col-lg-4" key={program._id}>
                <div className="program-card">
                  <h4>{program.title}</h4>
                  {program.description && <p className="mb-0 mt-2">{program.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready To Upskill Your Team?</h2>
          <p>
            Contact us today and discover how our corporate training programs can
            transform your workforce.
          </p>
          <button className="btn cta-btn">Schedule Meeting</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CorporateTraining;
