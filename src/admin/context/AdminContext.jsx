import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/adminApi";

const AdminContext = createContext(null);

const readStoredAdmin = () => {
  try {
    return JSON.parse(localStorage.getItem("admin") || "{}");
  } catch {
    return {};
  }
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(readStoredAdmin);

  const syncAdmin = useCallback((nextAdmin) => {
    setAdmin(nextAdmin);
    localStorage.setItem("admin", JSON.stringify(nextAdmin));
  }, []);

  const refreshAdmin = useCallback(async () => {
    try {
      const res = await getProfile();
      syncAdmin(res.data.admin);
      return res.data.admin;
    } catch {
      return admin;
    }
  }, [admin, syncAdmin]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      refreshAdmin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminContext.Provider value={{ admin, syncAdmin, refreshAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return ctx;
};

export default AdminContext;
