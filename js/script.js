let hotels = [];
let deleteButton = [];
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Ambil atribut data-page untuk menentukan halaman yang aktif
  const activePage = document.querySelector(".nav-item.active").getAttribute("data-page");
  console.log(`Active page: ${activePage}`);

  // Panggil fungsi berdasarkan halaman yang aktif
  switch (activePage) {
    case "dashboard":
      initDashboard();
      break;
    case "users":
      initUsers();
      break;
    case "hotels":
      initHotels();
      break;
    case "rooms":
      initRooms();
      break;
    case "reservations":
      initReservations();
      break;
    case "payments":
      initPayments();
      break;
    case "reports":
      initReports();
      break;
    case "notifications":
      initNotifications();
      break;
    case "settings":
      initSettings();
      break;
    case "reviews":
      initReviews();
      break;
    default:
      console.log("No specific page initialization required.");
  }
});

// Fungsi untuk Dashboard
function initDashboard() {
  console.log("Initializing Dashboard");

  // Contoh: Ambil data statistik dari server atau localStorage
  const stats = {
    totalUsers: 100,
    totalHotels: 20,
    totalRooms: 500,
    totalReservations: 300,
  };

  // Update tampilan dengan data statistik
  updateStatistic("total-users", stats.totalUsers);
  updateStatistic("total-hotels", stats.totalHotels);
  updateStatistic("total-rooms", stats.totalRooms);
  updateStatistic("total-reservations", stats.totalReservations);

  // Tambahan: Update reservasi terbaru dari data di localStorage
  updateDashboardReservations();
}

function updateStatistic(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value;
  }
}

// Function to update dashboard with recent reservations
function updateDashboardReservations() {
  // Get reservation data from localStorage
  const savedReservations = localStorage.getItem("reservations");
  let reservations = [];

  if (savedReservations) {
    try {
      reservations = JSON.parse(savedReservations);

      // Sort reservations by ID (assuming newer reservations have higher IDs)
      reservations.sort((a, b) => b.id - a.id);

      // Take only the 3 most recent reservations
      const recentReservations = reservations.slice(0, 3);

      // Get the dashboard table body
      const dashboardTableBody = document.querySelector(".reservations-table tbody");

      if (dashboardTableBody) {
        // Clear existing rows
        dashboardTableBody.innerHTML = "";

        // If no reservations are found, display a message
        if (recentReservations.length === 0) {
          const tr = document.createElement("tr");
          tr.innerHTML = '<td colspan="4" style="text-align: center;">Tidak ada reservasi terbaru</td>';
          dashboardTableBody.appendChild(tr);
          return;
        }

        // Add recent reservations to the table
        recentReservations.forEach((reservation) => {
          // Create time display based on ID (just for demonstration)
          let timeDisplay;
          const lastDigit = reservation.id % 10;
          if (lastDigit < 3) {
            timeDisplay = "15 menit lalu";
          } else if (lastDigit < 7) {
            timeDisplay = "30 menit lalu";
          } else {
            timeDisplay = "1 jam lalu";
          }

          // Determine status based on pattern in userId for demonstration
          let statusClass = "new";
          let statusText = "Baru";

          if (reservation.userId.includes("Jane") || reservation.userId.includes("Smith")) {
            statusClass = "confirmed";
            statusText = "Dikonfirmasi";
          } else if (reservation.userId.includes("Charlie") || reservation.userId.includes("Davis")) {
            statusClass = "cancelled";
            statusText = "Dibatalkan";
          }

          // Create table row
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td> ${reservation.userId}</td>
            <td>${reservation.roomId}</td>
            <td>${timeDisplay}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
          `;

          dashboardTableBody.appendChild(tr);
        });
      }
    } catch (e) {
      console.error("Error loading reservations for dashboard:", e);
    }
  } else {
    // If no reservations data in localStorage, use dummy data
    const dummyReservations = [
      { userId: "John Doe", roomId: "Hotel Mawar", status: "new", statusText: "Baru" },
      { userId: "Jane Smith", roomId: "Hotel Melati", status: "confirmed", statusText: "Dikonfirmasi" },
      { userId: "Alice Johnson", roomId: "Grand Hotel Permata", status: "cancelled", statusText: "Dibatalkan" },
    ];

    const dashboardTableBody = document.querySelector(".reservations-table tbody");
    if (dashboardTableBody) {
      dashboardTableBody.innerHTML = "";

      dummyReservations.forEach((reservation) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${reservation.userId}</td>
          <td>${reservation.roomId}</td>
          <td>${reservation.status}</td>
          <td><span class="status-badge ${reservation.status}">${reservation.statusText}</span></td>
        `;

        dashboardTableBody.appendChild(tr);
      });
    }
  }
}

// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initDashboard();

  // Set up event listener to check for updates when returning to the page
  window.addEventListener("focus", function () {
    const lastUpdated = sessionStorage.getItem("reservationsLastUpdated");
    const lastChecked = sessionStorage.getItem("dashboardLastChecked");

    // If data was updated since last check, refresh the dashboard reservations
    if (lastUpdated && (!lastChecked || parseInt(lastUpdated) > parseInt(lastChecked))) {
      updateDashboardReservations();
      sessionStorage.setItem("dashboardLastChecked", Date.now());
    }
  });

  // Record when dashboard was last checked
  sessionStorage.setItem("dashboardLastChecked", Date.now());
});

// Fungsi untuk Manajemen Pengguna
function initUsers() {
  console.log("Initializing Users Management");

  let users = JSON.parse(localStorage.getItem("users")) || [{ id: 1, name: "Admin Utama", email: "admin@example.com", role: "Admin", status: "Active" }];

  function saveData() {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function updateUsersTable() {
    const tbody = document.querySelector("#users-table-body");
    if (tbody) {
      tbody.innerHTML = users
        .map(
          (user) => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <span class="badge ${user.status === "Active" ? "badge-success" : "badge-danger"}">
                            ${user.status}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-warning ${user.status === "Active" ? "block-user-btn" : "unblock-user-btn"}" 
                                data-id="${user.id}">
                            <i class="fas ${user.status === "Active" ? "fa-ban" : "fa-check"}"></i>
                            ${user.status === "Active" ? "Blokir" : "Aktifkan"}
                        </button>
                    </td>
                </tr>
            `
        )
        .join("");
    }
  }

  // Event listener untuk tombol "Tambah Pengguna"
  const addUserButton = document.getElementById("add-user-btn");
  if (addUserButton) {
    addUserButton.addEventListener("click", () => {
      const name = prompt("Masukkan nama pengguna:");
      const email = prompt("Masukkan email pengguna:");
      const role = prompt("Masukkan role pengguna (user/admin):");

      if (name && email && role) {
        const newUser = {
          id: Date.now(),
          name: name,
          email: email,
          role: role,
          status: "Active",
        };

        users.push(newUser);
        saveData();
        updateUsersTable();
        alert("Pengguna berhasil ditambahkan!");
      } else {
        alert("Harap isi semua field!");
      }
    });
  }

  // Event listener untuk tombol "Blokir/Aktifkan"
  const usersSection = document.querySelector("#users-section");
  if (usersSection) {
    usersSection.addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn) return;

      const userId = parseInt(btn.dataset.id);
      const user = users.find((u) => u.id === userId);

      if (btn.classList.contains("block-user-btn")) {
        user.status = "Blocked";
        alert("Pengguna berhasil diblokir!");
      } else if (btn.classList.contains("unblock-user-btn")) {
        user.status = "Active";
        alert("Pengguna berhasil diaktifkan!");
      }

      saveData();
      updateUsersTable();
    });
  }

  updateUsersTable();
}

// Fungsi untuk Manajemen Hotel
async function initHotels() {
  console.log("Initializing Hotels Management");
  try {
    const response = await fetch("http://localhost:3001/hotel/getAllHotels", {
      method: "GET",
    });

    const res = await response.json();
    console.log(res);

    if (res.data) hotels = [...res.data];
  } catch (error) {
    initHotels();
  }

  function saveData() {
    localStorage.setItem("hotels", JSON.stringify(hotels));
  }

  async function deleteHotel(id) {
    const response = await fetch("http://localhost:3001/hotel/deleteHotel/" + id, {
      method: "DELETE",
    });
    const res = await response.json();
    console.log(res);
    window.location.href = window.location.href;
  }

  function mappingDeleteButtonFunction() {
    try {
      hotels.map((hotel, i) => {
        document.getElementById("delete-" + hotel._id).addEventListener("click", async () => deleteHotel(hotel._id));
      });
    } catch (error) {
      console.log(error);
    }
  }

  // async function updateHotel(id) {
  //   const response = await fetch("http://localhost:3001/hotel/updateHotel/" + id, {
  //     method: "PATCH",
  //   });
  //   const res = await response.json();
  //   console.log(res);
  //   window.location.href = window.location.href;
  // }

  const handleCheckInput = (hotelName, address, rating, totalRoom, price) => {
    const isFullfilled = hotelName !== "" || address !== "" || rating !== "" || totalRoom !== "" || price !== "";
    return isFullfilled;
  };

  const handleOpenModal = (id) => {
    const modal = document.getElementById("modal-edit-data");
    const toggleOpenModal = document.getElementById("edit-" + id).addEventListener("click", () => {
      if (modalCondition === "close") {
        modal.style.display = "flex";
        modalCondition = "open";
      } else {
        modal.style.display = "none";
        modalCondition = "close";
      }
    });

    const toggleCloseModal = document.getElementById("close-modal-edit").addEventListener("click", () => {
      modal.style.display = "none";
      modalCondition = "close";
    });

    const addDataButton = document.getElementById("add-data-edit").addEventListener("click", async () => {
      let hotelName = document.getElementById("hotel-name").value;
      let address = document.getElementById("address").value;
      let rating = document.getElementById("rating").value;
      let totalRoom = document.getElementById("total-room").value;
      let price = document.getElementById("price").value;

      if (!handleCheckInput(hotelName, address, rating, totalRoom, price)) return alert("Isi semua inputan");

      const response = await fetch("http://localhost:3001/hotel/updateHotel/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelName: hotelName,
          address: address,
          rating: +rating,
          totalRoom: +totalRoom,
          price: +price,
        }),
      });

      const res = await response.json();

      if (res.status === 201) {
        hotelName = "";
        address = "";
        rating = "";
        totalRoom = "";
        price = "";
        modal.style.display = "none";
        modalCondition = "close";
        window.location.href = window.location.href;
      } else {
        alert(res.message);
      }
    });
  };

  function mappingUpdateButtonFunction() {
    try {
      hotels.map((hotel, i) => {
        document.getElementById("edit-" + hotel._id).addEventListener("click", async () => handleOpenModal(hotel._id));
      });
    } catch (error) {
      console.log(error);
    }
  }

  function updateHotelsTable() {
    const tbody = document.querySelector("#hotels-table-body");
    if (tbody) {
      tbody.innerHTML = hotels
        .map(
          (hotel) => `
                <tr>
                    <td>${hotel.hotelName}</td>
                    <td>${hotel.address}</td>
                    <td>${hotel.rating}</td>
                    <td>${hotel.totalRoom}</td>
                    <td>${hotel.price}</td>
                    <td>
                        <button class="btn btn-primary view-room-btn" data-id="${hotel._id}">
                          <i class="fas fa-door-open"></i> Lihat Kamar
                        </button>
                        <button class="btn btn-warning edit-hotel-btn" id="edit-${hotel._id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger delete-hotel-btn" id="delete-${hotel._id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </td>
                </tr>
            `
        )
        .join("");
    }
  }

  // Event listener untuk tombol "Tambah Hotel"
  // const addHotelButton = document.getElementById("add-hotel-btn");
  // if (addHotelButton) {
  //   addHotelButton.addEventListener("click", async () => {
  //     const hotelName = prompt("Masukkan nama hotel:");
  //     const address = prompt("Masukkan lokasi hotel:");
  //     const rating = prompt("Masukkan rating hotel:");
  //     const totalRoom = prompt("Masukkan jumlah kamar hotel:");
  //     const price = prompt("Masukkan harga hotel:");

  //     const response = await fetch("http://localhost:3001/hotel/createHotel", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         hotelName: hotelName,
  //         address: address,
  //         rating: rating,
  //         totalRoom: totalRoom,
  //         price: price,
  //       }),
  //     });
  //     const res = await response.json();
  //     console.log(res);
  //     initHotels();
  //   });
  // }

  // Event listener untuk tombol "Edit" dan "Hapus"
  // const hotelsSection = document.querySelector("#hotels-section");
  // if (hotelsSection) {
  //   hotelsSection.addEventListener("click", function (e) {
  //     const btn = e.target.closest("button");
  //     if (!btn) return;

  //     const hotelId = parseInt(btn.dataset.id);
  //     const hotel = hotels.find((h) => h.id === hotelId);

  //     if (btn.classList.contains("view-room-btn")) {
  //       // 🔽 Arahkan ke halaman rooms.html
  //       window.location.href = `rooms.html?id=${hotelId}`;
  //     } else if (btn.classList.contains("edit-hotel-btn")) {
  //       const newName = prompt("Masukkan nama baru:", hotel.name);
  //       const newLocation = prompt("Masukkan lokasi baru:", hotel.location);
  //       const newRating = prompt("Masukkan rating baru:", hotel.rating);
  //       const newRoomCount = prompt("Masukkan jumlah kamar baru:", hotel.roomCount);
  //       const newPrice = prompt("Masukkan harga baru:", hotel.price);

  //       if (newName && newLocation && newRating) {
  //         hotel.name = newName;
  //         hotel.location = newLocation;
  //         hotel.rating = newRating;
  //         hotel.roomCount = newRoomCount;
  //         hotel.price = newPrice;
  //         saveData();
  //         updateHotelsTable();
  //         alert("Hotel berhasil diperbarui!");
  //       }
  //     } else if (btn.classList.contains("delete-hotel-btn")) {
  //       if (confirm("Apakah Anda yakin ingin menghapus hotel ini?")) {
  //         hotels = hotels.filter((h) => h.id !== hotelId);
  //         saveData();
  //         updateHotelsTable();
  //         alert("Hotel berhasil dihapus!");
  //       }
  //     }
  //   });
  // }

  updateHotelsTable();
  mappingDeleteButtonFunction();
  mappingUpdateButtonFunction();
}

// Fungsi Ambil ID Hotel dari URL
function getHotelIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Fungsi untuk Manajemen Kamar
function initRooms() {
  console.log("Initializing Rooms Management");

  let rooms = [
    {
      id: 101,
      hotelId: "1",
      roomNumber: "101",
      type: "Deluxe",
      price: "Rp. 800.000,00",
    },
    {
      id: 102,
      hotelId: "1",
      roomNumber: "102",
      type: "Standard",
      price: "Rp. 600.000,00",
    },
    {
      id: 201,
      hotelId: "2",
      roomNumber: "201",
      type: "Suite",
      price: "Rp. 1.200.000,00",
    },
    {
      id: 202,
      hotelId: "2",
      roomNumber: "202",
      type: "Deluxe",
      price: "Rp. 950.000,00",
    },
    {
      id: 301,
      hotelId: "3",
      roomNumber: "301",
      type: "Standard",
      price: "Rp. 550.000,00",
    },
    {
      id: 401,
      hotelId: "4",
      roomNumber: "401",
      type: "Suite",
      price: "Rp. 1.500.000,00",
    },
    {
      id: 402,
      hotelId: "4",
      roomNumber: "402",
      type: "Standard",
      price: "Rp. 750.000,00",
    },
    {
      id: 501,
      hotelId: "5",
      roomNumber: "501",
      type: "Executive",
      price: "Rp. 2.000.000,00",
    },
    {
      id: 601,
      hotelId: "6",
      roomNumber: "601",
      type: "Deluxe",
      price: "Rp. 900.000,00",
    },
  ];

  function saveData() {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }

  function updateRoomsTable() {
    const tbody = document.querySelector("#rooms-table-body");

    if (tbody && hotelId) {
      const filteredRooms = rooms.filter((room) => room.hotelId == hotelId);

      tbody.innerHTML = filteredRooms
        .map(
          (room) => `
                <tr>
                    <td>${room.id}</td>
                    <td>${room.hotelId}</td>
                    <td>${room.roomNumber}</td>
                    <td>${room.type}</td>
                    <td>${room.price}</td>
                    <td>
                        <button class="btn btn-warning edit-room-btn" data-id="${room.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger delete-room-btn" data-id="${room.id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </td>
                </tr>
            `
        )
        .join("");
    }
  }

  // Update judul halaman dengan nama hotel
  const hotelTitle = document.getElementById("hotel-info-title");
  if (hotelTitle && hotelId) {
    const hotels = JSON.parse(localStorage.getItem("hotels")) || [];
    const hotel = hotels.find((h) => h.id == hotelId);
    if (hotel) {
      hotelTitle.textContent = `Daftar Kamar - ${hotel.name}`;
    }
  }

  // Event listener untuk tombol "Tambah Kamar"
  const addRoomButton = document.getElementById("add-room-btn");
  if (addRoomButton) {
    addRoomButton.addEventListener("click", () => {
      const roomNumber = prompt("Masukkan nomor kamar:");
      const type = prompt("Masukkan tipe kamar:");
      const price = prompt("Masukkan harga kamar:");

      if (hotelId && roomNumber && type && price) {
        const newRoom = {
          id: Date.now(),
          hotelId: hotelId,
          roomNumber: roomNumber,
          type: type,
          price: price,
        };

        rooms.push(newRoom);
        saveData();
        updateRoomsTable();
        alert("Kamar berhasil ditambahkan!");
      } else {
        alert("Harap isi semua field!");
      }
    });
  }

  // Event listener untuk tombol "Edit" dan "Hapus"
  const roomsSection = document.querySelector("#rooms-section");
  if (roomsSection) {
    roomsSection.addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn) return;

      const roomId = parseInt(btn.dataset.id);
      const room = rooms.find((r) => r.id === roomId);

      if (!room) return;

      if (btn.classList.contains("edit-room-btn")) {
        const newRoomNumber = prompt("Masukkan nomor kamar baru:", room.roomNumber);
        const newType = prompt("Masukkan tipe kamar baru:", room.type);
        const newPrice = prompt("Masukkan harga kamar baru:", room.price);

        if (newRoomNumber && newType && newPrice) {
          room.roomNumber = newRoomNumber;
          room.type = newType;
          room.price = newPrice;
          saveData();
          updateRoomsTable();
          alert("Kamar berhasil diperbarui!");
        }
      } else if (btn.classList.contains("delete-room-btn")) {
        if (confirm("Apakah Anda yakin ingin menghapus kamar ini?")) {
          rooms = rooms.filter((r) => r.id !== roomId);
          saveData();
          updateRoomsTable();
          alert("Kamar berhasil dihapus!");
        }
      }
    });
  }

  updateRoomsTable();
}

// Jalankan fungsi utama
document.addEventListener("DOMContentLoaded", initRooms);

// Fungsi untuk Manajemen Reservasi
function initReservations() {
  console.log("Initializing Reservations Management");

  // Initialize reservations array with dummy data
  let reservations = [
    {
      userId: "John Doe",
      roomId: "Hotel Mawar",
      checkInDate: "2023-10-01",
      checkOutDate: "2023-10-05",
      status: "Check-in",
    },
    {
      userId: "Jane Smith",
      roomId: "Hotel Melati",
      checkInDate: "2023-10-02",
      checkOutDate: "2023-10-06",
      status: "Check-out",
    },
    {
      userId: "Alice Johnson",
      roomId: "Grand Hotel Permata",
      checkInDate: "2023-10-03",
      checkOutDate: "2023-10-07",
      status: "Check-in",
    },
    {
      userId: "Bob Brown",
      roomId: "Elixir Hotel",
      checkInDate: "2023-10-04",
      checkOutDate: "2023-10-08",
      status: "Check-in",
    },
    {
      userId: "Charlie Davis",
      roomId: "Abyss Hotel",
      checkInDate: "2023-10-05",
      checkOutDate: "2023-10-09",
      status: "Check-out",
    },
  ];

  // Function to load reservations from local storage
  function loadData() {
    const savedReservations = localStorage.getItem("reservations");
    if (savedReservations) {
      reservations = JSON.parse(savedReservations);
    }
  }

  // Load any saved data first
  loadData();

  function saveData() {
    localStorage.setItem("reservations", JSON.stringify(reservations));

    sessionStorage.setItem("reservationsLastUpdated", Date.now());
  }

  function updateReservationsTable() {
    const tbody = document.querySelector("#reservations-table-body");
    if (tbody) {
      tbody.innerHTML = ""; // Clear existing content

      reservations.forEach((reservation) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${reservation.userId}</td>
        <td>${reservation.roomId}</td>
        <td>${reservation.checkInDate}</td>
        <td>${reservation.checkOutDate}</td>
        <td>${reservation.status}</td>
        <td>
          <button class="btn btn-warning edit-reservation-btn" data-id="${reservation.id}">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-danger delete-reservation-btn" data-id="${reservation.id}">
            <i class="fas fa-trash"></i> Hapus
          </button>
        </td>
      `;
        tbody.appendChild(tr);
      });

      // Add event listeners directly to the buttons
      const editButtons = document.querySelectorAll(".edit-reservation-btn");
      editButtons.forEach((btn) => {
        btn.addEventListener("click", handleEditReservation);
      });

      const deleteButtons = document.querySelectorAll(".delete-reservation-btn");
      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", handleDeleteReservation);
      });
    }
  }

  // Event listener untuk tombol "Tambah Reservasi"
  const addReservationButton = document.getElementById("add-reservation-btn");
  if (addReservationButton) {
    addReservationButton.addEventListener("click", () => {
      const userId = prompt("Masukkan nama pengguna:");
      const roomId = prompt("Masukkan nama hotel:");
      const checkInDate = prompt("Masukkan tanggal check-in (YYYY-MM-DD):");
      const checkOutDate = prompt("Masukkan tanggal check-out (YYYY-MM-DD):");
      const status = prompt("Masukkan status reservasi:");

      if (roomId && checkInDate && checkOutDate) {
        const newReservation = {
          id: Date.now(),
          userId,
          userId,
          roomId: roomId,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          status: status || "Pending",
        };

        reservations.push(newReservation);
        saveData();
        updateReservationsTable();
        alert("Reservasi berhasil ditambahkan!");
      } else {
        alert("Harap isi semua field!");
      }
    });
  }

  // Handler for edit button clicks
  function handleEditReservation(e) {
    const reservationId = parseInt(e.target.getAttribute("data-id"));
    const reservation = reservations.find((r) => r.id === reservationId);

    if (reservation) {
      const newCheckInDate = prompt("Masukkan tanggal check-in baru:", reservation.checkInDate);
      const newCheckOutDate = prompt("Masukkan tanggal check-out baru:", reservation.checkOutDate);

      if (newCheckInDate && newCheckOutDate) {
        reservation.checkInDate = newCheckInDate;
        reservation.checkOutDate = newCheckOutDate;
        saveData();
        updateReservationsTable();
        alert("Reservasi berhasil diperbarui!");
      }
    } else {
      alert("Reservasi tidak ditemukan!");
    }
  }

  // Handler for delete button clicks
  function handleDeleteReservation(e) {
    const reservationId = parseInt(e.target.getAttribute("data-id"));

    if (confirm("Apakah Anda yakin ingin menghapus reservasi ini?")) {
      // Find the index of the reservation
      const index = reservations.findIndex((r) => r.id === reservationId);

      if (index !== -1) {
        // Remove the reservation
        reservations.splice(index, 1);
        saveData();
        updateReservationsTable();
        alert("Reservasi berhasil dihapus!");
      } else {
        alert("Reservasi tidak ditemukan!");
      }
    }
  }
  loadData();

  updateReservationsTable();
}

// Fungsi untuk Manajemen Pembayaran
function initPayments() {
  console.log("Initializing Payments Management");

  let payments = JSON.parse(localStorage.getItem("payments")) || [];

  function saveData() {
    localStorage.setItem("payments", JSON.stringify(payments));
  }

  function updatePaymentsTable() {
    const tbody = document.querySelector("#payments-table-body");
    if (tbody) {
      tbody.innerHTML = payments
        .map(
          (payment) => `
                <tr>
                    <td>${payment.id}</td>
                    <td>${payment.reservationId}</td>
                    <td>${payment.amount}</td>
                    <td>${payment.paymentDate}</td>
                    <td>
                        <button class="btn btn-warning edit-payment-btn" data-id="${payment.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger delete-payment-btn" data-id="${payment.id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </td>
                </tr>
            `
        )
        .join("");
    }
  }

  // Event listener untuk tombol "Tambah Pembayaran"
  const addPaymentButton = document.getElementById("add-payment-btn");
  if (addPaymentButton) {
    addPaymentButton.addEventListener("click", () => {
      const reservationId = prompt("Masukkan ID reservasi:");
      const amount = prompt("Masukkan jumlah pembayaran:");
      const paymentDate = prompt("Masukkan tanggal pembayaran (YYYY-MM-DD):");

      if (reservationId && amount && paymentDate) {
        const newPayment = {
          id: Date.now(),
          reservationId: reservationId,
          amount: amount,
          paymentDate: paymentDate,
        };

        payments.push(newPayment);
        saveData();
        updatePaymentsTable();
        alert("Pembayaran berhasil ditambahkan!");
      } else {
        alert("Harap isi semua field!");
      }
    });
  }

  // Event listener untuk tombol "Edit" dan "Hapus"
  const paymentsSection = document.querySelector("#payments-section");
  if (paymentsSection) {
    paymentsSection.addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn) return;

      const paymentId = parseInt(btn.dataset.id);
      const payment = payments.find((p) => p.id === paymentId);

      if (btn.classList.contains("edit-payment-btn")) {
        const newAmount = prompt("Masukkan jumlah pembayaran baru:", payment.amount);
        const newPaymentDate = prompt("Masukkan tanggal pembayaran baru:", payment.paymentDate);

        if (newAmount && newPaymentDate) {
          payment.amount = newAmount;
          payment.paymentDate = newPaymentDate;
          saveData();
          updatePaymentsTable();
          alert("Pembayaran berhasil diperbarui!");
        }
      } else if (btn.classList.contains("delete-payment-btn")) {
        if (confirm("Apakah Anda yakin ingin menghapus pembayaran ini?")) {
          payments = payments.filter((p) => p.id !== paymentId);
          saveData();
          updatePaymentsTable();
          alert("Pembayaran berhasil dihapus!");
        }
      }
    });
  }

  updatePaymentsTable();
}

// Fungsi untuk Laporan
function initReports() {
  console.log("Initializing Reports");

  // Data contoh untuk laporan
  const reportsData = {
    bookings: {
      monthly: [50, 70, 60, 90, 80, 100, 120, 110, 130, 140, 150, 160], // Data bulanan
      yearly: [1000, 1200, 1100, 1300, 1400, 1500, 1600], // Data tahunan
    },
    revenue: {
      hotels: ["Hotel A", "Hotel B", "Hotel C", "Hotel D"],
      amounts: [5000000, 3000000, 4000000, 6000000],
    },
    occupancy: {
      hotels: ["Hotel A", "Hotel B", "Hotel C", "Hotel D"],
      rates: [80, 70, 90, 85], // Persentase okupansi
    },
  };

  // Inisialisasi grafik
  const bookingChartCtx = document.getElementById("bookingChart").getContext("2d");
  const revenueChartCtx = document.getElementById("revenueChart").getContext("2d");
  const occupancyChartCtx = document.getElementById("occupancyChart").getContext("2d");

  // Grafik Trend Pemesanan
  const bookingChart = new Chart(bookingChartCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
      datasets: [
        {
          label: "Pemesanan",
          data: reportsData.bookings.monthly,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Trend Pemesanan Bulanan",
        },
      },
    },
  });

  // Grafik Pendapatan per Hotel
  const revenueChart = new Chart(revenueChartCtx, {
    type: "bar",
    data: {
      labels: reportsData.revenue.hotels,
      datasets: [
        {
          label: "Pendapatan",
          data: reportsData.revenue.amounts,
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Pendapatan per Hotel",
        },
      },
    },
  });

  // Grafik Okupansi Kamar
  const occupancyChart = new Chart(occupancyChartCtx, {
    type: "doughnut",
    data: {
      labels: reportsData.occupancy.hotels,
      datasets: [
        {
          label: "Okupansi Kamar",
          data: reportsData.occupancy.rates,
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: "Okupansi Kamar per Hotel",
        },
      },
    },
  });

  // Filter untuk Grafik Trend Pemesanan
  const timePeriodFilter = document.getElementById("time-period");
  if (timePeriodFilter) {
    timePeriodFilter.addEventListener("change", function () {
      const selectedPeriod = this.value;
      if (selectedPeriod === "monthly") {
        bookingChart.data.datasets[0].data = reportsData.bookings.monthly;
        bookingChart.data.labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        bookingChart.options.plugins.title.text = "Trend Pemesanan Bulanan";
      } else if (selectedPeriod === "yearly") {
        bookingChart.data.datasets[0].data = reportsData.bookings.yearly;
        bookingChart.data.labels = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];
        bookingChart.options.plugins.title.text = "Trend Pemesanan Tahunan";
      }
      bookingChart.update();
    });
  }
}

// Fungsi untuk Notifikasi & Log
function initNotifications() {
  console.log("Initializing Notifications & Logs");

  let logs = JSON.parse(localStorage.getItem("logs")) || [];

  function updateLogsTable() {
    const tbody = document.querySelector("#logs-table-body");
    if (tbody) {
      tbody.innerHTML = logs
        .map(
          (log) => `
                <tr>
                    <td>${log.id}</td>
                    <td>${log.message}</td>
                    <td>${log.timestamp}</td>
                </tr>
            `
        )
        .join("");
    }
  }

  // Contoh: Tambahkan log baru
  function addLog(message) {
    const newLog = {
      id: Date.now(),
      message: message,
      timestamp: new Date().toLocaleString(),
    };

    logs.push(newLog);
    localStorage.setItem("logs", JSON.stringify(logs));
    updateLogsTable();
  }

  // Contoh penggunaan
  addLog("Aplikasi dimulai");
  addLog("Pengguna baru ditambahkan");

  updateLogsTable();
}

// Fungsi untuk Halaman Ulasan
function initReviews() {
  console.log("Initializing Reviews");

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Fungsi untuk menyimpan data ulasan
  function saveData() {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  // Fungsi untuk menampilkan ulasan
  function displayReviews() {
    const reviewsList = document.getElementById("reviews-list");
    if (reviewsList) {
      reviewsList.innerHTML = reviews
        .map(
          (review) => `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-user">${review.userName}</span>
                        <span class="review-hotel">${review.hotelName}</span>
                        <span class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
                    </div>
                    <div class="review-body">
                        <p>${review.reviewText}</p>
                    </div>
                    <div class="review-footer">
                        <button class="btn btn-danger delete-review-btn" data-id="${review.id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  // Event listener untuk tombol hapus ulasan
  const reviewsSection = document.querySelector("#reviews-list");
  if (reviewsSection) {
    reviewsSection.addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn || !btn.classList.contains("delete-review-btn")) return;

      const reviewId = parseInt(btn.dataset.id);
      if (confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) {
        reviews = reviews.filter((review) => review.id !== reviewId);
        saveData();
        displayReviews();
        alert("Ulasan berhasil dihapus!");
      }
    });
  }

  // Tampilkan ulasan saat halaman dimuat
  displayReviews();
}

// Fungsi untuk Pengaturan
function initSettings() {
  console.log("Initializing Settings");

  // Contoh: Simpan pengaturan ke localStorage
  const settingsForm = document.getElementById("settings-form");
  if (settingsForm) {
    settingsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const theme = document.getElementById("theme").value;
      const notifications = document.getElementById("notifications").checked;

      localStorage.setItem("theme", theme);
      localStorage.setItem("notifications", notifications);

      alert("Pengaturan berhasil disimpan!");
    });
  }

  // Contoh: Muat pengaturan dari localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  const savedNotifications = localStorage.getItem("notifications") === "true";

  document.getElementById("theme").value = savedTheme;
  document.getElementById("notifications").checked = savedNotifications;
}

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
