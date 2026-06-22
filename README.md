# UAS-pemerograman-web2

# Struktur Repository

Repository ini disusun menggunakan konsep **Decoupled Architecture**, yaitu memisahkan Backend dan Frontend menjadi dua bagian yang berbeda.

## 📁 backend-api

Folder ini berisi seluruh source code aplikasi Backend yang dibangun menggunakan Framework **CodeIgniter 4**.

Fungsi utama:

* Menyediakan REST API
* Mengelola koneksi database MySQL
* Menangani proses CRUD data
* Menangani autentikasi pengguna
* Mengelola model, controller, dan filter aplikasi

Struktur utama:

```text
backend-api/
├── app/
├── public/
├── writable/
├── vendor/
├── composer.json
└── spark
```

---

## 📁 frontend-spa

Folder ini berisi seluruh source code Frontend yang dibangun menggunakan **VueJS 3**, **Vue Router**, dan **Axios**.

Fungsi utama:

* Menampilkan antarmuka pengguna (UI)
* Menangani navigasi Single Page Application (SPA)
* Mengakses REST API melalui Axios
* Menampilkan data secara realtime

Struktur utama:

```text
frontend-spa/
├── index.html
├── assets/
│   ├── css/
│   └── js/
│       ├── app.js
│       └── components/
│           ├── Home.js
│           ├── Login.js
│           ├── Dashboard.js
│           ├── Artikel.js
│           └── About.js
```

---

## 📁 database

Folder ini berisi file export database MySQL yang digunakan dalam aplikasi.

```text
database/
└── lab_ci4.sql
```

---

## 📁 screenshots

Folder ini berisi dokumentasi hasil implementasi aplikasi.

Dokumentasi yang disertakan:

* Halaman Login
* Dashboard
* Kelola Artikel
* Form Tambah Artikel
* Search Artikel
* Relasi Database
* Pengujian API

```text
screenshots/
├── login.png
├── dashboard.png
├── artikel.png
├── tambah-artikel.png
├── search.png
├── database-relasi.png
└── postman-401.png
```
