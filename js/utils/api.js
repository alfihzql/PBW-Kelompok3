// js/utils/api.js

const API_BASE_URL = "https://backend-hotel-blush.vercel.app";

async function fetchData(endpoint, method = "GET", data = null) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! Status: ${response.status}`);
    }
    return result;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}
// Tidak perlu export atau window.fetchData = fetchData; jika semua script dimuat langsung.
// Tapi untuk modularitas, biasanya pakai export dan type="module" di script HTML.
// Jika tidak pakai type="module", maka fungsi ini akan otomatis global.
