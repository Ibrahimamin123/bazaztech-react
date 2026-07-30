import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { hasPermission } from "../constants/permissions";

// Wrap any admin route with this. Pass `permission` (a single permission
// key or an array of keys) when the route should only be reachable by
// roles that were granted that permission from the "Admins" screen.
const ProtectedRoute = ({ children, permission }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const { admin } = useAdmin();

  // While the admin profile hasn't loaded yet (first paint after a hard
  // refresh) we let the route render rather than bouncing the user —
  // AdminContext fetches /admin/profile on mount, so this is momentary.
  if (admin && Object.keys(admin).length > 0 && !hasPermission(admin, permission)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
