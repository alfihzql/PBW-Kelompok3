// js/modal.js

// Fungsi umum untuk membuka modal berdasarkan ID-nya
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden"); // Asumsi menggunakan TailwindCSS 'hidden' class
    modal.classList.add("flex"); // Atau 'block', tergantung bagaimana Anda ingin modal muncul
  } else {
    console.error(`Modal with ID "${modalId}" not found.`);
  }
}

// Fungsi umum untuk menutup modal berdasarkan ID-nya
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex"); // Hapus display yang ditambahkan
  } else {
    console.error(`Modal with ID "${modalId}" not found.`);
  }
}

// Tidak perlu handleCheckInput, modalCondition, atau logika penambahan hotel di sini.
// Mereka adalah logika bisnis yang harus ada di file halaman (hotels.js).
