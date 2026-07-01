import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
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

      <section className="case-hero">
        <div className="container text-center">
          <h1>Case Studies</h1>
          <p>
            Real projects. Real results. Discover how Bazaz Tech helps businesses
            grow through innovative digital solutions.
          </p>
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

          {!loading &&
            caseStudies.map((item, index) => (
              <div
                key={item._id}
                className={`row align-items-center case-row ${
                  index % 2 !== 0 ? "flex-lg-row-reverse" : ""
                }`}
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

                    <button className="btn custom-btn mt-4">View Project</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="case-cta">
        <div className="container text-center">
          <h2>Ready To Become Our Next Success Story?</h2>
          <p>Let&apos;s build innovative digital solutions that drive real business growth.</p>
          <button className="btn custom-btn">Get Free Consultation</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CaseStudies;
