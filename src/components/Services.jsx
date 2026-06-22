import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

import "../App.css";

import webDev from "../images/service1.webp";
import ecommerce from "../images/service2.webp";
import seo from "../images/service3.webp";
import graphic from "../images/service4.webp";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Website Development",
      image: webDev,
      description:
        "We create modern, responsive, and high-performing websites that help businesses grow online.",
      features: [
        "Custom Design",
        "Responsive UI",
        "SEO Optimized",
        "Fast Performance",
      ],
    },
    {
      id: 2,
      title: "E-Commerce Solutions",
      image: ecommerce,
      description:
        "Powerful online stores with secure payments and smooth UX.",
      features: [
        "Shop Setup",
        "Payment Integration",
        "Product Management",
        "Mobile Friendly",
      ],
    },
    {
      id: 3,
      title: "SEO Optimization",
      image: seo,
      description:
        "Boost ranking and get organic traffic from search engines.",
      features: [
        "Keyword Research",
        "On-page SEO",
        "Technical SEO",
        "Analytics",
      ],
    },
    {
      id: 4,
      title: "Graphic Designing",
      image: graphic,
      description:
        "Creative designs that build strong brand identity.",
      features: [
        "Logo Design",
        "Brand Identity",
        "Social Media Posts",
        "Marketing Assets",
      ],
    },
  ];

  return (
    <div style={{ background: "#000", color: "#7138f4" }}>

      <Navbar />

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-5"
      >
        <h1 className="display-4 mt-5 fw-bold">
          Our Services
        </h1>
        <p>
          Scalable digital solutions for modern businesses
        </p>
      </motion.section>

      {/* SERVICES */}
      <section className="container py-5">

        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={`row align-items-center mb-5 ${
              index % 2 ? "flex-lg-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >

            {/* IMAGE */}
            <div className="col-lg-6">
              <motion.img
                src={service.image}
                className="img-fluid rounded-4 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* CONTENT */}
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">{service.title}</h2>

              <p className="text-light opacity-75">
                {service.description}
              </p>

              <ul className="mt-3">
                {service.features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="mb-2"
                  >
                    ✓ {f}
                  </motion.li>
                ))}
              </ul>

              <button className="btn btn-primary mt-3 px-4 py-2">
                Get Quote
              </button>
            </div>

          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <motion.section
        className="text-center py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Grow Your Business?</h2>
        <p className="text-muted">
          Let’s build something amazing together
        </p>

        <button className="btn btn-outline-light px-4 py-2">
          Contact Us
        </button>
      </motion.section>

    </div>
  );
};

export default Services;