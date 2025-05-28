function redirectToPage(role) {
  // Asumsi: role 1 = admin (dashboard.html), role 0 = user biasa (dashboard_user.html)
  // Sesuaikan logika role jika Anda memiliki nilai role yang berbeda
  window.location.href = role ? "dashboard.html" : "dashboard_user.html";
}

const onLogin = async () => {
  const loginButton = document.getElementById("loginbutton"); // Pastikan ID tombol Anda adalah "loginbutton"

  if (loginButton) {
    loginButton.addEventListener("click", async (event) => {
      // Mencegah perilaku default form submission (jika tombol ada di dalam form)
      event.preventDefault();

      // Mengambil elemen input untuk username dan password
      const userNameElement = document.getElementById("username"); // Pastikan ID input username Anda adalah "username"
      const passwordElement = document.getElementById("password"); // Pastikan ID input password Anda adalah "password"

      // Pastikan elemen input ditemukan
      if (!userNameElement || !passwordElement) {
        console.error("Username or password input element not found (check IDs 'username' and 'password' in HTML).");
        alert("Terjadi kesalahan: Elemen input tidak ditemukan.");
        return;
      }

      // Mengambil nilai dari input username dan password
      const userNameValue = userNameElement.value;
      const passwordValue = passwordElement.value;

      // Validasi input sederhana di frontend
      if (!userNameValue || !passwordValue) {
        alert("Silakan isi username dan password.");
        return;
      }

      try {
        const res = await fetch("https://backend-hotel-blush.vercel.app/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userNameValue, // Menggunakan userName
            password: passwordValue,
          }),
        });

        const response = await res.json(); // Gunakan 'response' seperti di kode Anda
        console.log("Login API Response:", response); // Log respons dari backend

        // Cek status respons dari backend (Asumsi: status 200 untuk sukses)
        if (response.status === 200 && response.token) {
          // --- PERUBAHAN KRUSIAL DI SINI ---
          // Simpan token ke localStorage
          window.localStorage.setItem("token", response.token); // Mengambil token dari response.token
          // Simpan juga data user jika diperlukan di frontend (sesuai contoh sebelumnya)
          window.localStorage.setItem("user", JSON.stringify(response.data));
          // --- AKHIR PERUBAHAN KRUSIAL ---

          alert(response.message || "Login berhasil!"); // Tampilkan pesan sukses dari backend

          // Mengarahkan berdasarkan role seperti di contoh sebelumnya
          if (response.data && (response.data.role === 1 || response.data.role === true)) {
            // Asumsi role admin adalah 1 atau true
            window.location.href = "dashboard.html"; // Sesuaikan path ini dengan halaman admin Anda
          } else if (response.data) {
            // Asumsi role user biasa adalah 0 atau false
            window.location.href = "dashboard_user.html"; // Sesuaikan path ini dengan halaman user Anda
          } else {
            console.error("Role data not found in login response.");
            window.location.href = "index.html"; // Redirect ke halaman default jika role tidak ditemukan
          }
        } else {
          // Tangani kasus login gagal (misalnya status 400 dari backend)
          alert(response.message || "Login gagal. Periksa username dan password Anda.");
        }
      } catch (error) {
        // Tangani error jaringan atau error lainnya
        console.error("Error during login fetch:", error);
        alert("Terjadi kesalahan saat mencoba login. Mohon coba lagi nanti.");
      }
    });
  } else {
    console.error("Login button with ID 'loginbutton' not found.");
  }
};

// Panggil fungsi onLogin untuk menginisialisasi event listener
onLogin();
