import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";
import trainingImg from "../images/training.jpg";

const CorporateTraining = () => {
    return (
        <>
            <Navbar />

            {/* HERO SECTION */}
            <section className="corporate-hero">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-lg-6">
                            <h1 className="corp-title">
                                Corporate Training Programs
                            </h1>

                            <p className="corp-text">
                                Empower your workforce with industry-focused training
                                programs designed to improve productivity, innovation,
                                and business growth.
                            </p>

                            <button className="btn corp-btn">
                                Get Free Consultation
                            </button>
                        </div>

                        <div className="col-lg-6 text-center">
                            <img
                                src={trainingImg}
                                alt="training"
                                className="img-fluid corp-img"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="why-section">
                <div className="container">

                    <div className="text-center mb-5">
                        <h2>Why Choose Us</h2>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-6 col-lg-3">
                            <div className="why-card">
                                <h4>Industry Experts</h4>
                                <p>Learn from experienced professionals.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="why-card">
                                <h4>Hands-On Learning</h4>
                                <p>Practical projects and real scenarios.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="why-card">
                                <h4>Certification</h4>
                                <p>Recognized completion certificates.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="why-card">
                                <h4>Custom Programs</h4>
                                <p>Training tailored to company needs.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* TRAINING PROGRAMS */}
            <section className="program-section">
                <div className="container">

                    <div className="text-center mb-5">
                        <h2>Training Programs</h2>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-6 col-lg-4">
                            <div className="program-card">
                                <h4>Web Development</h4>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="program-card">
                                <h4>AI Automation</h4>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="program-card">
                                <h4>Digital Marketing</h4>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="program-card">
                                <h4>Graphic Design</h4>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="program-card">
                                <h4>Cyber Security</h4>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="program-card">
                                <h4>Data Analytics</h4>
                            </div>
                        </div>

                    </div>

                </div>
            </section>


            {/* CTA */}
            <section className="cta-section">
                <div className="container text-center">

                    <h2>Ready To Upskill Your Team?</h2>

                    <p>
                        Contact us today and discover how our corporate
                        training programs can transform your workforce.
                    </p>

                    <button className="btn cta-btn">
                        Schedule Meeting
                    </button>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default CorporateTraining;