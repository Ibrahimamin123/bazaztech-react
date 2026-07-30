import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import "../App.css";
import { FaStar, FaYoutube } from "react-icons/fa";
import { statsCardApi, footerCardApi, trustedLogoApi } from "../admin/services/cmsApi";
import { getIconComponent } from "../utils/iconRegistry";
import heroImg from "../images/hero.png";
import card1 from "../images/card1.png";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";
import card4 from "../images/card4.png";
import card5 from "../images/card5.png";
import card6 from "../images/card6.png";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import FounderVideoModal from "../components/FounderVideoModal";

// Fallback data shown only if the API hasn't returned anything yet (or the
// admin hasn't added cards). Keeps the homepage from looking empty.
const fallbackStatsCards = [
  { _id: "fallback-1", useStars: true, value: "1200+", label: "Happy Clients" },
  { _id: "fallback-2", title: "Trustpilot", value: "4.9", label: "Rating" },
  { _id: "fallback-3", title: "Capterra", value: "4.8", label: "Reviews" },
  { _id: "fallback-4", title: "Projects", value: "500+", label: "Delivered" },
];

const fallbackFooterCards = [
  { _id: "fallback-1", value: "10+", label: "Industries Served" },
  { _id: "fallback-2", value: "100+", label: "Projects Delivered" },
  { _id: "fallback-3", value: "100%", label: "Client Satisfaction" },
  { _id: "fallback-4", value: "50+", label: "Professional Team" },
  { _id: "fallback-5", value: "10 Years", label: "Market Experience" },
];

const Home = () => {
  const [statsCards, setStatsCards] = useState(fallbackStatsCards);
  const [footerCards, setFooterCards] = useState(fallbackFooterCards);
  const [showFounderVideo, setShowFounderVideo] = useState(false);
  const heroLine1Ref = useRef(null);
  const heroLine2Ref = useRef(null);

  const fallbackTrustedLogos = [
    { _id: "fallback-1", image: card1, name: "" },
    { _id: "fallback-2", image: card2, name: "" },
    { _id: "fallback-3", image: card3, name: "" },
    { _id: "fallback-4", image: card4, name: "" },
    { _id: "fallback-5", image: card5, name: "" },
    { _id: "fallback-6", image: card6, name: "" },
  ];
  const [trustedLogos, setTrustedLogos] = useState(fallbackTrustedLogos);

  useEffect(() => {
    statsCardApi
      .getPublic()
      .then((res) => {
        const cards = res.data?.statsCards || [];
        if (cards.length) setStatsCards(cards);
      })
      .catch(() => {});

    footerCardApi
      .getPublic()
      .then((res) => {
        const cards = res.data?.footerCards || [];
        if (cards.length) setFooterCards(cards);
      })
      .catch(() => {});

    trustedLogoApi
      .getPublic()
      .then((res) => {
        const logos = res.data?.trustedLogos || [];
        if (logos.length) setTrustedLogos(logos);
      })
      .catch(() => {});
  }, []);

  // Scale "Your Digital Presence" so its rendered width matches
  // "Build. Launch. Scale. Grow." exactly, instead of guessing a fixed
  // font-size ratio (different font families/weights render at different
  // widths per character, so a fixed em ratio drifts at different
  // viewport sizes).
  useEffect(() => {
    const matchWidth = () => {
      const line1 = heroLine1Ref.current;
      const line2 = heroLine2Ref.current;
      if (!line1 || !line2) return;

      const targetWidth = line1.getBoundingClientRect().width;
      if (!targetWidth) return;

      // Reset to the CSS baseline size before measuring, so repeated
      // resizes scale from a stable starting point instead of compounding.
      line2.style.fontSize = "";
      const baseSize = parseFloat(window.getComputedStyle(line2).fontSize);
      const baseWidth = line2.getBoundingClientRect().width;
      if (!baseSize || !baseWidth) return;

      const scaled = baseSize * (targetWidth / baseWidth);
      // Keep it within a sane range so it can't blow up or vanish on
      // extreme viewport widths.
      const clamped = Math.min(Math.max(scaled, 16), 170);
      line2.style.fontSize = `${clamped}px`;
    };

    matchWidth();
    window.addEventListener("resize", matchWidth);
    window.addEventListener("load", matchWidth);
    if (document.fonts?.ready) {
      document.fonts.ready.then(matchWidth);
    }

    // Fonts/images finishing after mount can change line1's measured width
    // without firing a window resize event — watch it directly so the two
    // headings stay matched even after that late layout shift.
    let observer;
    if (typeof ResizeObserver !== "undefined" && heroLine1Ref.current) {
      observer = new ResizeObserver(() => matchWidth());
      observer.observe(heroLine1Ref.current);
    }

    return () => {
      window.removeEventListener("resize", matchWidth);
      window.removeEventListener("load", matchWidth);
      if (observer) observer.disconnect();
    };
  }, []);

  // Duplicated so the CSS marquee can loop seamlessly.
  const marqueeLogos = [...trustedLogos, ...trustedLogos];

  return (
    <>
      <Navbar />
<motion.section
  className="hero text-white d-flex align-items-center position-relative"
  style={{
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  }}
  initial={false}
>
        <div className="container text-center">
          {/* CENTER CONTENT */}
          <motion.div
  className="row justify-content-center align-items-center flex-column-reverse flex-lg-row"
  initial={false}
>
            <div className="col-lg-10">
              <h1 className="hero-title">
                <span className="hero-title-line1" ref={heroLine1Ref}>
                  <span className="whi">
                    Build<span className="dot">.</span>
                  </span>{" "}
                  <span className="whi">
                    Launch<span className="dot">.</span>
                  </span>{" "}
                  <span className="whi">
                    Scale<span className="dot">.</span>
                  </span>{" "}
                  <span className="whi">
                    Grow<span className="dot">.</span>
                  </span>
                </span>
                <span className="sub-text" ref={heroLine2Ref}>Your Digital Presence</span>
              </h1>

              <p className="mt-3 text-light">
                At BazazTech, we build digital foundations for growth. High
                converting websites, marketing & design systems.
              </p>

              {/* CARDS */}
              <div className="row g-3 mt-5 justify-content-center">
                {statsCards.map((item) => {
                  const CardIcon = !item.useStars && !item.image && item.icon ? getIconComponent(item.icon) : null;
                  return (
                    <div className="col-6 col-md-3" key={item._id}>
                      <div className="card bg-dark text-white border-secondary h-100 text-center stat-card-split">
                        <div className="stat-card-icon-area">
                          {item.useStars ? (
                            <div className="text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          ) : item.image ? (
                            <img src={item.image} alt={item.title || item.label} className="stat-card-image" />
                          ) : CardIcon ? (
                            <div className="stat-card-icon">
                              <CardIcon />
                            </div>
                          ) : (
                            item.title && <h5>{item.title}</h5>
                          )}
                        </div>
                        <div className="stat-card-text-area">
                          <h4>{item.value}</h4>
                          <small>{item.label}</small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FOUNDER CTA */}
              <button
                type="button"
                className="founder-btn"
                onClick={() => setShowFounderVideo(true)}
              >
                <span className="founder-yt-icon">
                  <FaYoutube />
                </span>
                A Note from Our Founder
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <FounderVideoModal
        show={showFounderVideo}
        onClose={() => setShowFounderVideo(false)}
      />

      <Chatbot />

      <section className="trust-section py-5 text-white">
        <div className="container text-center">
          <h2 className="fw-bold">Trusted by Happy Customers</h2>

          <p className="text-light mb-5">
            Top Businesses & Brands trust BazazTech for their biggest projects
          </p>

          <div className="trust-marquee">
            <div className="trust-marquee-track">
              {marqueeLogos.map((item, index) => (
                <div className="trust-card" key={`${item._id}-${index}`}>
                  <img src={item.image} alt={item.name || "Trusted brand"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="project-title">Start a Project</h2>

              <p className="project-text">
                Do you have a business growth objective you'd like to achieve?
                Are you ready to find out how <strong>BazazTech</strong> can
                help build your business online? If so, make contact with us
                today...
              </p>

              <button className="btn project-btn">Get A Quote</button>
            </div>
          </div>
        </div>
      </section>
      <section className="winning-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="winning-title">Our Winning Deeds</h2>

              <p className="winning-desc">
                Our success is anchored by our skilled team, extensive
                experience, in-depth technical understanding, focused goal
                setting, and the positive impact we have on our diverse customer
                base through their satisfaction.
              </p>
            </div>
          </div>

          <div className="row g-4 mt-4 justify-content-center">
            {footerCards.map((item) => (
              <div className="col-6 col-md-4 col-lg-2" key={item._id}>
                <div className="stat-box">
                  <h3>{item.value}</h3>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
