document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Ambil atribut data-page untuk menentukan halaman yang aktif
    const activePage = document.querySelector('.nav-item.active').getAttribute('data-page');
    console.log(`Active page: ${activePage}`);

    // Panggil fungsi berdasarkan halaman yang aktif
    switch (activePage) {
        case 'dashboard':
            initDashboard();
            break;
        case 'users':
            initUsers();
            break;
        case 'hotels':
            initHotels();
            break;
        case 'rooms':
            initRooms();
            break;
        case 'reservations':
            initReservations();
            break;
        case 'payments':
            initPayments();
            break;
        case 'reports':
            initReports();
            break;
        case 'notifications':
            initNotifications();
            break;
        case 'settings':
            initSettings();
            break;
        case 'reviews':
            initReviews();
            break;
        default:
            console.log('No specific page initialization required.');
    }
});

// Fungsi untuk Dashboard
function initDashboard() {
    console.log('Initializing Dashboard');

    // Contoh: Ambil data statistik dari server atau localStorage
    const stats = {
        totalUsers: 100,
        totalHotels: 20,
        totalRooms: 500,
        totalReservations: 300
    };

    // Update tampilan dengan data statistik
    updateStatistic('total-users', stats.totalUsers);
    updateStatistic('total-hotels', stats.totalHotels);
    updateStatistic('total-rooms', stats.totalRooms);
    updateStatistic('total-reservations', stats.totalReservations);
}

function updateStatistic(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

// Fungsi untuk Manajemen Pengguna
function initUsers() {
    console.log('Initializing Users Management');

    let users = JSON.parse(localStorage.getItem('users')) || [
        { id: 1, name: 'Admin Utama', email: 'admin@example.com', role: 'Admin', status: 'Active' }
    ];

    function saveData() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function updateUsersTable() {
        const tbody = document.querySelector('#users-table-body');
        if (tbody) {
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <span class="badge ${user.status === 'Active' ? 'badge-success' : 'badge-danger'}">
                            ${user.status}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-warning ${user.status === 'Active' ? 'block-user-btn' : 'unblock-user-btn'}" 
                                data-id="${user.id}">
                            <i class="fas ${user.status === 'Active' ? 'fa-ban' : 'fa-check'}"></i>
                            ${user.status === 'Active' ? 'Blokir' : 'Aktifkan'}
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Event listener untuk tombol "Tambah Pengguna"
    const addUserButton = document.getElementById('add-user-btn');
    if (addUserButton) {
        addUserButton.addEventListener('click', () => {
            const name = prompt('Masukkan nama pengguna:');
            const email = prompt('Masukkan email pengguna:');
            const role = prompt('Masukkan role pengguna (user/admin):');

            if (name && email && role) {
                const newUser = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    role: role,
                    status: 'Active'
                };

                users.push(newUser);
                saveData();
                updateUsersTable();
                alert('Pengguna berhasil ditambahkan!');
            } else {
                alert('Harap isi semua field!');
            }
        });
    }

    // Event listener untuk tombol "Blokir/Aktifkan"
    const usersSection = document.querySelector('#users-section');
    if (usersSection) {
        usersSection.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;

            const userId = parseInt(btn.dataset.id);
            const user = users.find(u => u.id === userId);

            if (btn.classList.contains('block-user-btn')) {
                user.status = 'Blocked';
                alert('Pengguna berhasil diblokir!');
            } else if (btn.classList.contains('unblock-user-btn')) {
                user.status = 'Active';
                alert('Pengguna berhasil diaktifkan!');
            }

            saveData();
            updateUsersTable();
        });
    }

    updateUsersTable();
}

// Fungsi untuk Manajemen Hotel
function initHotels() {
    console.log('Initializing Hotels Management');

    let hotels = JSON.parse(localStorage.getItem('hotels')) || [];

    function saveData() {
        localStorage.setItem('hotels', JSON.stringify(hotels));
    }

    function updateHotelsTable() {
        const tbody = document.querySelector('#hotels-table-body');
        if (tbody) {
            tbody.innerHTML = hotels.map(hotel => `
                <tr>
                    <td>${hotel.id}</td>
                    <td>${hotel.name}</td>
                    <td>${hotel.location}</td>
                    <td>${hotel.rating}</td>
                    <td>
                        <button class="btn btn-warning edit-hotel-btn" data-id="${hotel.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger delete-hotel-btn" data-id="${hotel.id}">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Event listener untuk tombol "Tambah Hotel"
    const addHotelButton = document.getElementById('add-hotel-btn');
    if (addHotelButton) {
        addHotelButton.addEventListener('click', () => {
            const name = prompt('Masukkan nama hotel:');
            const location = prompt('Masukkan lokasi hotel:');
            const rating = prompt('Masukkan rating hotel:');

            if (name && location && rating) {
                const newHotel = {
                    id: Date.now(),
                    name: name,
                    location: location,
                    rating: rating
                };

                hotels.push(newHotel);
                saveData();
                updateHotelsTable();
                alert('Hotel berhasil ditambahkan!');
            } else {
                alert('Harap isi semua field!');
            }
        });
    }

    // Event listener untuk tombol "Edit" dan "Hapus"
    const hotelsSection = document.querySelector('#hotels-section');
    if (hotelsSection) {
        hotelsSection.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;

            const hotelId = parseInt(btn.dataset.id);
            const hotel = hotels.find(h => h.id === hotelId);

            if (btn.classList.contains('edit-hotel-btn')) {
                const newName = prompt('Masukkan nama baru:', hotel.name);
                const newLocation = prompt('Masukkan lokasi baru:', hotel.location);
                const newRating = prompt('Masukkan rating baru:', hotel.rating);

                if (newName && newLocation && newRating) {
                    hotel.name = newName;
                    hotel.location = newLocation;
                    hotel.rating = newRating;
                    saveData();
                    updateHotelsTable();
                    alert('Hotel berhasil diperbarui!');
                }
            } else if (btn.classList.contains('delete-hotel-btn')) {
                if (confirm('Apakah Anda yakin ingin menghapus hotel ini?')) {
                    hotels = hotels.filter(h => h.id !== hotelId);
                    saveData();
                    updateHotelsTable();
                    alert('Hotel berhasil dihapus!');
                }
            }
        });
    }

    updateHotelsTable();
}

// Fungsi untuk Manajemen Kamar
function initRooms() {
    console.log('Initializing Rooms Management');

    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];

    function saveData() {
        localStorage.setItem('rooms', JSON.stringify(rooms));
    }

    function updateRoomsTable() {
        const tbody = document.querySelector('#rooms-table-body');
        if (tbody) {
            tbody.innerHTML = rooms.map(room => `
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
            `).join('');
        }
    }

    // Event listener untuk tombol "Tambah Kamar"
    const addRoomButton = document.getElementById('add-room-btn');
    if (addRoomButton) {
        addRoomButton.addEventListener('click', () => {
            const hotelId = prompt('Masukkan ID hotel:');
            const roomNumber = prompt('Masukkan nomor kamar:');
            const type = prompt('Masukkan tipe kamar:');
            const price = prompt('Masukkan harga kamar:');

            if (hotelId && roomNumber && type && price) {
                const newRoom = {
                    id: Date.now(),
                    hotelId: hotelId,
                    roomNumber: roomNumber,
                    type: type,
                    price: price
                };

                rooms.push(newRoom);
                saveData();
                updateRoomsTable();
                alert('Kamar berhasil ditambahkan!');
            } else {
                alert('Harap isi semua field!');
            }
        });
    }

    // Event listener untuk tombol "Edit" dan "Hapus"
    const roomsSection = document.querySelector('#rooms-section');
    if (roomsSection) {
        roomsSection.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;

            const roomId = parseInt(btn.dataset.id);
            const room = rooms.find(r => r.id === roomId);

            if (btn.classList.contains('edit-room-btn')) {
                const newRoomNumber = prompt('Masukkan nomor kamar baru:', room.roomNumber);
                const newType = prompt('Masukkan tipe kamar baru:', room.type);
                const newPrice = prompt('Masukkan harga kamar baru:', room.price);

                if (newRoomNumber && newType && newPrice) {
                    room.roomNumber = newRoomNumber;
                    room.type = newType;
                    room.price = newPrice;
                    saveData();
                    updateRoomsTable();
                    alert('Kamar berhasil diperbarui!');
                }
            } else if (btn.classList.contains('delete-room-btn')) {
                if (confirm('Apakah Anda yakin ingin menghapus kamar ini?')) {
                    rooms = rooms.filter(r => r.id !== roomId);
                    saveData();
                    updateRoomsTable();
                    alert('Kamar berhasil dihapus!');
                }
            }
        });
    }

    updateRoomsTable();
}

// // Fungsi untuk Manajemen Reservasi
// function initReservations() {
//     console.log('Initializing Reservations Management');

//     let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

//     function saveData() {
//         localStorage.setItem('reservations', JSON.stringify(reservations));
//     }

//     function updateReservationsTable() {
//         const tbody = document.querySelector('#reservations-table-body');
//         if (tbody) {
//             tbody.innerHTML = reservations.map(reservation => `
//                 <tr>
//                     <td>${reservation.id}</td>
//                     <td>${reservation.userId}</td>
//                     <td>${reservation.roomId}</td>
//                     <td>${reservation.checkInDate}</td>
//                     <td>${reservation.checkOutDate}</td>
//                     <td>
//                         <button class="btn btn-warning edit-reservation-btn" data-id="${reservation.id}">
//                             <i class="fas fa-edit"></i> Edit
//                         </button>
//                         <button class="btn btn-danger delete-reservation-btn" data-id="${reservation.id}">
//                             <i class="fas fa-trash"></i> Hapus
//                         </button>
//                     </td>
//                 </tr>
//             `).join('');
//         }
//     }

// Event listener untuk tombol "Tambah Reservasi"
// const addReservationButton = document.getElementById('add-reservation-btn');
// if (addReservationButton) {
//     addReservationButton.addEventListener('click', () => {
//         const userId = prompt('Masukkan ID pengguna:');
//         const roomId = prompt('Masukkan ID kamar:');
//         const checkInDate = prompt('Masukkan tanggal check-in (YYYY-MM-DD):');
//         const checkOutDate = prompt('Masukkan tanggal check-out (YYYY-MM-DD):');

//         if (userId && roomId && checkInDate && checkOutDate) {
//             const newReservation = {
//                 id: Date.now(),
//                 userId: userId,
//                 roomId: roomId,
//                 checkInDate: checkInDate,
//                 checkOutDate: checkOutDate
//             };

//             reservations.push(newReservation);
//             saveData();
//             updateReservationsTable();
//             alert('Reservasi berhasil ditambahkan!');
//         } else {
//             alert('Harap isi semua field!');
//         }
//     });
// }

// Event listener untuk tombol "Edit" dan "Hapus"
// const reservationsSection = document.querySelector('#reservations-section');
// if (reservationsSection) {
//     reservationsSection.addEventListener('click', function(e) {
//         const btn = e.target.closest('button');
//         if (!btn) return;

//         const reservationId = parseInt(btn.dataset.id);
//         const reservation = reservations.find(r => r.id === reservationId);

//         if (btn.classList.contains('edit-reservation-btn')) {
//             const newCheckInDate = prompt('Masukkan tanggal check-in baru:', reservation.checkInDate);
//             const newCheckOutDate = prompt('Masukkan tanggal check-out baru:', reservation.checkOutDate);

//             if (newCheckInDate && newCheckOutDate) {
//                 reservation.checkInDate = newCheckInDate;
//                 reservation.checkOutDate = newCheckOutDate;
//                 saveData();
//                 updateReservationsTable();
//                 alert('Reservasi berhasil diperbarui!');
//             }
//         } else if (btn.classList.contains('delete-reservation-btn')) {
//             if (confirm('Apakah Anda yakin ingin menghapus reservasi ini?')) {
//                 reservations = reservations.filter(r => r.id !== reservationId);
//                 saveData();
//                 updateReservationsTable();
//                 alert('Reservasi berhasil dihapus!');
//             }
//         }
//     });
// }

// updateReservationsTable();
// }

// Fungsi untuk Manajemen Pembayaran
function initPayments() {
    console.log('Initializing Payments Management');

    let payments = JSON.parse(localStorage.getItem('payments')) || [];

    function saveData() {
        localStorage.setItem('payments', JSON.stringify(payments));
    }

    function updatePaymentsTable() {
        const tbody = document.querySelector('#payments-table-body');
        if (tbody) {
            tbody.innerHTML = payments.map(payment => `
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
            `).join('');
        }
    }

    // Event listener untuk tombol "Tambah Pembayaran"
    const addPaymentButton = document.getElementById('add-payment-btn');
    if (addPaymentButton) {
        addPaymentButton.addEventListener('click', () => {
            const reservationId = prompt('Masukkan ID reservasi:');
            const amount = prompt('Masukkan jumlah pembayaran:');
            const paymentDate = prompt('Masukkan tanggal pembayaran (YYYY-MM-DD):');

            if (reservationId && amount && paymentDate) {
                const newPayment = {
                    id: Date.now(),
                    reservationId: reservationId,
                    amount: amount,
                    paymentDate: paymentDate
                };

                payments.push(newPayment);
                saveData();
                updatePaymentsTable();
                alert('Pembayaran berhasil ditambahkan!');
            } else {
                alert('Harap isi semua field!');
            }
        });
    }

    // Event listener untuk tombol "Edit" dan "Hapus"
    const paymentsSection = document.querySelector('#payments-section');
    if (paymentsSection) {
        paymentsSection.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;

            const paymentId = parseInt(btn.dataset.id);
            const payment = payments.find(p => p.id === paymentId);

            if (btn.classList.contains('edit-payment-btn')) {
                const newAmount = prompt('Masukkan jumlah pembayaran baru:', payment.amount);
                const newPaymentDate = prompt('Masukkan tanggal pembayaran baru:', payment.paymentDate);

                if (newAmount && newPaymentDate) {
                    payment.amount = newAmount;
                    payment.paymentDate = newPaymentDate;
                    saveData();
                    updatePaymentsTable();
                    alert('Pembayaran berhasil diperbarui!');
                }
            } else if (btn.classList.contains('delete-payment-btn')) {
                if (confirm('Apakah Anda yakin ingin menghapus pembayaran ini?')) {
                    payments = payments.filter(p => p.id !== paymentId);
                    saveData();
                    updatePaymentsTable();
                    alert('Pembayaran berhasil dihapus!');
                }
            }
        });
    }

    updatePaymentsTable();
}

// Fungsi untuk Laporan
function initReports() {
    console.log('Initializing Reports');

    // Data contoh untuk laporan
    const reportsData = {
        bookings: {
            monthly: [50, 70, 60, 90, 80, 100, 120, 110, 130, 140, 150, 160], // Data bulanan
            yearly: [1000, 1200, 1100, 1300, 1400, 1500, 1600] // Data tahunan
        },
        revenue: {
            hotels: ['Hotel A', 'Hotel B', 'Hotel C', 'Hotel D'],
            amounts: [5000000, 3000000, 4000000, 6000000]
        },
        occupancy: {
            hotels: ['Hotel A', 'Hotel B', 'Hotel C', 'Hotel D'],
            rates: [80, 70, 90, 85] // Persentase okupansi
        }
    };

    // Inisialisasi grafik
    const bookingChartCtx = document.getElementById('bookingChart').getContext('2d');
    const revenueChartCtx = document.getElementById('revenueChart').getContext('2d');
    const occupancyChartCtx = document.getElementById('occupancyChart').getContext('2d');

    // Grafik Trend Pemesanan
    const bookingChart = new Chart(bookingChartCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
            datasets: [{
                label: 'Pemesanan',
                data: reportsData.bookings.monthly,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Trend Pemesanan Bulanan'
                }
            }
        }
    });

    // Grafik Pendapatan per Hotel
    const revenueChart = new Chart(revenueChartCtx, {
        type: 'bar',
        data: {
            labels: reportsData.revenue.hotels,
            datasets: [{
                label: 'Pendapatan',
                data: reportsData.revenue.amounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Pendapatan per Hotel'
                }
            }
        }
    });

    // Grafik Okupansi Kamar
    const occupancyChart = new Chart(occupancyChartCtx, {
        type: 'doughnut',
        data: {
            labels: reportsData.occupancy.hotels,
            datasets: [{
                label: 'Okupansi Kamar',
                data: reportsData.occupancy.rates,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Okupansi Kamar per Hotel'
                }
            }
        }
    });

    // Filter untuk Grafik Trend Pemesanan
    const timePeriodFilter = document.getElementById('time-period');
    if (timePeriodFilter) {
        timePeriodFilter.addEventListener('change', function() {
            const selectedPeriod = this.value;
            if (selectedPeriod === 'monthly') {
                bookingChart.data.datasets[0].data = reportsData.bookings.monthly;
                bookingChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                bookingChart.options.plugins.title.text = 'Trend Pemesanan Bulanan';
            } else if (selectedPeriod === 'yearly') {
                bookingChart.data.datasets[0].data = reportsData.bookings.yearly;
                bookingChart.data.labels = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
                bookingChart.options.plugins.title.text = 'Trend Pemesanan Tahunan';
            }
            bookingChart.update();
        });
    }
}

// Fungsi untuk Notifikasi & Log
function initNotifications() {
    console.log('Initializing Notifications & Logs');

    let logs = JSON.parse(localStorage.getItem('logs')) || [];

    function updateLogsTable() {
        const tbody = document.querySelector('#logs-table-body');
        if (tbody) {
            tbody.innerHTML = logs.map(log => `
                <tr>
                    <td>${log.id}</td>
                    <td>${log.message}</td>
                    <td>${log.timestamp}</td>
                </tr>
            `).join('');
        }
    }

    // Contoh: Tambahkan log baru
    function addLog(message) {
        const newLog = {
            id: Date.now(),
            message: message,
            timestamp: new Date().toLocaleString()
        };

        logs.push(newLog);
        localStorage.setItem('logs', JSON.stringify(logs));
        updateLogsTable();
    }

    // Contoh penggunaan
    addLog('Aplikasi dimulai');
    addLog('Pengguna baru ditambahkan');

    updateLogsTable();
}

// Fungsi untuk Halaman Ulasan
function initReviews() {
    console.log('Initializing Reviews');

    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Fungsi untuk menyimpan data ulasan
    function saveData() {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Fungsi untuk menampilkan ulasan
    function displayReviews() {
        const reviewsList = document.getElementById('reviews-list');
        if (reviewsList) {
            reviewsList.innerHTML = reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-user">${review.userName}</span>
                        <span class="review-hotel">${review.hotelName}</span>
                        <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
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
            `).join('');
        }
    }

    // Event listener untuk tombol hapus ulasan
    const reviewsSection = document.querySelector('#reviews-list');
    if (reviewsSection) {
        reviewsSection.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn || !btn.classList.contains('delete-review-btn')) return;

            const reviewId = parseInt(btn.dataset.id);
            if (confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
                reviews = reviews.filter(review => review.id !== reviewId);
                saveData();
                displayReviews();
                alert('Ulasan berhasil dihapus!');
            }
        });
    }

    // Tampilkan ulasan saat halaman dimuat
    displayReviews();
}

// Fungsi untuk Pengaturan
function initSettings() {
    console.log('Initializing Settings');

    // Contoh: Simpan pengaturan ke localStorage
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const theme = document.getElementById('theme').value;
            const notifications = document.getElementById('notifications').checked;

            localStorage.setItem('theme', theme);
            localStorage.setItem('notifications', notifications);

            alert('Pengaturan berhasil disimpan!');
        });
    }

    // Contoh: Muat pengaturan dari localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedNotifications = localStorage.getItem('notifications') === 'true';

    document.getElementById('theme').value = savedTheme;
    document.getElementById('notifications').checked = savedNotifications;
}
