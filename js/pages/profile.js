// js/pages/profile.js

// Fungsi untuk mengambil data profil user
async function initProfile() {
  console.log("Initializing User Profile from profile.js");
  const userDisplayNameElement = document.getElementById("header-user-name");
  const userMainAvatarElement = document.getElementById("profile-main-avatar");
  const profileFullNameElement = document.getElementById("profile-full-name");
  const profileMemberSinceElement = document.getElementById("profile-member-since");
  const profileMembershipBadgeElement = document.getElementById("profile-membership-badge");

  // Info Pribadi
  const infoFullNameElement = document.getElementById("info-full-name");
  const infoEmailElement = document.getElementById("info-email");
  const infoPhoneElement = document.getElementById("info-phone");
  const infoAddressElement = document.getElementById("info-address");
  const infoMembershipElement = document.getElementById("info-membership");
  const infoRewardPointsElement = document.getElementById("info-reward-points");
  const infoRegisteredDateElement = document.getElementById("info-registered-date");
  const infoRoomPreferenceElement = document.getElementById("info-room-preference");

  // Edit Profile Form
  const editNameInput = document.getElementById("edit-name");
  const editEmailInput = document.getElementById("edit-email");
  const editPhoneInput = document.getElementById("edit-phone");
  const editAddressInput = document.getElementById("edit-address");

  // Stats
  const memberLevelValue = document.getElementById("member-level-value");
  const memberPointsValue = document.getElementById("member-points-value");
  const activeReservationsCount = document.getElementById("active-reservations-count");
  const totalReservationsInfo = document.getElementById("total-reservations-info");
  const totalExpenditureValue = document.getElementById("total-expenditure-value");
  const expenditureTrend = document.getElementById("expenditure-trend");

  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData || !userData._id) {
    console.error("User data not found in localStorage or user ID is missing. Redirecting to login.");
    alert("Sesi Anda berakhir atau tidak ada data pengguna. Silakan login kembali.");
    window.location.href = "index.html"; // Arahkan ke halaman login
    return;
  }

  const userId = userData._id;

  try {
    // Ambil data profil dari backend
    const res = await fetchData(`/auth/getProfile/${userId}`, "GET");
    console.log("Profile data from API:", res);

    if (res.status === 200 && res.data) {
      const user = res.data;

      // Perbarui header dan info utama profil
      if (userDisplayNameElement) userDisplayNameElement.textContent = user.fullName || "Pengguna";
      if (profileFullNameElement) profileFullNameElement.textContent = user.fullName || "Nama Lengkap";
      if (profileMemberSinceElement) profileMemberSinceElement.textContent = `Member sejak ${new Date(user.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long" })}`;
      if (profileMembershipBadgeElement) profileMembershipBadgeElement.innerHTML = `<i class="fas fa-medal mr-2"></i> ${user.role === true ? "Admin" : "Basic Member"}`; // Sesuaikan logika membership/role

      // Perbarui statistik
      if (memberLevelValue) memberLevelValue.textContent = user.role === true ? "Admin" : "Basic"; // Contoh
      if (memberPointsValue) memberPointsValue.textContent = `${user.rewardPoints || 0} Poin`; // Asumsi ada user.rewardPoints
      if (activeReservationsCount) activeReservationsCount.textContent = user.activeReservationsCount || 0; // Asumsi ada user.activeReservationsCount
      if (totalReservationsInfo) totalReservationsInfo.textContent = `Dari total ${user.totalReservations || 0} reservasi`; // Asumsi ada user.totalReservations
      if (totalExpenditureValue) totalExpenditureValue.textContent = `Rp ${parseInt(user.totalExpenditure || 0).toLocaleString("id-ID")}`; // Asumsi user.totalExpenditure
      // if (expenditureTrend) expenditureTrend.textContent = user.expenditureTrend || "--"; // Asumsi ada user.expenditureTrend

      // Perbarui Informasi Pribadi
      if (infoFullNameElement) infoFullNameElement.textContent = user.fullName || "-";
      if (infoEmailElement) infoEmailElement.textContent = user.email || "-";
      if (infoPhoneElement) infoPhoneElement.textContent = user.callNumber || "-"; // Asumsi callNumber
      if (infoAddressElement) infoAddressElement.textContent = user.address || "-";
      if (infoMembershipElement) infoMembershipElement.textContent = user.role === true ? "Admin" : "Basic"; // Contoh
      if (infoRewardPointsElement) infoRewardPointsElement.textContent = `${user.rewardPoints || 0} poin`; // Asumsi
      if (infoRegisteredDateElement) infoRegisteredDateElement.textContent = new Date(user.createdAt).toLocaleDateString("id-ID");
      if (infoRoomPreferenceElement) infoRoomPreferenceElement.textContent = user.roomPreference || "-"; // Asumsi ada user.roomPreference

      // Isi form Ubah Profil
      if (editNameInput) editNameInput.value = user.fullName || "";
      if (editEmailInput) editEmailInput.value = user.email || "";
      if (editPhoneInput) editPhoneInput.value = user.callNumber || "";
      if (editAddressInput) editAddressInput.value = user.address || "";

      // Todo: Isi juga form Preferensi dan Keamanan jika data tersedia di user object
      // ... (logika untuk mengisi form Preferensi dan Keamanan)
    } else {
      alert(res.message || "Gagal memuat data profil.");
      console.error("Failed to load profile:", res.message);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    alert("Gagal memuat data profil. Mohon coba lagi nanti.");
    // Anda mungkin ingin menanggapi error 401/403 dengan redirect ke login
    if (error.message.includes("Authentication failed")) {
      // Ini akan ditangani oleh fetchData, tapi jika perlu penanganan di sini
      // window.location.href = "index.html";
    }
  }

  // TODO: Implementasikan logika untuk Riwayat Reservasi Terakhir di sini
  // Misalnya, panggil API `/pemesanan/getRecentReservationsByUserId/${userId}`
  // Lalu update tbody dengan ID 'recent-reservation-history'
}

// Fungsi untuk mengubah tab (dari HTML onclick)
function changeTab(tabId, clickedTabElement) {
  // Sembunyikan semua konten tab
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
    content.classList.add("hidden"); // Gunakan hidden Tailwind
  });

  // Hapus kelas aktif dari semua tab navigasi
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active", "border-blue-500", "text-blue-600"); // Hapus gaya aktif Tailwind
    tab.classList.add("border-transparent", "text-gray-600"); // Kembali ke gaya default
  });

  // Tampilkan konten tab yang dipilih
  const selectedContent = document.getElementById(tabId);
  if (selectedContent) {
    selectedContent.classList.add("active");
    selectedContent.classList.remove("hidden");
  }

  // Tambahkan kelas aktif pada tab yang diklik
  if (clickedTabElement) {
    clickedTabElement.classList.add("active", "border-blue-500", "text-blue-600"); // Tambahkan gaya aktif Tailwind
    clickedTabElement.classList.remove("border-transparent", "text-gray-600");
  }
}

// Event listener untuk saat DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  initProfile();

  const editProfileForm = document.querySelector("#edit-profile form.profile-form");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Mencegah form refresh halaman

      // Ambil data user yang sedang login dari localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData._id) {
        alert("Sesi Anda berakhir. Silakan login kembali untuk memperbarui profil.");
        window.location.href = "index.html"; // Arahkan ke halaman login
        return;
      }
      const userId = userData._id; // Dapatkan ID user

      // Ambil nilai dari input form
      const fullName = document.getElementById("edit-name").value;
      const email = document.getElementById("edit-email").value;
      const callNumber = document.getElementById("edit-phone").value; // Sesuaikan dengan nama field di backend
      const address = document.getElementById("edit-address").value;

      // Validasi input (gunakan isInputFullfilled jika tersedia)
      if (!fullName || !email) {
        // Contoh validasi minimal
        alert("Nama lengkap dan email tidak boleh kosong.");
        return;
      }

      try {
        const res = await fetchData(`/auth/updateUser/${userId}`, "PUT", {
          // Gunakan method PUT atau PATCH
          fullName,
          email,
          callNumber, // Pastikan nama field sesuai backend
          address, // Pastikan nama field sesuai backend
          // userName: userData.userName, // Jika username tidak diubah, bisa dikirim ulang dari userData
          // role: userData.role, // Jika role tidak diubah, bisa dikirim ulang dari userData
        });

        if (res.status === 200) {
          alert(res.message || "Profil berhasil diperbarui.");
          // Opsional: Perbarui data user di localStorage
          // userData.fullName = fullName;
          // userData.email = email;
          // userData.callNumber = callNumber;
          // userData.address = address;
          // localStorage.setItem("user", JSON.stringify(userData));

          initProfile(); // Refresh tampilan profil dengan data terbaru
          // Kembali ke tab informasi pribadi setelah update
          changeTab("personal-info", document.querySelector(".tab[onclick*='personal-info']"));
        } else {
          alert(res.message || "Gagal memperbarui profil.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Terjadi kesalahan saat memperbarui profil. Mohon coba lagi nanti.");
      }
    });
  }
});

async function updatePassword() {
  const securityForm = document.querySelector("#security form.profile-form");
  if (!securityForm) {
    console.error("Security form not found.");
    return;
  }

  securityForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah form refresh halaman

    // Ambil data user yang sedang login dari localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData._id) {
      alert("Sesi Anda berakhir. Silakan login kembali untuk mengubah kata sandi.");
      window.location.href = "index.html"; // Arahkan ke halaman login
      return;
    }
    const userId = userData._id; // Dapatkan ID user

    // Ambil nilai dari input form ubah password
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmNewPassword = document.getElementById("confirm-password").value;

    // Validasi input di frontend
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Semua kolom kata sandi harus diisi.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Kata sandi baru dan konfirmasi tidak cocok.");
      return;
    }

    try {
      const res = await fetchData(`/auth/updatePassword/${userId}`, "POST", {
        // Gunakan method POST
        currentPassword,
        newPassword,
        confirmNewPassword, // Disarankan untuk mengirim ini ke backend untuk validasi server
      });

      if (res.status === 201) {
        // Backend Anda mengembalikan status 201 untuk sukses update password
        alert(res.message || "Kata sandi berhasil diubah.");
        // Opsional: Kosongkan input password setelah berhasil
        document.getElementById("current-password").value = "";
        document.getElementById("new-password").value = "";
        document.getElementById("confirm-password").value = "";

        // Kembali ke tab informasi pribadi atau tetap di tab keamanan
        // changeTab('personal-info', document.querySelector('.tab[onclick*=\'personal-info\']'));
      } else {
        alert(res.message || "Gagal mengubah kata sandi.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Terjadi kesalahan saat mengubah kata sandi. Mohon coba lagi nanti.");
      // Jika error adalah 400 (password saat ini salah), backend akan mengirim pesan spesifik
    }
  });
}
