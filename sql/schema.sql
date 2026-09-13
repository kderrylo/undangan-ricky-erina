-- ============================================================
-- Skema database undangan Paulus & Erina
-- Target: MySQL 8.x (Aiven for MySQL)
--
-- Cara pakai:
--   1. Buka DBeaver / mysql client, koneksikan ke service Aiven kamu.
--   2. Jalankan file ini satu kali di database yang sudah dibuat.
--   3. Buat admin pertama lewat endpoint /api/admin/setup (lihat README-ADMIN.md)
--      atau insert manual dengan password yang sudah di-hash bcrypt.
-- ============================================================

CREATE TABLE IF NOT EXISTS admins (
  id          VARCHAR(36)  NOT NULL PRIMARY KEY,
  username    VARCHAR(50)  NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,           -- hash bcrypt, JANGAN simpan plain text
  name        VARCHAR(100) NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS guests (
  id             VARCHAR(36)  NOT NULL PRIMARY KEY,
  slug           VARCHAR(120) NOT NULL UNIQUE,   -- dipakai di URL: /?to=<slug>
  name           VARCHAR(150) NOT NULL,
  phone          VARCHAR(30)  NULL,
  category       VARCHAR(50)  NOT NULL DEFAULT 'Umum',   -- Keluarga, Teman, Kantor, dst.
  invited_count  INT          NOT NULL DEFAULT 1,        -- jumlah org yang diundang dlm 1 slug
  notes          VARCHAR(255) NULL,
  is_sent        TINYINT(1)   NOT NULL DEFAULT 0,        -- sudah dikirimi link undangan?
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_guests_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS rsvp (
  id             VARCHAR(36)  NOT NULL PRIMARY KEY,
  guest_id       VARCHAR(36)  NULL,              -- terisi jika tamu mengisi lewat link personal
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

-- Tabel serbaguna untuk pengaturan yang bisa diedit lewat dashboard di
-- kemudian hari (contoh: toggle musik autoplay, nomor rekening, dsb.)
-- tanpa perlu redeploy. Opsional untuk dipakai sekarang.
CREATE TABLE IF NOT EXISTS settings (
  `key`       VARCHAR(80)  NOT NULL PRIMARY KEY,
  `value`     TEXT         NULL,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
