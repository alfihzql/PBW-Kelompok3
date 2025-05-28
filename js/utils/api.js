// js/utils/api.js

const API_BASE_URL = "https://backend-hotel-blush.vercel.app";

async function fetchData(endpoint, method = "GET", data = null) {
  // Gabungkan BASE_URL dengan endpoint yang relatif
  const url = `${API_BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Anda mungkin juga perlu menambahkan 'Authorization' jika nanti ada token
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

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
