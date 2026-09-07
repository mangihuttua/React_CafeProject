const API_URL = "http://localhost:5000/api";

export async function getMenus() {
  const response = await fetch(`${API_URL}/menu`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data menu");
  }

  const result = await response.json();

  return result.data;
}