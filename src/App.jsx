import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Casestudies from "./components/Casestudies";
import CorporateTraining from "./components/CorporateTraining";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import AdminServices from "./admin/pages/Services";
import PortfolioAdmin from "./admin/pages/PortfolioAdmin";
import TrainingAdmin from "./admin/pages/TrainingAdmin";
import SettingsAdmin from "./admin/pages/SettingsAdmin";
import AboutAdmin from "./admin/pages/AboutAdmin";
import StatsCardsAdmin from "./admin/pages/StatsCardsAdmin";
import FooterCardsAdmin from "./admin/pages/FooterCardsAdmin";
import TrustedLogosAdmin from "./admin/pages/TrustedLogosAdmin";
import MessagesAdmin from "./admin/pages/MessagesAdmin";
import AdminsAdmin from "./admin/pages/AdminsAdmin";
import ProfileAdmin from "./admin/pages/ProfileAdmin";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import { AdminProvider } from "./admin/context/AdminContext";
import { MODULE_PERMISSIONS, CRUD_PERMISSIONS } from "./admin/constants/permissions";
import "./App.css";

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <ScrollToTop />
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
              <ProtectedRoute permission={[MODULE_PERMISSIONS.services, CRUD_PERMISSIONS.view]}>
                <AdminServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/portfolio"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.portfolio, CRUD_PERMISSIONS.view]}>
                <PortfolioAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/training"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.training, CRUD_PERMISSIONS.view]}>
                <TrainingAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view]}>
                <SettingsAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/about"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view]}>
                <AboutAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stats-cards"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view]}>
                <StatsCardsAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/footer-cards"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view]}>
                <FooterCardsAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/trusted-logos"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.settings, CRUD_PERMISSIONS.view]}>
                <TrustedLogosAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.messages, CRUD_PERMISSIONS.view]}>
                <MessagesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/admins"
            element={
              <ProtectedRoute permission={[MODULE_PERMISSIONS.admins, CRUD_PERMISSIONS.view]}>
                <AdminsAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <ProfileAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
