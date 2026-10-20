import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <section className="min-h-screen bg-amber-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-orange-800 font-semibold">
              CAFE DELIGHT
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Selamat datang, {user?.name}!
            </p>
          </div>

          <button
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="rounded-lg bg-orange-800 px-5 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800">
              Menu Management
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Kelola menu Cafe Delight.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800">
              Order Management
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Lihat dan kelola pesanan pelanggan.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800">
              User Management
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Fitur pengelolaan pengguna dapat ditambahkan nanti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
