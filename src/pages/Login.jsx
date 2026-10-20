
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

import Button from "../components/Button/Button";
import { loginUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setApiError("");
  };

  // Validasi form sebelum mengirim ke backend
  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();

    if (!email) {
      newErrors.email = "Email wajib diisi.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Mengirim data ke Login API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await loginUser(
        formData.email.trim(),
        formData.password
      );

      // Simpan token dan data user melalui AuthContext
      login(result);

      // Semua role ke halaman Home.
      navigate("/");
    } catch (error) {
      setApiError(
        error.message ||
          "Login gagal. Silakan coba kembali."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        {/* Logo dan judul */}
        <div className="text-center mb-8">
          <Link to="/"
            className="inline-flex items-center gap-2 text-orange-800"
          >
            <FaCoffee className="text-3xl" />
            <span className="text-2xl font-bold">
              Cafe Delight
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 mt-6">
            Welcome Back!
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your Cafe Delight account
          </p>
        </div>

        {/* Pesan error dari API */}
        {apiError && (
          <div
            role="alert"
            className="mb-5 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700"
          >
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-orange-200 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-700"
              }`}
            />

            {errors.email && (
              <p
                id="email-error"
                className="text-red-600 text-sm mt-1"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password"
                   className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input type={showPassword ? "text" : "password"}
                    id="password" name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                className={`w-full rounded-lg border px-4 py-3 pr-12 outline-none transition focus:ring-2 focus:ring-orange-200 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-700"
                }`}
              />

              {/* Tombol lihat/sembunyikan password */}
              <button type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isSubmitting}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Lihat password"
                }
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-orange-800 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

              {errors.password && (
                <p className="text-red-600 text-sm mt-1"
                   id="password-error"
                >
                  {errors.password}
                </p>
              )}
            </div>

          {/* Tombol login */}
          <Button type="submit"
                  variant="primary"
                  disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-800 hover:text-orange-600"
          >
            Register
          </Link>
        </p>

        <div className="text-center mt-5">
          <Link to="/"
                className="text-sm text-gray-500 hover:text-orange-800"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
