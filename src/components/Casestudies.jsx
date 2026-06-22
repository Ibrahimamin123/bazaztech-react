import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";

import case1 from "../images/case1.jpg";
import case2 from "../images/case2.jpg";
import case3 from "../images/case3.jpg";
import case4 from "../images/case4.jpg";

const caseStudies = [
  {
    id: 1,
    title: "E-Commerce Growth",
    image: case1,
    description:
      "We developed a powerful e-commerce platform that increased online sales and improved customer engagement through a modern shopping experience.",
    results: ["180% Sales Growth", "120% More Traffic", "95% Satisfaction"],
  },
  {
    id: 2,
    title: "Corporate Website Redesign",
    image: case2,
    description:
      "A complete redesign that improved user experience, strengthened brand identity, and increased lead generation.",
    results: ["70% Engagement", "55% More Leads", "40% Faster Speed"],
  },
  {
    id: 3,
    title: "SEO Success Campaign",
    image: case3,
    description:
      "Our SEO strategy helped the client rank higher in search engines and attract more organic visitors.",
    results: ["Top Rankings", "300% Traffic", "150% More Leads"],
  },
  {
    id: 4,
    title: "Mobile App Development",
    image: case4,
    description:
      "Built a scalable mobile application with excellent performance and a user-friendly experience.",
    results: ["50K Downloads", "4.9 Rating", "85% Retention"],
  },
];

const CaseStudies = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="case-hero">
        <div className="container text-center">
          <h1>Case Studies</h1>
          <p>
            Real projects. Real results. Discover how Bazaz Tech helps
            businesses grow through innovative digital solutions.
          </p>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="case-section">
        <div className="container">

          {caseStudies.map((item, index) => (
            <div
              key={item.id}
              className={`row align-items-center case-row ${
                index % 2 !== 0 ? "flex-lg-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="case-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="case-image"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="col-lg-6">
                <div className="case-content">

                  <h2>{item.title}</h2>

                  <p>{item.description}</p>

                  <div className="row g-3 mt-4">

                    {item.results.map((result, i) => (
                      <div className="col-md-4" key={i}>
                        <div className="result-card">
                          {result}
                        </div>
                      </div>
                    ))}

                  </div>

                  <button className="btn custom-btn mt-4">
                    View Project
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="case-cta">
        <div className="container text-center">

          <h2>Ready To Become Our Next Success Story?</h2>

          <p>
            Let's build innovative digital solutions that drive real business
            growth.
          </p>

          <button className="btn custom-btn">
            Get Free Consultation
          </button>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default CaseStudies;