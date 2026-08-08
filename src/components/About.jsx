import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";
import { resolveImageSrc } from "../utils/image";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";

const About = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const { settings, loading } = useWebsiteSettings();

  // Same side-tab layout: Mission & Vision first (top), then Founder & CEO.
  // Mission / Vision are text-only (no image).
  const aboutData = useMemo(
    () => [
      {
        key: "mission",
        title: settings?.missionTitle || "Our Mission",
        name: "",
        subtitle: "",
        text: settings?.missionDescription || "",
        image: "",
        textOnly: true,
      },
      {
        key: "vision",
        title: settings?.visionTitle || "Our Vision",
        name: "",
        subtitle: "",
        text: settings?.visionDescription || "",
        image: "",
        textOnly: true,
      },
      {
        key: "founder",
        title: "Our Founder",
        name: settings?.founderName || "",
        subtitle: settings?.founderDesignation || "Founder",
        text: settings?.founderDescription || "",
        image: settings?.founderImage || "",
        textOnly: false,
      },
      {
        key: "ceo",
        title: "Our CEO",
        name: settings?.ceoName || "",
        subtitle: settings?.ceoDesignation || "Chief Executive Officer",
        text: settings?.ceoDescription || "",
        image: settings?.ceoImage || "",
        textOnly: false,
      },
    ],
    [settings]
  );

  const activeItem = aboutData[activeCard] || aboutData[0];
  const activeImage = !activeItem?.textOnly ? resolveImageSrc(activeItem?.image) : "";

  useEffect(() => {
    setImageFailed(false);
  }, [activeCard, activeImage]);

  const handleImageError = (e) => {
    const raw = activeItem?.image;
    if (raw && e.currentTarget.dataset.retried !== "1") {
      e.currentTarget.dataset.retried = "1";
      if (/^https?:\/\//i.test(raw)) {
        e.currentTarget.src = raw;
        return;
      }
      const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");
      e.currentTarget.src = `${apiBase}${raw.startsWith("/") ? raw : `/${raw}`}`;
      return;
    }
    setImageFailed(true);
  };

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
                      key={item.key}
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
                    className={`profile-card ${activeItem?.textOnly ? "profile-card-text-only" : ""}`}
                    key={activeCard}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {!activeItem?.textOnly && (
                      <div className="profile-card-media">
                        {activeImage && !imageFailed ? (
                          <img
                            src={activeImage}
                            alt={activeItem.name || activeItem.title}
                            onError={handleImageError}
                          />
                        ) : (
                          <FaUser />
                        )}
                      </div>
                    )}
                    <div className="profile-card-info">
                      {!activeItem?.textOnly && (
                        <>
                          <h3 className="profile-card-name">{activeItem?.name || activeItem?.title}</h3>
                          {activeItem?.subtitle && (
                            <p className="profile-card-subtitle">{activeItem.subtitle}</p>
                          )}
                        </>
                      )}
                      {activeItem?.textOnly && (
                        <h3 className="profile-card-name">{activeItem?.title}</h3>
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
