import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/adminApi";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginAdmin(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container mt-5" style={{ maxWidth: "450px" }}>
        <div className="card shadow p-4">
          <h2 className="text-center mb-1">BazazTech Admin</h2>
          <p className="text-center text-muted mb-4">Sign in to manage your website</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
