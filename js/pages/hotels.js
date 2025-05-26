// js/pages/hotels.js

// Fungsi untuk Manajemen Hotel (sudah disesuaikan)
async function initHotels() {
  console.log("Initializing Hotels Management from hotels.js");
  try {
    const res = await fetchData("/hotel/getAllHotels"); // Menggunakan fungsi fetchData
    console.log("Hotels data from API:", res);

    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      hotels = [...res.data]; // Mengisi array hotels global
      updateHotelsTable();
      mappingDeleteButtonFunction();
      mappingUpdateButtonFunction();
    } else {
      console.log("Tidak ada data hotel atau invalid response");
      updateTable(
        "hotels-table-body",
        [], // Data kosong
        null, // mapFunction tidak perlu
        6, // Colspan untuk tabel hotel
        "Tidak ada data hotel."
      );
    }
  } catch (error) {
    console.error("Error in initHotels:", error);
    updateTable("hotels-table-body", [], null, 6, "Gagal memuat data hotel. Mohon coba lagi nanti.");
  }
}

// Fungsi helper yang digunakan HANYA di hotels.js
function updateHotelsTable() {
  const tbody = document.querySelector("#hotels-table-body");
  if (tbody) {
    updateTable(
      "hotels-table-body",
      hotels,
      (hotel) => `
            <tr class="hover:bg-gray-50">
              <td class="px-5 py-3 border-b border-gray-200 text-sm">${hotel.hotelName}</td>
              <td class="px-5 py-3 border-b border-gray-200 text-sm">${hotel.address}</td>
              <td class="px-5 py-3 border-b border-gray-200 text-sm">${hotel.rating}</td>
              <td class="px-5 py-3 border-b border-gray-200 text-sm">${hotel.totalRoom}</td>
              <td class="px-5 py-3 border-b border-gray-200 text-sm">${hotel.price}</td>
              <td class="px-5 py-3 border-b border-gray-200 text-sm flex items-center space-x-2">
                  <a href="rooms.html?id=${hotel._id}" class="btn btn-primary view-room-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                      <i class="fas fa-door-open"></i> Lihat Kamar
                  </a>
                  <button class="btn btn-warning edit-hotel-btn bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" id="edit-${hotel._id}">
                      <i class="fas fa-edit"></i> Edit
                  </button>
                  <button class="btn btn-danger delete-hotel-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" id="delete-${hotel._id}">
                      <i class="fas fa-trash"></i> Hapus
                  </button>
              </td>
            </tr>
        `,
      6, // Colspan
      "Tidak ada data hotel."
    );
  }
}

async function deleteHotel(id) {
  if (!confirm("Anda yakin ingin menghapus hotel ini?")) return;
  try {
    const res = await fetchData(`/hotel/deleteHotel/${id}`, "DELETE");
    alert(res.message || "Hotel berhasil dihapus.");
    initHotels(); // Refresh data
  } catch (error) {
    alert(error.message || "Gagal menghapus hotel.");
  }
}

function mappingDeleteButtonFunction() {
  try {
    // Delegasi event listener ke tbody untuk efisiensi dan handling elemen dinamis
    const tbody = document.getElementById("hotels-table-body");
    if (tbody) {
      tbody.removeEventListener("click", handleDeleteButtonClick); // Hapus listener lama
      tbody.addEventListener("click", handleDeleteButtonClick); // Tambahkan listener baru
    }
  } catch (error) {
    console.error("Error mapping delete button functions:", error);
  }
}

function handleDeleteButtonClick(event) {
  const button = event.target.closest(".delete-hotel-btn");
  if (button) {
    const hotelId = button.id.replace("delete-", "");
    deleteHotel(hotelId);
  }
}

const handleOpenEditModal = (id) => {
  OpenModal("modal-edit-data"); // Memanggil fungsi openModal dari modal.js
  const hotelToEdit = hotels.find((h) => h._id === id);
  if (hotelToEdit) {
    document.getElementById("hotel-name").value = hotelToEdit.hotelName;
    document.getElementById("address").value = hotelToEdit.address;
    document.getElementById("rating").value = hotelToEdit.rating;
    document.getElementById("total-room").value = hotelToEdit.totalRoom;
    document.getElementById("price").value = hotelToEdit.price;
    document.getElementById("add-data-edit").dataset.hotelId = id; // Simpan ID di tombol Selesai
  }
};

const handleUpdateHotel = async () => {
  const id = document.getElementById("add-data-edit").dataset.hotelId;
  const hotelName = document.getElementById("hotel-name").value;
  const address = document.getElementById("address").value;
  const rating = document.getElementById("rating").value;
  const totalRoom = document.getElementById("total-room").value;
  const price = document.getElementById("price").value;

  if (!isInputFullfilled([hotelName, address, rating, totalRoom, price])) {
    // Menggunakan isInputFullfilled dari validation.js
    return alert("Isi semua inputan.");
  }

  try {
    const res = await fetchData(`/hotel/updateHotel/${id}`, "PATCH", {
      hotelName,
      address,
      rating: +rating,
      totalRoom: +totalRoom,
      price: +price,
    });
    alert(res.message || "Hotel berhasil diperbarui.");
    closeModal("modal-edit-data"); // Memanggil fungsi closeModal dari modal.js
    initHotels(); // Refresh data
  } catch (error) {
    alert(error.message || "Gagal memperbarui hotel.");
  }
};

function mappingUpdateButtonFunction() {
  try {
    const tbody = document.getElementById("hotels-table-body");
    if (tbody) {
      tbody.removeEventListener("click", handleEditButtonClick);
      tbody.addEventListener("click", handleEditButtonClick);
    }

    // Event listener untuk tombol "Selesai" di modal edit
    const addDataEditButton = document.getElementById("add-data-edit");
    if (addDataEditButton) {
      addDataEditButton.removeEventListener("click", handleUpdateHotel); // Hapus listener lama
      addDataEditButton.addEventListener("click", handleUpdateHotel); // Tambahkan listener baru
    }
    // Event listener untuk tombol "Batal" di modal edit
    const closeModalEditButton = document.getElementById("close-modal-edit");
    if (closeModalEditButton) {
      closeModalEditButton.removeEventListener("click", closeModal.bind(null, "modal-edit-data")); // Hapus listener lama
      closeModalEditButton.addEventListener("click", closeModal.bind(null, "modal-edit-data")); // Tambahkan listener baru
    }
  } catch (error) {
    console.error("Error mapping update button functions:", error);
  }
}

function handleEditButtonClick(event) {
  const button = event.target.closest(".edit-hotel-btn");
  if (button) {
    const hotelId = button.id.replace("edit-", "");
    handleOpenEditModal(hotelId);
  }
}

// Event listener untuk tombol "Tambah Hotel" di halaman utama
document.addEventListener("DOMContentLoaded", () => {
  const addHotelBtn = document.getElementById("add-hotel-btn");
  const closeModalAddBtn = document.getElementById("close-modal");
  const addDataNewBtn = document.getElementById("add-data");

  if (addHotelBtn) {
    addHotelBtn.addEventListener("click", () => {
      openModal("modal-tambah-data"); // Memanggil fungsi openModal dari modal.js
      // Kosongkan input di modal tambah saat dibuka
      document.getElementById("hotel-name-input").value = "";
      document.getElementById("address-input").value = "";
      document.getElementById("rating-input").value = "";
      document.getElementById("total-room-input").value = "";
      document.getElementById("price-input").value = "";
    });
  }

  if (closeModalAddBtn) {
    closeModalAddBtn.addEventListener("click", () => {
      closeModal("modal-tambah-data"); // Memanggil fungsi closeModal dari modal.js
    });
  }

  if (addDataNewBtn) {
    addDataNewBtn.addEventListener("click", async () => {
      const hotelName = document.getElementById("hotel-name-input").value;
      const address = document.getElementById("address-input").value;
      const rating = document.getElementById("rating-input").value;
      const totalRoom = document.getElementById("total-room-input").value;
      const price = document.getElementById("price-input").value;

      if (!isInputFullfilled([hotelName, address, rating, totalRoom, price])) {
        // Menggunakan isInputFullfilled
        return alert("Isi semua inputan!");
      }

      try {
        const res = await fetchData("/hotel/createHotel", "POST", {
          // Menggunakan fetchData
          hotelName,
          address,
          rating: +rating,
          totalRoom: +totalRoom,
          price: +price,
        });
        alert(res.message || "Hotel berhasil ditambahkan.");
        closeModal("modal-tambah-data"); // Memanggil closeModal
        initHotels(); // Refresh data
      } catch (error) {
        alert(error.message || "Terjadi kesalahan saat menambahkan hotel.");
      }
    });
  }

  // Panggil mapping function setelah data dimuat
  mappingDeleteButtonFunction();
  mappingUpdateButtonFunction();
});
