import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaCoffee,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: FaChartPie,
      end: true,
    },
    {
      label: "Menu Management",
      path: "/admin/menu",
      icon: FaCoffee,
    },
    {
      label: "Order Management",
      path: "/admin/orders",
      icon: FaClipboardList,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-orange-800 text-white"
        : "text-amber-100 hover:bg-amber-900 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-amber-50 md:flex">
      {/* Sidebar */}
      <aside className="flex w-full flex-col bg-amber-950 text-white md:min-h-screen md:w-64 md:shrink-0">
        <div className="border-b border-amber-800 p-6">
          <NavLink to="/admin" className="flex items-center gap-3">
            <FaCoffee className="text-3xl text-amber-300" />

            <div>
              <h1 className="text-xl font-bold">Cafe Delight</h1>
              <p className="mt-1 text-xs text-amber-300">
                Admin Panel
              </p>
            </div>
          </NavLink>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-amber-400">
            Main Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={linkClass}
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-amber-800 p-4">
          <div className="mb-4 rounded-lg bg-amber-900 p-3">
            <p className="truncate font-semibold">
              {user?.name || "Administrator"}
            </p>
            <p className="mt-1 text-xs text-amber-300">
              {user?.email}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-amber-200">
              {user?.role || "admin"}
            </p>
          </div>

          <NavLink
            to="/"
            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-amber-100 hover:bg-amber-900"
          >
            <FaStore />
            View Website
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-amber-100 transition hover:bg-red-900 hover:text-white"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 bg-white px-6 py-5 shadow-sm">
          <div>
            <p className="text-sm text-gray-500">
              Cafe Delight / Admin
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-800">
              Administration Panel
            </h2>
          </div>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-orange-900">
            Administrator
          </span>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
