import Navbar from "../components/Navbar";
import "../App.css";

const Home = () => {
    return (
        <>
            <Navbar />

            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Our Website</h1>
                    <p>
                        At BazazTech, we build digital foundations for growth.
                        From high-converting custom websites to performance-driven marketing and designing solutions, we create systems that help businesses attract, engage, and convert their audience online. Every project is tailored to your goals, ensuring your brand doesn’t just exist digitally, it stands out and performs.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Home;