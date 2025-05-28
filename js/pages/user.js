// js/pages/users.js

// Fungsi untuk Manajemen User
async function initUsers() {
  console.log("Initializing User Management from users.js");
  updateTable("users-table-body", [], null, 6, "Memuat data user...", true);

  try {
    // Endpoint yang benar berdasarkan authRouter.js: /auth/getAllUsers
    const res = await fetchData("/auth/getAllUsers", "GET");
    console.log("Users data from API:", res);

    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      users = [...res.data];
      updateUsersTable();
      mappingDeleteButtonFunction();
      // Jika ada edit, panggil juga mappingEditButtonFunction();
    } else {
      console.log("Tidak ada data user atau invalid response");
      updateTable("users-table-body", [], null, 6, "Tidak ada data user.");
    }
  } catch (error) {
    console.error("Error in initUsers:", error);
    updateTable("users-table-body", [], null, 6, "Gagal memuat data user. Mohon coba lagi nanti.");
  }
}

// Fungsi untuk memperbarui tampilan tabel user
function updateUsersTable() {
  const tbody = document.querySelector("#users-table-body");
  if (tbody) {
    updateTable(
      "users-table-body",
      users,
      (user) => `
                <tr class="hover:bg-gray-50">
                    <td class="px-5 py-3 border-b border-gray-200 text-sm">${user._id}</td>
                    <td class="px-5 py-3 border-b border-gray-200 text-sm">${user.fullName}</td>
                    <td class="px-5 py-3 border-b border-gray-200 text-sm">${user.email}</td>
                    <td class="px-5 py-3 border-b border-gray-200 text-sm">${new Date(user.createdAt).toLocaleDateString()}</td>
                    <td class="px-5 py-3 border-b border-gray-200 text-sm flex items-center space-x-2">
                        <button class="btn btn-danger delete-user-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" id="delete-${user._id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </td>
                </tr>
            `,
      6,
      "Tidak ada data user."
    );
  }
}

// Fungsi untuk menghapus user
async function deleteUser(id) {
  if (!confirm("Anda yakin ingin menghapus user ini?")) return;

  try {
    // Endpoint yang benar berdasarkan authRouter.js: /auth/deleteUserById/:userId
    const res = await fetchData(`/auth/deleteUserById/${id}`, "DELETE");
    alert(res.message || "User berhasil dihapus.");
    initUsers(); // Refresh data setelah penghapusan berhasil
  } catch (error) {
    alert(error.message || "Gagal menghapus user.");
  }
}

// Fungsi untuk mengikat event listener ke tombol hapus
function mappingDeleteButtonFunction() {
  try {
    const tbody = document.getElementById("users-table-body");
    if (tbody) {
      tbody.removeEventListener("click", handleDeleteButtonClick);
      tbody.addEventListener("click", handleDeleteButtonClick);
    }
  } catch (error) {
    console.error("Error mapping delete button functions:", error);
  }
}

// Handler event click untuk tombol hapus
function handleDeleteButtonClick(event) {
  const button = event.target.closest(".delete-user-btn");
  if (button) {
    const userId = button.id.replace("delete-", "");
    deleteUser(userId);
  }
}

// Event listener untuk saat DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  initUsers(); // Panggil fungsi inisialisasi user saat halaman dimuat

  const userSearchInput = document.getElementById("user-search");
  if (userSearchInput) {
    userSearchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredUsers = users.filter((user) => user.fullName.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm) || user.userName.toLowerCase().includes(searchTerm));
      const tbody = document.querySelector("#users-table-body");
      if (tbody) {
        updateTable(
          "users-table-body",
          filteredUsers,
          (user) => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-5 py-3 border-b border-gray-200 text-sm">${user._id}</td>
                            <td class="px-5 py-3 border-b border-gray-200 text-sm">${user.fullName}</td>
                            <td class="px-5 py-3 border-b border-gray-200 text-sm">${user.email}</td>
                            <td class="px-5 py-3 border-b border-gray-200 text-sm">${new Date(user.createdAt).toLocaleDateString()}</td>
                            <td class="px-5 py-3 border-b border-gray-200 text-sm flex items-center space-x-2">
                                <button class="btn btn-danger delete-user-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" id="delete-${user._id}">
                                    <i class="fas fa-trash"></i> Hapus
                                </button>
                            </td>
                        </tr>
                    `,
          6,
          "Tidak ada user yang ditemukan."
        );
        mappingDeleteButtonFunction();
      }
    });
  }
});
