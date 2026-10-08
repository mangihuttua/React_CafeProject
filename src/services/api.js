const API_URL = "http://localhost:5000/api";

// GET MENU
export const getMenus = async () => {
  const response = await fetch(`${API_URL}/menu`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data menu");
  }

  const result = await response.json();

  return result.data;
};

// CREATE ORDER
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal membuat pesanan"
    );
  }

  return result;
};