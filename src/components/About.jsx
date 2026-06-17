import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";

const About = () => {
    return (
        <>
            <Navbar />
            <section className="about-section">
                <div className="about-heading text-center">
                    <h2>About Us</h2>
                </div>
                <div className="container">

                    <div className="row align-items-center gy-5">

                        {/* LEFT SIDE CARDS */}
                        <div className="col-lg-6">

                            <div className="about-card">
                                <h5>Customized Solutions</h5>
                                <p>
                                    We tailor our services to meet the unique needs of each client,
                                    ensuring that our solutions align perfectly with their business objectives.
                                </p>
                            </div>

                            <div className="about-card">
                                <h5>Experienced Team</h5>
                                <p>
                                    Our team consists of industry experts with years of experience in software development,
                                    ensuring high-quality results every time.
                                </p>
                            </div>

                            <div className="about-card">
                                <h5>Client-Centric Approach</h5>
                                <p>
                                    We prioritize our clients’ success and work closely with them to understand their challenges
                                    and deliver solutions that exceed expectations.
                                </p>
                            </div>

                            <div className="about-card">
                                <h5>Innovative Technology</h5>
                                <p>
                                    We stay updated with the latest trends and technologies, allowing us to offer innovative
                                    and future-proof solutions that drive business growth.
                                </p>
                            </div>

                        </div>

                        {/* RIGHT SIDE TEXT */}
                        <div className="col-lg-6">

                            <div className="about-text">

                                <h2>Transforming Ideas Into Innovative Solutions</h2>

                                <p>
                                    At Bazaz Tech, we are passionate about turning ideas into innovative digital solutions.
                                    With a team of skilled developers, designers, and strategists, we focus on delivering
                                    custom software, mobile applications, and web solutions that cater to your specific
                                    business needs. Our commitment to excellence and client satisfaction drives us to
                                    constantly evolve and adapt to the latest technologies, ensuring that our clients stay
                                    ahead in the competitive market.
                                </p>

                                <p>
                                    Founded on the principles of creativity, collaboration, and quality, Bazaz Tech has
                                    quickly grown into a trusted partner for businesses seeking digital transformation.
                                    We believe in building long-term relationships with our clients by providing reliable,
                                    efficient, and cost-effective solutions that empower them to achieve their goals.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
            {/* SECTION HEADING */}
            <div className="text-center mv-heading">
                <h2>Who We Are & What We Do</h2>
                <p>
                    We are committed to delivering innovative digital solutions that drive success for our clients.
                </p>
            </div>

            {/* MISSION & VISION SECTION */}
            <section className="mv-section">

                <div className="container">

                    <div className="row g-4 align-items-stretch mt-5">

                        {/* MISSION */}
                        <div className="col-lg-6">
                            <div className="mv-card mission">

                                <h3>Our Mission</h3>

                                <p>
                                    Our mission is to empower businesses with innovative digital solutions
                                    that enhance growth, efficiency, and customer engagement.
                                    We aim to deliver high-quality web and software services that help
                                    our clients succeed in the digital world.
                                </p>

                            </div>
                        </div>

                        {/* VISION */}
                        <div className="col-lg-6">
                            <div className="mv-card vision">

                                <h3>Our Vision</h3>

                                <p>
                                    Our vision is to become a globally recognized digital agency known for
                                    creativity, innovation, and excellence. We strive to lead the future of
                                    technology by building impactful and scalable solutions for businesses worldwide.
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