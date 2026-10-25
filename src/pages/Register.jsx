
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Validasi sebelum request dikirim ke backend
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi.";
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password minimal 6 karakter.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Konfirmasi password wajib diisi.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Konfirmasi password tidak cocok.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);


  // Mengirim data ke Register API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser(
        formData.name.trim(),
        formData.email.trim(),
        formData.password
      );

      // Register API belum membuat JWT,
      // jadi pengguna diarahkan ke halaman Login.
      navigate("/login", {
        replace: true,
        state: {
          message:
            "Registrasi berhasil! Silakan login dengan akun kamu.",
        },
      });
    } catch (error) {
      setApiError(
        error.message ||
          "Registrasi gagal. Silakan coba kembali."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-orange-200 ${
      errors[field]
        ? "border-red-500"
        : "border-gray-300 focus:border-orange-700"
    }`;

  return (
    <section className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        {/* Logo dan judul */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-800"
          >
            <FaCoffee className="text-3xl" />
            <span className="text-2xl font-bold">
              Cafe Delight
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 mt-6">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join Cafe Delight and enjoy your favorites
          </p>
        </div>

        {/* Error dari backend */}
        {apiError && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.name)}
              className={inputClass("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

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
              className={inputClass("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password"
                   className="block text-sm font-medium text-gray-700 mb-2" >
              Password
            </label>

            <div className="relative">
              <input id="password" name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.password)}
                    className={`${inputClass("password")} pr-12`} />

              <button type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-700 cursor-pointer">

                {showPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword"
                   className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input id="confirmPassword" name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.confirmPassword)}
                    className={`${inputClass("confirmPassword")} pr-12`} />

              <button type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      disabled={isSubmitting}
                      aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                      aria-pressed={showConfirm}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-700 cursor-pointer" >

                {showConfirm ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-orange-800 px-6 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-800 hover:text-orange-600"
          >
            Login
          </Link>
        </p>

        <div className="text-center mt-5">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-orange-800"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
