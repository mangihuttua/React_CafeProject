import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { user, token, isAuthenticated } = useAuth();
  const location = useLocation();

  // Belum login: arahkan ke Login
  if (!isAuthenticated || !token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Role tidak sesuai: arahkan ke halaman berdasarkan role
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // Jika role diizinkan, tampilkan route anak
  return <Outlet />;
}

export default ProtectedRoute;
