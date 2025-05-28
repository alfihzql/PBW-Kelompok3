// js/utils/api.js

const API_BASE_URL = "https://backend-hotel-blush.vercel.app"; // Pastikan ini URL Vercel backend Anda

async function fetchData(endpoint, method = "GET", data = null) {
  const url = `${API_BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // --- START PERUBAHAN KRUSIAL ---
  // Dapatkan token dari localStorage
  const token = window.localStorage.getItem("token");
  if (token) {
    // Tambahkan header Authorization jika token ada
    options.headers["Authorization"] = `Bearer ${token}`;
  }
  // --- END PERUBAHAN KRUSIAL ---

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    // Menangani respons 401 Unauthorized atau 403 Forbidden
    if (response.status === 401 || response.status === 403) {
      console.error("Authentication error: Token might be invalid or missing.");
      // Opsional: Redirect ke halaman login atau tampilkan pesan login
      // window.location.href = "/login.html"; // Sesuaikan dengan halaman login Anda
      const errorData = await response.json();
      throw new Error(errorData.message || `Authentication failed with status: ${response.status}`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}
