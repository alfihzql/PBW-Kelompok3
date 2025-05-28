# HotelKu - Sistem Manajemen Hotel

[![CODE](https://skillicons.dev/icons?i=html,css,js,mysql,mongodb,node,express)](https://skillicons.dev)

## 📄Deskripsi Proyek

**HotelKu** adalah sistem manajemen hotel berbasis web yang dirancang untuk memberikan solusi efektif dalam mengelola pengelolaan hotel, termasuk pemesanan kamar, pembayaran, dan manajemen pengguna. Aplikasi ini dibangun dengan tujuan untuk mempermudah pengelolaan hotel baik dari sisi pengguna (user) maupun administrator (admin).

Dengan antarmuka yang modern dan fungsional, **HotelKu** memungkinkan pengelolaan kamar dan reservasi dengan cepat dan efisien. Pengguna dapat melihat informasi kamar yang tersedia, membuat pemesanan, serta melakukan pembayaran, sedangkan admin memiliki kontrol penuh terhadap data pengguna, kamar, dan laporan aktivitas hotel.

## 🧩Fitur Utama Aplikasi

### 1. **Login dan Signup**

Fitur autentikasi memungkinkan pengguna baru untuk mendaftar dan pengguna lama untuk login ke dalam sistem. Pengguna yang telah login akan diarahkan ke dashboard mereka sesuai dengan peran mereka (admin atau user).

* **Login**: Pengguna dapat masuk dengan menggunakan email dan password yang terdaftar di sistem.
* **Signup**: Pengguna baru dapat membuat akun dengan mengisi data pribadi seperti nama, email, password, dan konfirmasi password.

### 2. **Manajemen Pengguna (CRUD Admin)**

Admin dapat mengelola data pengguna melalui dashboard admin dengan melakukan **Create, Read, Update, dan Delete** (CRUD) data pengguna.

* **Create**: Admin dapat menambah pengguna baru.
* **Read**: Admin dapat melihat daftar pengguna yang terdaftar.
* **Update**: Admin dapat memperbarui data pengguna, termasuk status dan peran pengguna.
* **Delete**: Admin dapat menghapus pengguna yang tidak aktif.

### 3. **Dashboard Pengguna**

Dashboard pengguna memungkinkan pengguna untuk melihat dan mengelola informasi mereka setelah login. Pengguna dapat melakukan pemesanan kamar, melihat status pemesanan, serta memperbarui informasi pribadi mereka.

* **Profil Pengguna**: Pengguna dapat melihat informasi profil mereka, seperti nama, email, dan password.
* **Reservasi Kamar**: Pengguna dapat melihat berbagai pilihan kamar yang tersedia di hotel dan melakukan pemesanan.
* **Pembayaran**: Pengguna dapat melanjutkan pembayaran untuk reservasi mereka melalui sistem yang aman.

### 4. **Dashboard Admin**

Dashboard admin memberikan kontrol penuh terhadap manajemen hotel, termasuk status kamar, aktivitas terbaru, dan reservasi aktif.

* **Status Kamar**: Admin dapat melihat status ketersediaan kamar (tersedia/terisi) dengan cepat.
* **Aktivitas Terbaru**: Admin dapat melihat aktivitas terbaru terkait dengan pemesanan dan perubahan yang dilakukan pengguna.
* **Reservasi Aktif**: Admin dapat memantau jumlah dan status reservasi yang ada, serta memproses atau mengonfirmasi pembayaran.

### 5. **Manajemen Kamar**

Admin dapat menambah, mengedit, dan menghapus data kamar di hotel sesuai dengan kategori, harga, dan status ketersediaannya.

* **Menambah Kamar**: Admin dapat menambah kamar baru dengan detail seperti tipe kamar, harga, dan fasilitas.
* **Mengedit Kamar**: Admin dapat mengedit informasi kamar, termasuk kapasitas dan status.
* **Menghapus Kamar**: Admin dapat menghapus kamar yang sudah tidak digunakan.

### 6. **Pembayaran**

Pengguna dapat melakukan pembayaran untuk reservasi kamar mereka. Admin dapat memantau status pembayaran yang dilakukan pengguna.

* **Pembayaran oleh Pengguna**: Pengguna dapat melanjutkan ke halaman pembayaran setelah memilih kamar.
* **Verifikasi Pembayaran oleh Admin**: Admin dapat memeriksa dan mengonfirmasi pembayaran yang telah dilakukan oleh pengguna.

## ⚙️Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan berbagai teknologi yang memungkinkan kinerja tinggi dan pengalaman pengguna yang lancar:

* **Frontend**:

  * **HTML5** dan **CSS3** untuk struktur halaman dan styling.
  * **JavaScript (Vanilla JS)** untuk interaktivitas dan manipulasi DOM.

* **Backend**:

  * **Node.js** sebagai runtime untuk menjalankan server.
  * **Express.js** sebagai framework untuk pengelolaan routing dan middleware.
  * **Passport.js** untuk autentikasi pengguna.

* **Database**:

  * **MySQL** atau **MongoDB** untuk penyimpanan data pengguna, kamar, dan transaksi.

* **Keamanan**:

  * **HTTPS** untuk komunikasi aman.
  * **Password Hashing** untuk penyimpanan password pengguna secara aman.

## 🔣Struktur Proyek

Proyek ini menggunakan struktur file standar yang memisahkan file HTML, CSS, dan JavaScript. Berikut adalah rincian file yang terdapat dalam sistem:

* **HTML**: File untuk struktur halaman web utama (login, signup, dashboard pengguna, dashboard admin, dll).
* **CSS**: File untuk styling halaman dan desain responsif.
* **JS**: Untuk interaksi dinamis di frontend, termasuk validasi form dan pengelolaan sesi.
* **Node.js/Express.js**: Backend untuk pengelolaan data pengguna, autentikasi, dan komunikasi dengan database.

## 🛠️Pengaturan dan Instalasi

Berikut adalah langkah-langkah untuk menjalankan aplikasi ini di komputer lokal Anda:

### 1. **Clone Repository**

Clone repositori ke komputer Anda:

```bash
git clone <repository_url>
```

### 2. **Install Dependencies**

Setelah meng-clone repositori, install dependensi yang dibutuhkan:

```bash
npm install
```

### 3. **Setup Database**

* Install dan konfigurasikan **MySQL** atau **MongoDB** sesuai pilihan database.
* Import skema database yang sesuai dari file yang disediakan, atau buat database berdasarkan struktur yang digunakan dalam aplikasi.

### 4. **Jalankan Aplikasi**

Setelah menginstal semua dependensi dan mengonfigurasi database, jalankan aplikasi dengan perintah berikut:

```bash
npm start
```

Aplikasi akan berjalan di:

```
http://localhost:3000
```

### 5. **Akses Aplikasi**

Buka browser Anda dan akses aplikasi di alamat yang tertera.

## 🧑‍💼Alur Pengguna

### 1. **Pengguna Baru**

Pengguna yang belum terdaftar dapat melakukan pendaftaran melalui halaman **Signup**. Setelah pendaftaran, mereka dapat login dan memulai penggunaan aplikasi.

### 2. **Pengguna Lama**

Pengguna yang sudah terdaftar dapat login dengan email dan password melalui halaman **Login**.

### 3. **Reservasi Kamar**

Pengguna dapat melihat kamar yang tersedia, melakukan pemesanan, dan melanjutkan ke halaman pembayaran setelah memilih kamar.

### 4. **Pembayaran**

Setelah memilih kamar, pengguna dapat melakukan pembayaran melalui berbagai metode yang disediakan oleh sistem.

### 5. **Dashboard Pengguna**

Pengguna dapat mengelola profil mereka setelah login di halaman **Dashboard**.

## 🧑‍🔧Alur Admin

### 1. **Login Admin**

Admin dapat login menggunakan kredensial admin dan mengakses dashboard admin yang mengatur seluruh sistem.

### 2. **Manajemen Pengguna**

Admin dapat menambah, mengubah, atau menghapus data pengguna melalui dashboard admin.

### 3. **Manajemen Kamar**

Admin dapat mengelola kamar hotel, termasuk menambah, mengedit, dan menghapus kamar.

### 4. **Pengelolaan Reservasi dan Pembayaran**

Admin dapat memantau status reservasi dan memverifikasi pembayaran yang dilakukan pengguna.
