import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";
import { useState } from "react";
const aboutData = [
  {
    title: "Our Mission",
    text: "Our mission is to empower businesses with innovative digital solutions that enhance growth, efficiency, and customer engagement."
  },
  {
    title: "Our Vision",
    text: "Our vision is to become a globally recognized digital agency known for creativity, innovation, and excellence."
  },
  {
    title: " About Our Founder",
    text: "Our founder established Bazaz Tech with a vision to help businesses embrace digital transformation through innovative technology and exceptional service."
  },
  {
    title: " About Our CEO",
    text: "Our CEO leads the company with strategic direction, ensuring excellence, innovation, and customer satisfaction in every project."
  }
];



const About = () => {
     const [activeCard, setActiveCard] = useState(0);
    return (
        <>
            <Navbar />
          <section className="about-section">

  <div className="container">

    {/* Heading */}
    <div className="about-main-heading text-center">
      <h2>About Us</h2>
      <p>
        Learn more about our company, vision, mission and the values that drive us.
      </p>
    </div>

    <div className="row align-items-center">

      {/* LEFT SIDE */}
      <div className="col-lg-3">

        <div className="about-tabs">

          {aboutData.map((item, index) => (
            <div
              key={index}
              className={`about-tab ${
                activeCard === index ? "active-tab" : ""
              }`}
              onClick={() => setActiveCard(index)}
            >
              {item.title}
            </div>
          ))}

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="col-lg-9 ">

        <div className="about-content-box">

          <h3>{aboutData[activeCard].title}</h3>

          <p key={activeCard}>
            {aboutData[activeCard].text}
          </p>

        </div>

      </div>

    </div>

  </div>

</section>
            
            <Footer />
        </>
    );
};

export default About;