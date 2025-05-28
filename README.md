# HotelKu - Sistem Manajemen Hotel
## Kelompok 3
* **Dea Zasqia Pasaribu Malau (2308107010004)**
* **Muhammad Hizqil Alfi (2308107010046)**
* **Muhammad Milan Maulidan Mulizar (2308107010064)**
* **Alief Aulia SAG (2308107010028)**

[![CODE](https://skillicons.dev/icons?i=html,css,js,mysql,mongodb,node,express)](https://skillicons.dev)

## Deskripsi Proyek

**HotelKu** adalah **Sistem Manajemen Hotel berbasis Web** yang dirancang untuk memberikan solusi praktis dalam pengelolaan operasi hotel. Aplikasi ini dibangun dengan tujuan untuk mempermudah pengelolaan hotel, baik dari sisi **Pengguna** (user) maupun **Administrator** (admin). Dengan antarmuka yang intuitif dan fungsional, **HotelKu** memungkinkan pengelolaan kamar, pemesanan, pembayaran, serta data pengguna secara efisien.

Aplikasi ini memungkinkan pengguna untuk melakukan pemesanan kamar hotel, melihat status reservasi mereka, melakukan pembayaran, dan memperbarui informasi pribadi mereka. Di sisi lain, admin memiliki akses penuh untuk mengelola hotel, kamar, transaksi, pengguna, serta melakukan pengaturan sistem.

## Fitur Utama Aplikasi

### **1. Login dan Signup**

Aplikasi ini menyediakan sistem autentikasi pengguna yang memungkinkan pengguna baru untuk mendaftar dan pengguna lama untuk login:

* **Login**: Pengguna dapat masuk dengan menggunakan email dan password yang telah terdaftar di sistem.
* **Signup**: Pengguna baru dapat membuat akun dengan mengisi data pribadi seperti nama lengkap, email, dan password.

### **2. Dashboard Pengguna**

Setelah login, pengguna akan diarahkan ke **Dashboard Pengguna**, yang menyediakan informasi terkait dengan pemesanan mereka:

* **Reservasi Aktif**: Pengguna dapat melihat jumlah reservasi aktif dan statusnya.
* **Total Pembayaran**: Pengguna dapat melihat total pembayaran yang telah dilakukan.
* **Notifikasi Baru**: Pengguna akan menerima pemberitahuan terkait dengan status pemesanan atau informasi lainnya.
* **Reservasi Hotel**: Pengguna dapat melihat daftar reservasi terbaru mereka.
* **Sidebar Navigasi**: Terdapat menu untuk **Reservasi Hotel**, **Pembayaran**, **Profil**, dan **Keluar**.

Pada halaman **Profil**, pengguna dapat melihat dan memperbarui data diri, termasuk level member, informasi profil, preferensi, dan pengaturan keamanan.

### **3. Dashboard Admin**

Admin memiliki akses penuh ke **Dashboard Admin**, yang mencakup berbagai kontrol manajerial:

* **Hotel Aktif**: Menampilkan jumlah hotel yang aktif dalam sistem.
* **Kamar Tersedia**: Menampilkan jumlah kamar yang tersedia dan terisi.
* **Reservasi Aktif**: Menampilkan jumlah reservasi yang sedang berlangsung.
* **Status Kamar**: Menampilkan status ketersediaan kamar (tersedia atau terisi).
* **Aktivitas Terbaru**: Menampilkan aktivitas terbaru terkait pemesanan, pembayaran, dan perubahan status kamar.
* **Reservasi Terbaru**: Menampilkan reservasi terbaru yang dilakukan oleh pengguna.

### **4. Manajemen Kamar dan Hotel**

Admin dapat mengelola kamar dan hotel melalui dashboard yang disediakan:

* **Tambah Hotel**: Admin dapat menambahkan hotel baru ke dalam sistem.
* **Tambah Kamar**: Admin dapat menambah kamar baru dengan rincian seperti tipe kamar, harga, dan kapasitas.
* **Edit Kamar**: Admin dapat mengedit informasi kamar, termasuk status dan harga.
* **Hapus Kamar**: Admin dapat menghapus kamar yang tidak aktif.

### **5. Manajemen Pengguna (CRUD Admin)**

Admin dapat mengelola data pengguna (CRUD):

* **Tambah Pengguna**: Admin dapat menambah pengguna baru ke dalam sistem.
* **Lihat Pengguna**: Admin dapat melihat daftar pengguna yang terdaftar.
* **Update Pengguna**: Admin dapat memperbarui data pengguna seperti status dan peran.
* **Hapus Pengguna**: Admin dapat menghapus pengguna dari sistem.

### **6. Manajemen Reservasi**

Admin dapat mengelola reservasi melalui halaman **Reservasi**:

* **Tambah Reservasi**: Admin dapat menambah reservasi baru untuk tamu.
* **Lihat Reservasi**: Admin dapat melihat daftar semua reservasi yang telah dilakukan oleh pengguna.

### **7. Pembayaran**

Admin dapat mengelola dan memverifikasi pembayaran yang dilakukan oleh pengguna:

* **Verifikasi Pembayaran**: Admin dapat melihat daftar transaksi dan memverifikasi status pembayaran.
* **Riwayat Transaksi**: Admin dapat melihat riwayat semua pembayaran yang telah dilakukan oleh pengguna.

### **8. Pengaturan Sistem dan Harga**

Admin memiliki kontrol penuh terhadap pengaturan sistem hotel:

* **Kelola Peran dan Hak Akses**: Admin dapat menambah atau mengubah peran dan hak akses pengguna dalam sistem.
* **Pengaturan Harga Kamar dan Diskon**: Admin dapat mengupdate harga kamar dan pengaturan diskon.
* **Notifikasi Email/SMS**: Admin dapat mengonfigurasi pengaturan notifikasi melalui email atau SMS.
* **Ulasan Tamu**: Admin dapat melihat dan mengelola ulasan yang diberikan oleh tamu hotel.

### **9. Notifikasi dan Log**

Admin dapat melihat **Notifikasi** dan riwayat **Log**:

* **Notifikasi**: Admin dapat melihat notifikasi terkait dengan pemesanan baru, pembayaran, dan perubahan status.
* **Riwayat Log**: Admin dapat melihat riwayat log aktivitas pengguna dan admin dalam sistem.

### **10. Keluar (Logout)**

Tombol **Keluar** (Logout) tersedia di setiap halaman untuk memungkinkan pengguna atau admin keluar dari sistem dengan aman.

---

## **Teknologi yang Digunakan**

**HotelKu** dibangun menggunakan berbagai teknologi yang memungkinkan performa optimal dan pengalaman pengguna yang lancar:

* **Frontend**:

  * **HTML5** dan **CSS3** untuk struktur dan desain halaman.
  * **JavaScript** (Vanilla JS) untuk interaktivitas dan manipulasi DOM.

* **Backend**:

  * **Node.js**: Untuk menjalankan server dan pengelolaan API.
  * **Express.js**: Framework untuk manajemen routing dan middleware.
  * **Passport.js**: Untuk autentikasi pengguna.

* **Database**:

  * **MongoDB** untuk penyimpanan data pengguna, kamar, dan transaksi.

* **Keamanan**:

  * **HTTPS** untuk komunikasi yang aman.
  * **Password Hashing** untuk penyimpanan password pengguna dengan aman.

---

## **Struktur Proyek**

* **HTML**: Untuk membuat struktur halaman web utama (login, signup, dashboard pengguna/admin, dll).
* **CSS**: File untuk desain dan responsivitas halaman.
* **JavaScript**: Untuk interaksi dinamis di frontend (validasi form, pengelolaan sesi, dll).
* **Node.js** / **Express.js**: Backend untuk pengelolaan data, autentikasi, dan komunikasi dengan database.

---

## **Pengaturan dan Instalasi**

### **1. Clone Repository**

Clone repositori menggunakan Git:

```bash
git clone <repository_url>
```

### **2. Install Dependencies**

Setelah meng-clone repositori, install semua dependensi:

```bash
npm install
```

### **3. Setup Database**

* **MySQL**: Instal MySQL dan buat database sesuai dengan skema yang disediakan.
* **MongoDB**: Jika menggunakan MongoDB, pastikan server MongoDB berjalan dan konfigurasi sesuai dengan kebutuhan aplikasi.

### **4. Jalankan Aplikasi**

Jalankan server aplikasi dengan perintah:

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`.

---

## **Alur Pengguna**

1. **Pengguna Baru**: Pengguna yang belum memiliki akun dapat mendaftar melalui halaman **Signup**.
2. **Pengguna Lama**: Pengguna yang sudah terdaftar dapat langsung login melalui halaman **Login**.
3. **Reservasi Kamar**: Pengguna dapat memilih kamar yang tersedia dan melanjutkan ke halaman pembayaran.
4. **Pembayaran**: Pengguna melakukan pembayaran setelah memilih kamar.
5. **Dashboard Pengguna**: Pengguna dapat memantau status reservasi dan memperbarui profil mereka.

## **Alur Admin**

1. **Login Admin**: Admin login untuk mengakses dashboard admin dan mengelola hotel.
2. **Manajemen Pengguna**: Admin mengelola data pengguna, kamar, dan transaksi.
3. **Manajemen Reservasi dan Pembayaran**: Admin dapat melihat dan memverifikasi reservasi dan pembayaran.
4. **Pengaturan Sistem**: Admin dapat mengelola peran pengguna, harga kamar, dan pengaturan sistem.

---

## **Lisensi**

Proyek ini dilisensikan di bawah **MIT License**. Silakan lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.

---

**HotelKu** adalah solusi praktis dan efisien untuk mengelola operasi hotel secara digital, dengan memberikan kontrol penuh bagi admin dan pengalaman pengguna yang nyaman. Jika ada pertanyaan atau perubahan yang diperlukan, jangan ragu untuk menghubungi pengembang aplikasi ini.
