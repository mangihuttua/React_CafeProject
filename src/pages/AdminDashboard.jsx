import {FaCoffee, FaClipboardList, FaMoneyBillWave, FaUsers } from "react-icons/fa";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Menu",
      value: "—",
      description: "Jumlah menu di database",
      icon: FaCoffee,
    },
    {
      title: "Total Orders",
      value: "—",
      description: "Jumlah pesanan tersimpan",
      icon: FaClipboardList,
    },
    {
      title: "Total Revenue",
      value: "—",
      description: "Total nilai pesanan",
      icon: FaMoneyBillWave,
    },
    {
      title: "Total Users",
      value: "—",
      description: "Jumlah akun terdaftar",
      icon: FaUsers,
    },
  ];

  return (
    <div>
      {/* Welcome */}
      <section className="mb-8 rounded-2xl bg-gradient-to-r from-amber-950 to-orange-800 p-6 text-white sm:p-8">
        <p className="text-sm font-medium text-amber-200">
          CAFE DELIGHT ADMINISTRATION
        </p>

        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          Welcome to Admin Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-amber-100 sm:text-base">
          Kelola menu, pantau pesanan pelanggan, dan
          periksa aktivitas Cafe Delight dari satu tempat.
        </p>
      </section>

      {/* Summary cards */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          Overview
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <div className="rounded-lg bg-amber-100 p-3 text-orange-800">
                    <Icon className="text-xl" />
                  </div>
                </div>

                <p className="mt-5 text-3xl font-bold text-gray-800">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Next steps */}
      <section className="mt-8 rounded-xl border border-amber-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">
          Getting Started
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Dashboard ini sudah menyiapkan tempat untuk ringkasan
          data. Selanjutnya, kita akan menghubungkan kartu
          Overview dengan API dan membuat fitur pengelolaan
          menu serta pesanan.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-amber-50 p-4">
            <FaCoffee className="text-xl text-orange-800" />
            <h3 className="mt-3 font-semibold text-gray-800">
              Menu Management
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Tambah, edit, dan hapus menu.
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4">
            <FaClipboardList className="text-xl text-orange-800" />
            <h3 className="mt-3 font-semibold text-gray-800">
              Order Management
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Periksa pesanan yang dibuat pelanggan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
