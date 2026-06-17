import Navbar from "../components/Navbar";
import "../App.css";
import { FaStar } from "react-icons/fa";
import heroImg from "../images/hero.png";
import card1 from "../images/card1.png";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";
import card4 from "../images/card4.png";
import card4 from "../images/card5.png";
import card4 from "../images/card6.png";

const Home = () => {

 const trustData = [
  {
    title: "Tech Company",
    desc: "High performance website solution",
    img: card1
  },
  {
    title: "Marketing Agency",
    desc: "Boosted conversions by 200%",
    img: card2
  },
  {
    title: "E-Commerce Brand",
    desc: "Scalable online store system",
    img: card3
  },
  {
    title: "Startup SaaS",
    desc: "Full product development system",
    img: card4
  },
  {
    title: "Digital Agency",
    desc: "Creative branding & UI/UX solutions",
    img: card5
  },
  {
    title: "Global Enterprise",
    desc: "Enterprise level scalable systems",
    img: card6
  }
];
  return (
    
    <>
    
      <Navbar />
      

      

    <section
  className="hero text-white d-flex align-items-center"
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
          <div className="row justify-content-center">
            <div className="col-lg-10">

              <h1 className="display-4 fw-bold">
                Welcome to Our Website
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
      <h5>{item.title}</h5>
      <p>{item.desc}</p>
    </div>
  </div>
))}

          </div>

        </div>

      </section>
  
      
    </>
  );
};

export default Home;