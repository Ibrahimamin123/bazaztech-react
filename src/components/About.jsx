import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";
import { resolveImageSrc } from "../utils/image";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";

const About = () => {
  const [activeCard, setActiveCard] = useState(0);
  const { settings, loading } = useWebsiteSettings();

  const aboutData = useMemo(
    () => [
      {
        title: "Our Founder",
        name: settings?.founderName || "",
        subtitle: settings?.founderDesignation || "Founder",
        text: settings?.founderDescription || "",
        image: settings?.founderImage || "",
      },
      {
        title: "Our CEO",
        name: settings?.ceoName || "",
        subtitle: settings?.ceoDesignation || "Chief Executive Officer",
        text: settings?.ceoDescription || "",
        image: settings?.ceoImage || "",
      },
    ],
    [settings]
  );

  const activeItem = aboutData[activeCard] || aboutData[0];

  return (
    <>
      <Navbar />
      <motion.section
        className="about-section page-with-navbar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="about-main-heading text-center">
            <h2>{settings?.aboutHeading || "About Us"}</h2>
            <p>
              {settings?.aboutSubtitle ||
                "Learn more about our company, vision, mission and the values that drive us."}
            </p>
            {settings?.aboutDescription && <p>{settings.aboutDescription}</p>}
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
                      key={item.title}
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
                  <motion.div
                    className="profile-card"
                    key={activeCard}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="profile-card-media">
                      {activeItem?.image ? (
                        <img src={resolveImageSrc(activeItem.image)} alt={activeItem.name || activeItem.title} />
                      ) : (
                        <FaUser />
                      )}
                    </div>
                    <div className="profile-card-info">
                      <span className="profile-card-badge">{activeItem?.title}</span>
                      <h3 className="profile-card-name">{activeItem?.name || activeItem?.title}</h3>
                      {activeItem?.subtitle && (
                        <p className="profile-card-subtitle">{activeItem.subtitle}</p>
                      )}
                      <p className="profile-card-bio">{activeItem?.text}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default About;
