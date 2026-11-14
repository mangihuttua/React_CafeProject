
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getOrders,
  updateOrderStatus,
} from "../services/api";

export default function AdminOrders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders(token);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      setError("");
      setSuccess("");

      await updateOrderStatus(id, status, token);

      setSuccess("Status pesanan berhasil diperbarui!");

      await fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString("id-ID");
  };

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-amber-900">
          Order Management
        </h1>

        <p className="mt-1 text-gray-500">
          Kelola pesanan pelanggan Cafe Delight.
        </p>
      </div>

      {success && (
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 rounded-xl bg-white p-4 shadow">
        <p className="text-gray-500">Total Orders</p>

        <h2 className="text-3xl font-bold text-amber-900">
          {orders.length}
        </h2>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-left">
          <thead className="bg-amber-100 text-amber-900">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Order Type</th>
              <th className="p-4">Total Price</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4 font-semibold">
                  #{order.id}
                </td>

                <td className="p-4">
                  <div className="font-medium">
                    {order.customer_name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {order.phone}
                  </div>
                </td>

                <td className="p-4">
                  {order.order_type}
                  {order.order_type === "Dine In" &&
                    ` - Meja ${order.table_number}`}
                </td>

                <td className="p-4">
                  Rp {formatPrice(order.total_price)}
                </td>

                <td className="p-4 text-sm">
                  {new Date(order.created_at).toLocaleString("id-ID")}
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value
                      )
                    }
                    className="rounded-lg border p-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  Belum ada pesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
