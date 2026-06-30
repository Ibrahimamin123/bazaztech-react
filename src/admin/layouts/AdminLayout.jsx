import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">

      <Sidebar />

      <div className="main-content">

        <Header />

        {children}

      </div>

    </div>
  );
};

export default AdminLayout;