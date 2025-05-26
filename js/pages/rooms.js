// js/pages/rooms.js

// Pastikan hotelId didefinisikan secara global jika diakses oleh initRooms
// let hotelId = null; // Ini bisa dipindahkan ke global.js jika perlu

function initRooms() {
  console.log("Initializing Rooms Management");
  hotelId = getUrlParam("id"); // Menggunakan getUrlParam dari domHelpers.js

  // Jika Anda memanggil API untuk kamar (seperti di hotels.js), maka lakukan fetch di sini
  // const rooms = await fetchData(`/rooms/byHotel/${hotelId}`);

  updateRoomsTable();
  // Tambahkan mapping event listener untuk tombol edit/hapus kamar di sini
}

function updateRoomsTable() {
  const tbody = document.querySelector("#rooms-table-body");
  if (tbody) {
    const filteredRooms = rooms.filter((room) => room.hotelId == hotelId);
    updateTable(
      "rooms-table-body",
      filteredRooms,
      (room) => `
          <tr>
            <td class="px-5 py-3 border-b border-gray-200 text-sm">${room.id}</td>
            <td class="px-5 py-3 border-b border-gray-200 text-sm">${room.hotelId}</td>
            <td class="px-5 py-3 border-b border-gray-200 text-sm">${room.roomNumber}</td>
            <td class="px-5 py-3 border-b border-gray-200 text-sm">${room.type}</td>
            <td class="px-5 py-3 border-b border-gray-200 text-sm">${room.price}</td>
            <td class="px-5 py-3 border-b border-gray-200 text-sm flex items-center space-x-2">
              <button class="btn btn-warning edit-room-btn bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" data-id="${room.id}">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-danger delete-room-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" data-id="${room.id}">
                <i class="fas fa-trash"></i> Hapus
              </button>
            </td>
          </tr>
        `,
      6, // Colspan
      "Tidak ada data kamar untuk hotel ini."
    );
  }

  // Update judul halaman dengan nama hotel (jika perlu ambil dari global hotels array)
  const hotelTitle = document.getElementById("hotel-info-title");
  if (hotelTitle && hotelId && hotels.length > 0) {
    // Pastikan hotels sudah terisi
    const hotel = hotels.find((h) => h._id == hotelId); // Cari berdasarkan _id dari backend
    if (hotel) {
      hotelTitle.textContent = `Daftar Kamar - ${hotel.hotelName}`;
    }
  }
}

// ... Tambahkan logika untuk tambah/edit/hapus kamar di sini ...
