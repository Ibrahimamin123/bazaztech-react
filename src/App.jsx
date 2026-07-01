import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Casestudies from "./components/Casestudies";
import CorporateTraining from "./components/CorporateTraining";
import Contact from "./components/Contact";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import AdminServices from "./admin/pages/Services";
import HeroAdmin from "./admin/pages/HeroAdmin";
import AboutAdmin from "./admin/pages/AboutAdmin";
import TeamAdmin from "./admin/pages/TeamAdmin";
import PortfolioAdmin from "./admin/pages/PortfolioAdmin";
import TrainingAdmin from "./admin/pages/TrainingAdmin";
import TestimonialsAdmin from "./admin/pages/TestimonialsAdmin";
import FaqAdmin from "./admin/pages/FaqAdmin";
import SocialAdmin from "./admin/pages/SocialAdmin";
import SettingsAdmin from "./admin/pages/SettingsAdmin";
import MessagesAdmin from "./admin/pages/MessagesAdmin";
import AdminsAdmin from "./admin/pages/AdminsAdmin";
import ProtectedRoute from "./admin/components/ProtectedRoute";
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
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hero"
          element={
            <ProtectedRoute>
              <HeroAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <ProtectedRoute>
              <AboutAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/team"
          element={
            <ProtectedRoute>
              <TeamAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/portfolio"
          element={
            <ProtectedRoute>
              <PortfolioAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/training"
          element={
            <ProtectedRoute>
              <TrainingAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <TestimonialsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faqs"
          element={
            <ProtectedRoute>
              <FaqAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/social"
          element={
            <ProtectedRoute>
              <SocialAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <SettingsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <MessagesAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admins"
          element={
            <ProtectedRoute>
              <AdminsAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
