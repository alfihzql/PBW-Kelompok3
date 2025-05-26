// js/global.js

// Deklarasi variabel global yang digunakan di banyak file page
let hotels = []; // Digunakan di hotels.js, rooms.js
let users = []; // Digunakan di users.js
let rooms = []; // Digunakan di rooms.js, reservations.js
let reservations = []; // Digunakan di reservations.js, dashboard.js
let payments = []; // Digunakan di payments.js
let logs = []; // Digunakan di notifications.js
let reviews = []; // Digunakan di reviews.js

// Variabel untuk ID hotel saat ini (untuk halaman rooms.html)
let hotelId = null;

// Pastikan semua fungsi utilitas dasar didefinisikan atau diimpor di sini
// Contoh: fungsi untuk menampilkan/menyembunyikan modal bisa ada di modal.js
// Atau fungsi update common table bisa di domHelpers.js
