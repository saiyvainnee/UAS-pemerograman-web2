CREATE DATABASE IF NOT EXISTS lab_ci4;
USE lab_ci4;

DROP TABLE IF EXISTS artikel;
DROP TABLE IF EXISTS kategori;
DROP TABLE IF EXISTS user;

CREATE TABLE kategori (
  id_kategori INT(11) AUTO_INCREMENT,
  nama_kategori VARCHAR(100) NOT NULL,
  slug_kategori VARCHAR(100),
  PRIMARY KEY (id_kategori)
);

CREATE TABLE artikel (
  id INT(11) AUTO_INCREMENT,
  judul VARCHAR(200) NOT NULL,
  isi TEXT,
  gambar VARCHAR(200),
  status TINYINT(1) DEFAULT 0,
  slug VARCHAR(200),
  id_kategori INT(11),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT fk_kategori_artikel FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE user (
  id INT(11) AUTO_INCREMENT,
  username VARCHAR(200) NOT NULL,
  useremail VARCHAR(200),
  userpassword VARCHAR(200),
  PRIMARY KEY(id)
);

INSERT INTO kategori (nama_kategori, slug_kategori) VALUES
('Teknologi', 'teknologi'),
('Pendidikan', 'pendidikan'),
('Berita', 'berita');

INSERT INTO artikel (judul, isi, gambar, status, slug, id_kategori) VALUES
('Artikel pertama', 'Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf.', 'default.png', 1, 'artikel-pertama', 1),
('Artikel kedua', 'Artikel ini digunakan untuk pengujian CRUD, pagination, search, AJAX, dan API.', 'default.png', 1, 'artikel-kedua', 2),
('Artikel ketiga', 'Data contoh kategori berita untuk relasi tabel dan query builder CodeIgniter 4.', 'default.png', 0, 'artikel-ketiga', 3);

INSERT INTO user (username, useremail, userpassword) VALUES
('admin', 'admin@email.com', '$2y$10$wJXMsjwrmRlLrAGsL3wTAu5lC3ki1j5mYUWgGGRouacwfx33LUEnq');
-- Password admin: admin123
