import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Logo from "../../components/Logo";
import { loginAdmin } from "../services/adminApi";
import { useAdmin } from "../context/AdminContext";
import {
  collectErrors,
  hasErrors,
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/validation";
import "../styles/admin.css";

const Login = () => {
  const navigate = useNavigate();
  const { syncAdmin } = useAdmin();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = collectErrors([
      { field: "email", message: validateEmail(form.email) },
      { field: "password", message: validatePassword(form.password) },
    ]);
    setErrors(nextErrors);
    return !hasErrors(nextErrors);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await loginAdmin(form);
      localStorage.setItem("token", res.data.token);
      syncAdmin(res.data.admin);
      navigate("/admin/dashboard");
    } catch (err) {
      Swal.fire("Login Failed", err.response?.data?.message || "Invalid credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="container login-container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="card shadow login-card">
          <div className="text-center mb-4">
            <Logo showText className="justify-content-center" />
          </div>
          <h2 className="text-center mb-1">Admin Login</h2>
          <p className="text-center text-muted mb-4">Sign in to manage your website</p>

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback d-block">{errors.password}</div>
              )}
            </div>

            <motion.button
              className="btn btn-primary w-100"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Logging In..." : "Login"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
