import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import "./App.css";

function App() {
  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
          <Route path="/casestudies" element={<CaseStudies />} />
          {/* <Route path="/webdevelopment" element={<WebDevelopment />} />
<Route path="/aiautomation" element={<AiAutomation />} />
<Route path="/digitalmarketing" element={<DigitalMarketing />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;