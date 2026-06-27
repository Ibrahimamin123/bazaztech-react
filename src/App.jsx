import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Casestudies from "./components/Casestudies";
import CorporateTraining from "./components/CorporateTraining";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/casestudies" element={<Casestudies />} />
        <Route path="/corporatetraining" element={<CorporateTraining />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
