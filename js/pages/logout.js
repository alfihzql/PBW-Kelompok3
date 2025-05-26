function logout() {
  // Sembunyikan elemen countdown jika ada
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownElement.style.display = "none";
  }

  // Aktifkan tombol logout kembali jika sempat dinonaktifkan
  const logoutBtn = document.querySelector(".btn-logout");
  if (logoutBtn) {
    logoutBtn.style.pointerEvents = "auto";
    logoutBtn.style.opacity = "1";
  }

  // Hapus data sesi
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");

  // Langsung arahkan ke halaman login
  window.location.href = "login.html";
}
