-- ============================================
-- CineBook Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS cinebook;
USE cinebook;

-- ── Users ────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  avatar_url VARCHAR(500),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Movies ───────────────────────────────
CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  poster_url VARCHAR(500),
  banner_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  synopsis TEXT,
  director VARCHAR(255),
  cast_members JSON,
  duration VARCHAR(30),
  language VARCHAR(50),
  rating DECIMAL(2,1) DEFAULT 0.0,
  genres JSON,
  trailer_url VARCHAR(500),
  format VARCHAR(30) DEFAULT 'Standard',
  status ENUM('now_showing', 'coming_soon') DEFAULT 'now_showing',
  is_featured BOOLEAN DEFAULT FALSE,
  is_trending BOOLEAN DEFAULT FALSE,
  trend VARCHAR(10) DEFAULT 'flat',
  price DECIMAL(10,2) DEFAULT 300.00,
  release_date VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Venues ───────────────────────────────
CREATE TABLE IF NOT EXISTS venues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  address VARCHAR(500),
  screens INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Shows ────────────────────────────────
CREATE TABLE IF NOT EXISTS shows (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT NOT NULL,
  venue_id INT NOT NULL,
  screen VARCHAR(50),
  show_date DATE NOT NULL,
  show_time VARCHAR(10) NOT NULL,
  format VARCHAR(20) DEFAULT '2D',
  total_seats INT DEFAULT 200,
  available_seats INT DEFAULT 200,
  price_standard DECIMAL(10,2) DEFAULT 300.00,
  price_vip DECIMAL(10,2) DEFAULT 500.00,
  price_economy DECIMAL(10,2) DEFAULT 200.00,
  status ENUM('available', 'filling_fast', 'sold_out') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- ── Seats ────────────────────────────────
CREATE TABLE IF NOT EXISTS seats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  show_id INT NOT NULL,
  seat_label VARCHAR(10) NOT NULL,
  row_label CHAR(1) NOT NULL,
  seat_number INT NOT NULL,
  tier ENUM('standard', 'vip', 'economy') DEFAULT 'standard',
  status ENUM('available', 'booked', 'blocked') DEFAULT 'available',
  price DECIMAL(10,2) DEFAULT 300.00,
  FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE,
  UNIQUE KEY unique_seat (show_id, seat_label)
);

-- ── Bookings ─────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_ref VARCHAR(20) UNIQUE,
  user_id INT NOT NULL,
  show_id INT NOT NULL,
  movie_id INT,
  seats JSON NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) DEFAULT 0,
  service_fee DECIMAL(10,2) DEFAULT 50.00,
  taxes DECIMAL(10,2) DEFAULT 0,
  status ENUM('confirmed', 'pending', 'cancelled', 'refunded') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE
);

-- ── Payments ─────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  method VARCHAR(50),
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('success', 'failed', 'pending') DEFAULT 'pending',
  transaction_id VARCHAR(100),
  card_last4 VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- ── Reviews ──────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Events ───────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  banner_url VARCHAR(500),
  event_date DATE,
  time VARCHAR(20),
  venue VARCHAR(255),
  price DECIMAL(10,2) DEFAULT 0,
  description TEXT,
  status ENUM('upcoming', 'ongoing', 'past') DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Wishlist ─────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  UNIQUE KEY unique_wishlist (user_id, movie_id)
);
