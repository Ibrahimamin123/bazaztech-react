import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";
import { useEffect, useState } from "react";
import { getPublicAbout } from "../services/publicApi";

const fallbackAbout = [
  {
    title: "Our Mission",
    text: "Our mission is to empower businesses with innovative digital solutions that enhance growth, efficiency, and customer engagement.",
  },
  {
    title: "Our Vision",
    text: "Our vision is to become a globally recognized digital agency known for creativity, innovation, and excellence.",
  },
];

const About = () => {
  const [aboutData, setAboutData] = useState(fallbackAbout);
  const [activeCard, setActiveCard] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await getPublicAbout();
        const sections = res.data.aboutSections || [];

        if (sections.length > 0) {
          setAboutData(sections);
        }
      } catch {
        setAboutData(fallbackAbout);
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
  }, []);

  const activeItem = aboutData[activeCard] || aboutData[0];

  return (
    <>
      <Navbar />
      <section className="about-section">
        <div className="container">
          <div className="about-main-heading text-center">
            <h2>About Us</h2>
            <p>
              Learn more about our company, vision, mission and the values that drive us.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            <div className="row align-items-center">
              <div className="col-lg-3">
                <div className="about-tabs">
                  {aboutData.map((item, index) => (
                    <div
                      key={item._id || index}
                      className={`about-tab ${activeCard === index ? "active-tab" : ""}`}
                      onClick={() => setActiveCard(index)}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-9">
                <div className="about-content-box">
                  <h3>{activeItem?.title}</h3>
                  <p>{activeItem?.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
