-- ============================================================
-- SEED untuk undangan Paulus & Erina
--
-- File ini = sql/schema.sql (bikin semua tabel) + 1 admin akun
-- yang sudah jadi, supaya kamu bisa langsung login ke /admin
-- tanpa perlu curl ke endpoint /api/admin/setup.
--
-- Cara pakai di DBeaver:
--   1. Buka SQL Editor baru di koneksi Aiven kamu.
--   2. Tempel seluruh isi file ini, lalu Execute Script (bukan cuma
--      Execute Statement, supaya semua CREATE TABLE ikut jalan).
--   3. Login ke /admin dengan kredensial di bagian paling bawah file ini.
--   4. SEGERA ganti password lewat query UPDATE di bagian paling bawah
--      (isi dengan hash bcrypt password barumu — lihat catatan di sana).
-- ============================================================

CREATE TABLE IF NOT EXISTS admins (
  id          VARCHAR(36)  NOT NULL PRIMARY KEY,
  username    VARCHAR(50)  NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  name        VARCHAR(100) NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS guests (
  id             VARCHAR(36)  NOT NULL PRIMARY KEY,
  slug           VARCHAR(120) NOT NULL UNIQUE,
  name           VARCHAR(150) NOT NULL,
  phone          VARCHAR(30)  NULL,
  category       VARCHAR(50)  NOT NULL DEFAULT 'Umum',
  invited_count  INT          NOT NULL DEFAULT 1,
  notes          VARCHAR(255) NULL,
  is_sent        TINYINT(1)   NOT NULL DEFAULT 0,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_guests_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS rsvp (
  id             VARCHAR(36)  NOT NULL PRIMARY KEY,
  guest_id       VARCHAR(36)  NULL,
  guest_slug     VARCHAR(120) NULL,
  name           VARCHAR(60)  NOT NULL,
  message        VARCHAR(500) NOT NULL,
  attendance     ENUM('hadir', 'tidak_hadir') NOT NULL,
  attendee_count INT          NOT NULL DEFAULT 1,
  is_pinned      TINYINT(1)   NOT NULL DEFAULT 0,
  ip_address     VARCHAR(64)  NULL,
  user_agent     VARCHAR(255) NULL,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rsvp_created_at (created_at),
  INDEX idx_rsvp_attendance (attendance),
  CONSTRAINT fk_rsvp_guest FOREIGN KEY (guest_id) REFERENCES guests(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS settings (
  `key`       VARCHAR(80)  NOT NULL PRIMARY KEY,
  `value`     TEXT         NULL,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Akun admin pertama untuk Paulus & Erina.
-- Password di bawah SUDAH di-hash dengan bcrypt (bukan plain text).
--
--   username : paulus-erina
--   password : PaulusErina2026!
--
-- GANTI PASSWORD INI setelah login pertama kali! Caranya:
--   1. Buat hash baru: jalankan `node -e "console.log(require('bcryptjs').hashSync('PASSWORD_BARUMU', 10))"`
--      di folder project (butuh sudah `npm install`).
--   2. Jalankan query:
--      UPDATE admins SET password = '<hash-baru>' WHERE username = 'paulus-erina';
-- ------------------------------------------------------------
INSERT INTO admins (id, username, password, name)
VALUES (
  '0241e9c4-4885-4560-8ea9-07f81654d253',
  'paulus-erina',
  '$2b$10$d/fAba3V/Nma4wvD246lqOKjUsFLf6QhXfX.xC0SAiMZXKT54/n8O',
  'Paulus & Erina'
)
ON DUPLICATE KEY UPDATE username = username; -- aman dijalankan berkali-kali, tidak akan menimpa data yang sudah ada
