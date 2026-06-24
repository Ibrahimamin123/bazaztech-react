import Navbar from "../components/Navbar";
import "../App.css";
import { FaStar } from "react-icons/fa";
import heroImg from "../images/hero.png";
import card1 from "../images/card1.png";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";
import card4 from "../images/card4.png";
import card5 from "../images/card5.png";
import card6 from "../images/card6.png";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";



const Home = () => {

  const trustData = [
    {

      img: card1
    },
    {

      img: card2
    },
    {

      img: card3
    },
    {

      img: card4
    },
    {

      img: card5
    },
    {

      img: card6
    }
  ];
  return (
    <>
      <Navbar />
      <section
        className="hero text-white d-flex align-items-center position-relative"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh"
        }}
      >
        <div className="container text-center">

          {/* CENTER CONTENT */}
          <div className="row justify-content-center align-items-center flex-column-reverse flex-lg-row">
            <div className="col-lg-10">
              <h1 className="hero-title">
                <span className="whi">Build<span className="dot">.</span></span>{" "}
                <span className="whi">Launch<span className="dot">.</span></span>{" "}
                <span className="whi">Scale<span className="dot">.</span></span>{" "}
                <span className="whi">Grow<span className="dot">.</span></span>

                <span className="sub-text">
                  Your Digital Presence
                </span>
              </h1>

              <p className="mt-3 text-light">
                At BazazTech, we build digital foundations for growth.
                High converting websites, marketing & design systems.
              </p>

              {/* CARDS */}
              <div className="row g-3 mt-5 justify-content-center">

                <div className="col-6 col-md-3">
                  <div className="card bg-dark text-white border-secondary p-3 h-100 text-center">
                    <div className="text-warning">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                    <h4 className="mt-2">1200+</h4>
                    <small>Happy Clients</small>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="card bg-dark text-white border-secondary p-3 h-100 text-center">
                    <h5>Trustpilot</h5>
                    <h4>4.9</h4>
                    <small>Rating</small>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="card bg-dark text-white border-secondary p-3 h-100 text-center">
                    <h5>Capterra</h5>
                    <h4>4.8</h4>
                    <small>Reviews</small>
                  </div>
                </div>

                <div className="col-6 col-md-3">
                  <div className="card bg-dark text-white border-secondary p-3 h-100 text-center">
                    <h5>Projects</h5>
                    <h4>500+</h4>
                    <small>Delivered</small>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>
      <Chatbot />

      <section className="trust-section py-5 text-white">

        <div className="container text-center">

          <h2 className="fw-bold">
            Trusted by Happy Customers
          </h2>

          <p className="text-light mb-5">
            Top Businesses & Brands trust BazazTech for their biggest projects
          </p>

          <div className="row g-4">

            {trustData.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="trust-card">
                  <img src={item.img} alt={item.title} />
                  {/* <h5>{item.title}</h5>
      <p>{item.desc}</p> */}
                </div>
              </div>
            ))}

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
                Are you ready to find out how <strong>BazazTech</strong> can help
                build your business online? If so, make contact with us today...
              </p>

              <button className="btn project-btn">
                Get A Quote
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="winning-section">
        <div className="container">

          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="winning-title">
                Have A Look On Our Winning Deeds
              </h2>

              <p className="winning-desc">
                Our success is anchored by our skilled team, extensive experience,
                in-depth technical understanding, focused goal setting, and the
                positive impact we have on our diverse customer base through their satisfaction.
              </p>
            </div>
          </div>

          <div className="row g-4 mt-4 justify-content-center">

            <div className="col-6 col-md-4 col-lg-2">
              <div className="stat-box">
                <h3>10+</h3>
                <span>Industries Served</span>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="stat-box">
                <h3>100+</h3>
                <span>Projects Delivered</span>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="stat-box">
                <h3>100%</h3>
                <span>Client Satisfaction</span>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="stat-box">
                <h3>50+</h3>
                <span>Professional Team</span>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="stat-box ">
                <h3>10 Years</h3>
                <span>Market Experience</span>
              </div>
            </div>

          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;