import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";

const AdminLayout = ({ children, title = "Dashboard" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div
      className={`admin-container ${sidebarCollapsed ? "sidebar-collapsed" : ""} ${
        sidebarOpen ? "sidebar-mobile-open" : ""
      }`}
    >
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={sidebarOpen}
        onNavigate={closeSidebar}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
      />

      <div className="main-content">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen((v) => !v)}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        />
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLayout;
