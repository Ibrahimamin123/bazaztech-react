import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import "../App.css";
import { FaStar, FaYoutube } from "react-icons/fa";
import {
  statsCardApi,
  footerCardApi,
  trustedLogoApi,
} from "../admin/services/cmsApi";
import { getIconComponent } from "../utils/iconRegistry";
import { resolveImageSrc } from "../utils/image";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";
import heroImg from "../images/hero.webp";
import card1 from "../images/card1.png";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";
import card4 from "../images/card4.png";
import card5 from "../images/card5.png";
import card6 from "../images/card6.png";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import FounderVideoModal from "../components/FounderVideoModal";

// Tiny (32px-wide) blurred version of the hero image, inlined as base64 so
// it paints instantly with zero network requests. The full-size hero.webp
// (~45KB, converted from an 8000x4500 6MB PNG) fades in over it once it
// finishes loading — a "blur-up" placeholder that keeps the hero feeling
// fast even on slow connections.
const HERO_LQIP =
  "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAACwAwCdASogABIAPuVgpU2pJaOiN/VYASAciWQAtvqAAnZZ+r34wAD+8LZr3gWykdK/ZrZ5YvGMosxkUR3TfPPf9QbfPXSAc7SHxtFvqbQcSWQxENSCYTk9BaJOqenAgAA=";

// ✅ EMPTY ARRAY - No fallback cards (static cards hatao)
const fallbackStatsCards = [];
const fallbackFooterCards = [];

const Home = () => {
  const [statsCards, setStatsCards] = useState([]);
  const [footerCards, setFooterCards] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [footerLoading, setFooterLoading] = useState(true);
  const [showFounderVideo, setShowFounderVideo] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const heroLine1Ref = useRef(null);
  const heroLine2Ref = useRef(null);
  const { founderVideoUrl, youtubeChannelUrl } = useWebsiteSettings();

  // Preload the full-resolution hero image in the background. The section
  // paints immediately with the inlined LQIP placeholder above, then
  // crossfades to the sharp image the instant it's ready.
  useEffect(() => {
    const img = new Image();
    if ("fetchPriority" in img) img.fetchPriority = "high";
    img.onload = () => setHeroLoaded(true);
    img.src = heroImg;
    if (img.complete) setHeroLoaded(true);
  }, []);

  const fallbackTrustedLogos = [
    { _id: "fallback-1", image: card1, name: "" },
    { _id: "fallback-2", image: card2, name: "" },
    { _id: "fallback-3", image: card3, name: "" },
    { _id: "fallback-4", image: card4, name: "" },
    { _id: "fallback-5", image: card5, name: "" },
    { _id: "fallback-6", image: card6, name: "" },
  ];
  const [trustedLogos, setTrustedLogos] = useState(fallbackTrustedLogos);

  // ✅ Fetch stats cards - No fallback, only original content
  useEffect(() => {
    setStatsLoading(true);
    statsCardApi
      .getPublic()
      .then((res) => {
        const cards = res.data?.statsCards || [];
        setStatsCards(cards);
      })
      .catch(() => {
        setStatsCards([]);
      })
      .finally(() => {
        setStatsLoading(false);
      });

    setFooterLoading(true);
    footerCardApi
      .getPublic()
      .then((res) => {
        const cards = res.data?.footerCards || [];
        setFooterCards(cards);
      })
      .catch(() => {
        setFooterCards([]);
      })
      .finally(() => {
        setFooterLoading(false);
      });

    trustedLogoApi
      .getPublic()
      .then((res) => {
        const logos = res.data?.trustedLogos || [];
        if (logos.length) setTrustedLogos(logos);
      })
      .catch(() => {});
  }, []);

  // Keep the main heading at its CSS font size. Size the subheading so
  // that, when both are centered:
  //   • "Y" in "Your" sits under "u" in "Build"
  //   • final "e" in "Presence" sits under "o" in "Grow"
  // i.e. the subheading is inset by ~1 heading character on each side.
  useEffect(() => {
    const matchWidth = () => {
      const line1 = heroLine1Ref.current;
      const line2 = heroLine2Ref.current;
      if (!line1 || !line2) return;

      line1.style.maxWidth = "";
      line2.style.maxWidth = "";
      line2.style.fontSize = "";

      const headingWidth = line1.getBoundingClientRect().width;
      if (!headingWidth) return;

      const headingChars = Math.max(
        line1.textContent?.replace(/\s+/g, " ").trim().length || 1,
        1,
      );
      // One average heading glyph — used for the ~1-character inset each side.
      const headingCharWidth = headingWidth / headingChars;

      const baseSize = parseFloat(window.getComputedStyle(line2).fontSize);
      const baseWidth = line2.getBoundingClientRect().width;
      if (!baseSize || !baseWidth) return;

      // Inset ~1 character on the left (past "B") and ~1 on the right
      // (before the final "w"/dot), so the subheading spans u…o.
      const targetSubWidth = Math.max(
        headingWidth - 4 * headingCharWidth,
        baseWidth * 0.5,
      );
      const scaled = baseSize * (targetSubWidth / baseWidth);
      const clamped = Math.min(Math.max(scaled, 16), 170);
      line2.style.fontSize = `${clamped}px`;

      line1.style.maxWidth = "100%";
      line2.style.maxWidth = "100%";
    };

    matchWidth();
    window.addEventListener("resize", matchWidth);
    window.addEventListener("load", matchWidth);
    if (document.fonts?.ready) {
      document.fonts.ready.then(matchWidth);
    }

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

  // Build a long enough strip, then duplicate it so translateX(-50%) loops seamlessly.
  const marqueeLogos = (() => {
    if (!trustedLogos.length) return [];
    let strip = [...trustedLogos];
    while (strip.length < 6) {
      strip = [...strip, ...trustedLogos];
    }
    return [...strip, ...strip];
  })();

  return (
    <>
      <Navbar />
      <motion.section
        className="hero text-white d-flex align-items-center position-relative"
        style={{
          backgroundImage: `url(${HERO_LQIP})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          overflow: "hidden",
        }}
        initial={false}
      >
        {/* Full-resolution hero image, crossfades in over the blurred
            placeholder once it's finished loading. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: heroLoaded ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        />
        <div
          className="container text-center position-relative"
          style={{ zIndex: 1 }}
        >
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
                <span className="sub-text" ref={heroLine2Ref}>
                  Your Digital Presence
                </span>
              </h1>

              <p className="mt-3 text-light">
                At BazazTech, we help businesses build a stronger online
                presence through smart strategies and growth-focused digital
                solutions.
              </p>

              {/* ✅ CARDS - Only show when loading is done AND cards exist */}
              {!statsLoading && statsCards.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <div className="row g-2 g-md-3 justify-content-center">
                    {statsCards.map((item) => {
                      const imageSrc = resolveImageSrc(item.image);
                      const CardIcon =
                        !imageSrc && !item.useStars && item.icon
                          ? getIconComponent(item.icon)
                          : null;
                      return (
                        <div className="col-6 col-md-3" key={item._id}>
                          <div className="card bg-dark text-white border-secondary text-center stat-card-split">
                            <div className="stat-card-icon-area">
                              {imageSrc ? (
                                <img
                                  src={imageSrc}
                                  alt={
                                    item.title ||
                                    item.label ||
                                    item.value ||
                                    "Stat"
                                  }
                                  className="stat-card-image"
                                  loading="lazy"
                                  onError={(e) => {
                                    const raw = item.image;
                                    if (
                                      raw &&
                                      e.currentTarget.dataset.retried !== "1" &&
                                      raw !== e.currentTarget.src
                                    ) {
                                      e.currentTarget.dataset.retried = "1";
                                      e.currentTarget.src = raw.startsWith(
                                        "http"
                                      )
                                        ? raw
                                        : `${import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") || ""}${raw.startsWith("/") ? raw : `/${raw}`}`;
                                      return;
                                    }
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              ) : item.useStars ? (
                                <div className="text-warning">
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                </div>
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
                              {item.label ? <small>{item.label}</small> : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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
        videoUrl={founderVideoUrl || undefined}
        channelUrl={youtubeChannelUrl}
      />

      <Chatbot />

      <section className="trust-section py-5 text-white">
        <div className="container text-center">
          <h2>Trusted by Happy Customers</h2>

          <p className="text-light mb-5">
            Top Businesses & Brands trust BazazTech for their biggest projects
          </p>

          <div className="trust-marquee">
            <div className="trust-marquee-track">
              {marqueeLogos.map((item, index) => {
                const logoSrc = resolveImageSrc(item.image);
                if (!logoSrc) return null;
                return (
                  <div className="trust-card" key={`${item._id}-${index}`}>
                    <img
                      src={logoSrc}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        const raw = item.image;
                        if (
                          raw &&
                          e.currentTarget.dataset.retried !== "1" &&
                          raw !== e.currentTarget.src
                        ) {
                          e.currentTarget.dataset.retried = "1";
                          if (/^https?:\/\//i.test(raw)) {
                            e.currentTarget.src = raw;
                            return;
                          }
                          const apiBase = (
                            import.meta.env.VITE_API_URL || ""
                          ).replace(/\/api\/?$/, "");
                          e.currentTarget.src = `${apiBase}${raw.startsWith("/") ? raw : `/${raw}`}`;
                          return;
                        }
                        const card = e.currentTarget.closest(".trust-card");
                        if (card) card.style.display = "none";
                      }}
                    />
                  </div>
                );
              })}
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
            </div>
          </div>
        </div>
      </section>

      {/* ✅ WINNING DEEDS - Only show when loading is done AND cards exist */}
      {!footerLoading && footerCards.length > 0 && (
        <section className="winning-section">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <h2 className="winning-title">Our Winning Deeds</h2>

                <p className="winning-desc">
                  Our success is anchored by our skilled team, extensive
                  experience, in-depth technical understanding, focused goal
                  setting, and the positive impact we have on our diverse
                  customer base through their satisfaction.
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
      )}

      <Footer />
    </>
  );
};

export default Home;