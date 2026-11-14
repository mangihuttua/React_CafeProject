const API_URL = "http://localhost:5000/api";

// Helper untuk membaca respons API dengan aman
const readResponse = async (response) => {
  const text = await response.text();

  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Permintaan gagal (${response.status})`
    );
  }

  return data;
};

// GET MENU
export const getMenus = async () => {
  const response = await fetch(`${API_URL}/menu`);
  const result = await readResponse(response);

  return result.data;
};

// CREATE MENU — mendukung FormData
export const createMenu = async (menuData, token) => {
  const response = await fetch(`${API_URL}/menu`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: menuData,
  });

  return await readResponse(response);
};

// UPDATE MENU — mendukung FormData
export const updateMenu = async (id, menuData, token) => {
  const response = await fetch(`${API_URL}/menu/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: menuData,
  });

  return await readResponse(response);
};

// DELETE MENU
export const deleteMenu = async (id, token) => {
  const response = await fetch(`${API_URL}/menu/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204) {
    return true;
  }

  return await readResponse(response);
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

  return await readResponse(response);
};


// GET ALL ORDERS
export const getOrders = async (token) => {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil pesanan");
  }

  return result.data;
};

// GET ORDER DETAIL
export const getOrderById = async (id, token) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil detail pesanan");
  }

  return result.data;
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (id, status, token) => {
  const response = await fetch(`${API_URL}/orders/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengubah status pesanan");
  }

  return result;
};

