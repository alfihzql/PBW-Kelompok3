// js/utils/domHelpers.js

// Fungsi untuk memperbarui tabel HTML
// Menambahkan parameter 'isLoading' untuk menampilkan pesan loading
function updateTable(tbodyId, data, mapFunction, colspan, message, isLoading = false) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) {
    console.error(`Error: tbody with ID "${tbodyId}" not found.`);
    return;
  }

  tbody.innerHTML = ""; // Kosongkan isi tabel sebelumnya

  if (isLoading) {
    // Tampilkan pesan loading
    const loadingRow = `
          <tr>
              <td colspan="${colspan}" class="px-5 py-3 text-sm text-center text-gray-500">
                  <i class="fas fa-spinner fa-spin mr-2"></i> ${message}
              </td>
          </tr>
      `;
    tbody.insertAdjacentHTML("beforeend", loadingRow);
    return; // Hentikan eksekusi lebih lanjut jika sedang loading
  }

  // Jika tidak loading, cek apakah ada data
  if (data.length === 0) {
    const emptyRow = `
          <tr>
              <td colspan="${colspan}" class="px-5 py-3 text-sm text-center text-gray-500">
                  ${message}
              </td>
          </tr>
      `;
    tbody.insertAdjacentHTML("beforeend", emptyRow);
  } else {
    // Tampilkan data sebenarnya
    data.forEach((item) => {
      const rowHtml = mapFunction(item);
      tbody.insertAdjacentHTML("beforeend", rowHtml);
    });
  }
}
