// js/loadComponents.js

async function loadComponent(elementId, componentPath, callback = null) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;

    // Panggil callback jika ada, ini berguna untuk inisialisasi setelah komponen dimuat
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(`Gagal memuat komponen ${componentPath}:`, error);
  }
}

// Fungsi untuk menandai nav-item yang aktif
function highlightActiveNavItem() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    // Hapus kelas 'active' dari semua item
    item.classList.remove("active", "bg-gray-700", "text-white");
    item.classList.add("text-gray-300"); // Kembalikan warna default

    // Dapatkan href dan bandingkan dengan path saat ini
    const href = item.getAttribute("href");
    if (href && currentPath.includes(href)) {
      item.classList.add("active", "bg-gray-700", "text-white");
      item.classList.remove("text-gray-300");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Memuat sidebar. Setelah sidebar dimuat, jalankan highlightActiveNavItem.
  loadComponent("navbar-placeholder", "components/navbar.html", highlightActiveNavItem);

  // Anda juga bisa memuat header jika itu komponen terpisah
  // loadComponent('header-placeholder', 'components/header.html');
});
