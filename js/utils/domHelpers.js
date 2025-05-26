// js/utils/domHelpers.js

// Fungsi untuk memperbarui tabel generik
function updateTable(tbodyId, data, mapFunction, colSpan = 6, noDataMessage = "Tidak ada data.") {
  const tbody = document.getElementById(tbodyId);
  if (tbody) {
    if (!data || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${colSpan}" class="text-center py-4 text-gray-500">${noDataMessage}</td></tr>`;
      return;
    }
    tbody.innerHTML = data.map(mapFunction).join("");
  }
}

// Fungsi untuk membuat elemen badge status (misal: di tabel)
function createStatusBadge(statusText, statusClass) {
  return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">${statusText}</span>`;
}

// Fungsi untuk refresh halaman (setelah CRUD sukses)
function refreshPage() {
  window.location.href = window.location.href;
}

// Fungsi untuk mendapatkan ID dari URL (untuk halaman seperti rooms.html)
function getUrlParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}
