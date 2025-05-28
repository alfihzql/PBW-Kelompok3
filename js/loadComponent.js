// js/loadComponent.js

document.addEventListener("DOMContentLoaded", async () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  if (navbarPlaceholder) {
    let navbarPath = "";

    // Opsi 1: Tentukan berdasarkan URL halaman
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage.includes("dashboard_user.html") || currentPage.includes("reservations_user.html") || currentPage.includes("payments_user.html") || currentPage.includes("profile.html") || currentPage.includes("logout_user.html")) {
      navbarPath = "../partials/navbar_user.html";
    } else if (
      currentPage.includes("dashboard.html") ||
      currentPage.includes("hotels.html") ||
      currentPage.includes("users.html") ||
      currentPage.includes("reservations.html") ||
      currentPage.includes("payments.html") ||
      currentPage.includes("notifications_log.html") ||
      currentPage.includes("settings.html") ||
      currentPage.includes("reviews.html") ||
      currentPage.includes("logout.html")
    ) {
      navbarPath = "../partials/navbar.html";
    }

    // Opsi 2: Tentukan berdasarkan role dari localStorage (menimpa Opsi 1 jika ada data user)
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      if (userData.role === true) {
        // Admin
        navbarPath = "../partials/navbar.html";
      } else if (userData.role === false) {
        // User Biasa
        navbarPath = "../partials/navbar_user.html";
      } else {
        console.warn("User role is undefined or unexpected, defaulting to user navbar.");
        // Fallback jika role tidak true/false, bisa juga arahkan ke halaman default/login
        navbarPath = navbarPath || "../partials/navbar_user.html";
      }
    } else {
      // Fallback jika tidak ada data user di localStorage (belum login atau sesi habis)
      console.warn("User data not found in localStorage, defaulting to user navbar or a public navbar.");
      navbarPath = navbarPath || "../partials/navbar_user.html";
    }

    if (navbarPath) {
      try {
        const response = await fetch(navbarPath);
        if (!response.ok) {
          throw new Error(`Failed to load ${navbarPath}: ${response.statusText}`);
        }
        const html = await response.text();
        navbarPlaceholder.innerHTML = html;

        // Panggil fungsi highlightActiveNavItem() setelah navbar berhasil dimuat
        highlightActiveNavItem();
      } catch (error) {
        console.error("Error loading navbar component:", error);
        navbarPlaceholder.innerHTML = `<p style="color: red;">Failed to load navigation.</p>`;
      }
    } else {
      console.warn("No specific navbar path determined for this page/role after all checks.");
    }
  }
});

// Fungsi untuk menandai nav-item yang aktif
// Pastikan fungsi ini dideklarasikan di sini atau di file global yang dimuat sebelum loadComponent.js
function highlightActiveNavItem() {
  const currentPath = window.location.pathname;
  // Karena navbar sudah dimuat ke dalam navbarPlaceholder, kita harus mencari nav-item di dalamnya
  const navItems = document.querySelectorAll("#navbar-placeholder .nav-item");

  navItems.forEach((item) => {
    // Hapus kelas 'active' dan gaya aktif Tailwind dari semua item
    item.classList.remove("active", "bg-gray-700", "text-white");
    item.classList.add("text-gray-300"); // Kembalikan warna default Tailwind

    // Dapatkan href dan bandingkan dengan path saat ini
    const href = item.getAttribute("href");
    // Gunakan includes untuk pencocokan parsial (misalnya, /pages/dashboard.html cocok dengan dashboard.html)
    // atau Anda bisa menggunakan exact match jika diperlukan
    if (href && currentPath.includes(href.split("/").pop())) {
      // Membandingkan hanya nama file
      item.classList.add("active", "bg-gray-700", "text-white"); // Tambahkan gaya aktif Tailwind
      item.classList.remove("text-gray-300");
    }
  });
}
