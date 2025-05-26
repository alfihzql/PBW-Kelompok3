function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

function redirectToPage() {
  const role = document.getElementById("role").value;
  if (role == "user") {
    window.location.href = "dashboard_user.html";
  } else if (role == "admin") {
    window.location.href = "dashboard.html";
  } else {
    alert("Silahkan pilih role terlebih dahulu!");
  }
}

// js/main.js

// Import fungsi dari file lain (asumsi module syntax jika Anda pakai bundler,
// jika tidak, fungsi-fungsi ini harus dideklarasikan secara global)
// Atau, jika Anda menggunakan pendekatan ini tanpa bundler, pastikan
// semua file JS lain dimuat sebelum main.js di HTML

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed. Dispatching page initialization.");

  // Ambil atribut data-page dari elemen sidebar yang aktif
  // Pastikan elemen sidebar sudah dimuat oleh loadComponent.js
  const activeNavItem = document.querySelector(".nav-item.active");
  let activePage = null;

  if (activeNavItem) {
    activePage = activeNavItem.getAttribute("data-page");
    console.log(`Active page detected: ${activePage}`);
  } else {
    // Fallback jika tidak ada nav-item.active ditemukan,
    // mungkin karena halaman yang tidak ada di navbar atau masalah highlight
    console.warn("No active nav-item found. Attempting to deduce page from URL.");
    const path = window.location.pathname;
    if (path.includes("dashboard.html")) activePage = "dashboard";
    else if (path.includes("users.html")) activePage = "users";
    else if (path.includes("hotels.html")) activePage = "hotels";
    else if (path.includes("rooms.html")) activePage = "rooms";
    else if (path.includes("reservations.html")) activePage = "reservations";
    else if (path.includes("payments.html")) activePage = "payments";
    else if (path.includes("reports.html")) activePage = "reports";
    else if (path.includes("notifications.html")) activePage = "notifications";
    else if (path.includes("settings.html")) activePage = "settings";
    else if (path.includes("reviews.html")) activePage = "reviews";
    else if (path.includes("logout.html")) activePage = "logout"; // Tambahkan untuk logout
  }

  // Panggil fungsi inisialisasi yang relevan
  switch (activePage) {
    case "dashboard":
      initDashboard(); // Asumsi fungsi ini ada di js/pages/dashboard.js
      break;
    case "users":
      initUsers(); // Asumsi fungsi ini ada di js/pages/users.js
      break;
    case "hotels":
      initHotels(); // Asumsi fungsi ini ada di js/pages/hotels.js
      break;
    case "rooms":
      initRooms(); // Asumsi fungsi ini ada di js/pages/rooms.js
      break;
    case "reservations":
      initReservations(); // Asumsi fungsi ini ada di js/pages/reservations.js
      break;
    case "payments":
      initPayments(); // Asumsi fungsi ini ada di js/pages/payments.js
      break;
    case "reports":
      initReports(); // Asumsi fungsi ini ada di js/pages/reports.js
      break;
    case "notifications":
      initNotifications(); // Asumsi fungsi ini ada di js/pages/notifications.js
      break;
    case "settings":
      initSettings(); // Asumsi fungsi ini ada di js/pages/settings.js
      break;
    case "reviews":
      initReviews(); // Asumsi fungsi ini ada di js/pages/reviews.js
      break;
    case "logout":
      // Fungsi logout bisa dipanggil langsung atau initLogout()
      logout(); // Asumsi ini ada di js/pages/logout.js
      break;
    default:
      console.log("No specific page initialization required for this URL.");
  }
});
