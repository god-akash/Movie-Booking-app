-- ============================================
-- CineBook Seed Data
-- ============================================
USE cinebook;

-- ── Admin user (password: admin123) ──────
INSERT INTO users (name, email, phone, password, role) VALUES
('Cinema Admin', 'admin@cinebook.com', '+91-9876543210', '$2a$10$kIGx8fYFpKrY2zqOjZZKZeZlMVE5XJKH1n5Vv7yWG0VvXOZQXqWG', 'admin'),
('Rahul Kapoor', 'rahul@mail.com', '+91-9876543211', '$2a$10$kIGx8fYFpKrY2zqOjZZKZeZlMVE5XJKH1n5Vv7yWG0VvXOZQXqWG', 'user'),
('Ananya Sharma', 'ananya@mail.com', '+91-9876543212', '$2a$10$kIGx8fYFpKrY2zqOjZZKZeZlMVE5XJKH1n5Vv7yWG0VvXOZQXqWG', 'user'),
('Vikram Mehra', 'vikram@mail.com', '+91-9876543213', '$2a$10$kIGx8fYFpKrY2zqOjZZKZeZlMVE5XJKH1n5Vv7yWG0VvXOZQXqWG', 'user');

-- ── Venues ───────────────────────────────
INSERT INTO venues (name, location, address, screens) VALUES
('PVR Cinema', 'Mumbai', 'Phoenix Mall, Lower Parel', 6),
('INOX Multiplex', 'Delhi', 'Select Citywalk, Saket', 5),
('Cinepolis', 'Bangalore', 'Orion Mall, Malleshwaram', 4),
('PVR ICON', 'Hyderabad', 'GVK One Mall, Banjara Hills', 5),
('Carnival Cinemas', 'Pune', 'Amanora Town Centre', 3);

-- ── Movies ───────────────────────────────
INSERT INTO movies (title, slug, poster_url, banner_url, thumbnail_url, synopsis, director, cast_members, duration, language, rating, genres, trailer_url, format, status, is_featured, is_trending, trend, price, release_date) VALUES
(
  'Kalki 2898-AD',
  'kalki-2898-ad',
  'https://image.tmdb.org/t/p/w500/kN13vbSmNMKxP2TFHFQwtcpIepr.jpg',
  'https://image.tmdb.org/t/p/original/kN13vbSmNMKxP2TFHFQwtcpIepr.jpg',
  'https://image.tmdb.org/t/p/w300/kN13vbSmNMKxP2TFHFQwtcpIepr.jpg',
  'In the post-apocalyptic year 2898 AD, the world is divided between the prosperous city of Kasi and the oppressed Complex. When a pregnant woman becomes the target of Supreme Yaskin, the bounty hunter Bhairava must choose between an astronomical reward and protecting humanity''s last hope.',
  'Nag Ashwin',
  '["Prabhas","Deepika Padukone","Amitabh Bachchan","Kamal Haasan","Disha Patani"]',
  '2h 41min', 'Hindi', 4.2,
  '["Action","Sci-Fi","Thriller"]',
  'https://youtube.com/watch?v=example1',
  'IMAX', 'now_showing', TRUE, TRUE, 'top', 450.00, 'June 27, 2024'
),
(
  'Oppenheimer',
  'oppenheimer',
  'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  'https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
  'Christopher Nolan',
  '["Cillian Murphy","Emily Blunt","Robert Downey Jr.","Matt Damon","Florence Pugh"]',
  '3h 0min', 'English', 4.5,
  '["Drama","History","Thriller"]',
  'https://youtube.com/watch?v=example2',
  'IMAX', 'now_showing', TRUE, TRUE, 'up', 500.00, 'July 21, 2023'
),
(
  'Jawan',
  'jawan',
  'https://image.tmdb.org/t/p/w500/jBIPYJpVdcTaIgj5fVAPZpy3HZR.jpg',
  'https://image.tmdb.org/t/p/original/jBIPYJpVdcTaIgj5fVAPZpy3HZR.jpg',
  'https://image.tmdb.org/t/p/w300/jBIPYJpVdcTaIgj5fVAPZpy3HZR.jpg',
  'A high-octane action-thriller starring Shah Rukh Khan in a dual role as a jailer and a vigilante fighting against societal injustice.',
  'Atlee',
  '["Shah Rukh Khan","Nayanthara","Vijay Sethupathi","Deepika Padukone"]',
  '2h 49min', 'Hindi', 4.0,
  '["Action","Drama","Thriller"]',
  'https://youtube.com/watch?v=example3',
  '2D', 'now_showing', TRUE, FALSE, 'up', 350.00, 'Sep 7, 2023'
),
(
  'Animal',
  'animal',
  'https://image.tmdb.org/t/p/w500/hr9rjFhOaaAuiQPCnOJmZVsExKh.jpg',
  'https://image.tmdb.org/t/p/original/hr9rjFhOaaAuiQPCnOJmZVsExKh.jpg',
  'https://image.tmdb.org/t/p/w300/hr9rjFhOaaAuiQPCnOJmZVsExKh.jpg',
  'The story of a man''s unwavering devotion to his father, exploring themes of love, betrayal, and family bonds in the darkest ways.',
  'Sandeep Reddy Vanga',
  '["Ranbir Kapoor","Anil Kapoor","Bobby Deol","Rashmika Mandanna"]',
  '3h 21min', 'Hindi', 3.8,
  '["Action","Crime","Drama"]',
  'https://youtube.com/watch?v=example4',
  '4DX', 'now_showing', FALSE, TRUE, 'flat', 400.00, 'Dec 1, 2023'
),
(
  'Interstellar: Re-release',
  'interstellar-rerelease',
  'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival. Now re-released in stunning IMAX.',
  'Christopher Nolan',
  '["Matthew McConaughey","Anne Hathaway","Jessica Chastain","Michael Caine"]',
  '2h 49min', 'English', 4.8,
  '["Sci-Fi","Adventure","Drama"]',
  'https://youtube.com/watch?v=example5',
  'IMAX', 'now_showing', FALSE, TRUE, 'up', 500.00, 'Nov 7, 2014'
),
(
  '12th Fail',
  '12th-fail',
  'https://image.tmdb.org/t/p/w500/tEpMrCilFYJfMSgNjL9fVZVqgHH.jpg',
  'https://image.tmdb.org/t/p/original/tEpMrCilFYJfMSgNjL9fVZVqgHH.jpg',
  'https://image.tmdb.org/t/p/w300/tEpMrCilFYJfMSgNjL9fVZVqgHH.jpg',
  'Based on a true story, a young man from a small village in Madhya Pradesh overcomes immense obstacles to crack the UPSC exam and become an IPS officer.',
  'Vidhu Vinod Chopra',
  '["Vikrant Massey","Medha Shankar","Anant Joshi"]',
  '2h 27min', 'Hindi', 4.6,
  '["Drama","Biography"]',
  'https://youtube.com/watch?v=example6',
  '2D', 'now_showing', FALSE, FALSE, 'up', 250.00, 'Oct 27, 2023'
);

-- ── Events ───────────────────────────────
INSERT INTO events (title, type, banner_url, event_date, time, venue, price, description, status) VALUES
('Lollapalooza India 2024', 'Concert', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', DATE_ADD(CURDATE(), INTERVAL 15 DAY), '16:00', 'Mahalaxmi Racecourse, Mumbai', 4500.00, 'The biggest international music festival is back in India. Featuring artists from around the world.', 'upcoming'),
('Stand-Up Comedy Night', 'Comedy', 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '20:00', 'Canvas Laugh Club, Mumbai', 999.00, 'A night of non-stop laughter with top Indian comedians.', 'upcoming'),
('Film Photography Workshop', 'Workshop', NULL, DATE_ADD(CURDATE(), INTERVAL 10 DAY), '10:00', 'Art District, Delhi', 1500.00, 'Learn the art of analog film photography from master photographers. Cameras and film rolls provided.', 'upcoming'),
('Indie Theatre Festival', 'Theatre', 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800', DATE_ADD(CURDATE(), INTERVAL 8 DAY), '19:00', 'Prithvi Theatre, Mumbai', 800.00, 'Three days of cutting-edge indie theatre performances.', 'upcoming'),
('IPL Finals 2024', 'Sports', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800', DATE_ADD(CURDATE(), INTERVAL 20 DAY), '19:30', 'Narendra Modi Stadium', 2500.00, 'Watch the IPL finals live at the world''s largest cricket stadium.', 'upcoming');

-- ── Shows (for today + 6 days) ───────────
INSERT INTO shows (movie_id, venue_id, screen, show_date, show_time, format, total_seats, available_seats, price_standard, price_vip, price_economy, status) VALUES
-- Kalki at PVR
(1, 1, 'Screen 1', CURDATE(), '10:30', 'IMAX', 200, 120, 350, 500, 200, 'available'),
(1, 1, 'Screen 1', CURDATE(), '14:00', 'IMAX', 200, 45, 350, 500, 200, 'filling_fast'),
(1, 1, 'Screen 1', CURDATE(), '18:30', 'IMAX', 200, 180, 350, 500, 200, 'available'),
(1, 1, 'Screen 1', CURDATE(), '21:45', 'IMAX', 200, 0, 350, 500, 200, 'sold_out'),
-- Kalki at INOX
(1, 2, 'Screen 3', CURDATE(), '11:00', '4DX', 150, 90, 400, 600, 250, 'available'),
(1, 2, 'Screen 3', CURDATE(), '15:30', '4DX', 150, 30, 400, 600, 250, 'filling_fast'),
(1, 2, 'Screen 3', CURDATE(), '20:00', '4DX', 150, 100, 400, 600, 250, 'available'),
-- Oppenheimer at PVR
(2, 1, 'Screen 4', CURDATE(), '09:30', 'IMAX', 200, 150, 300, 500, 200, 'available'),
(2, 1, 'Screen 4', CURDATE(), '13:00', 'IMAX', 200, 80, 300, 500, 200, 'available'),
(2, 1, 'Screen 4', CURDATE(), '17:30', 'IMAX', 200, 20, 300, 500, 200, 'filling_fast'),
-- Oppenheimer at Cinepolis
(2, 3, 'Screen 2', CURDATE(), '10:00', '2D', 180, 130, 250, 400, 180, 'available'),
(2, 3, 'Screen 2', CURDATE(), '14:30', '2D', 180, 100, 250, 400, 180, 'available'),
-- Jawan at PVR
(3, 1, 'Screen 2', CURDATE(), '11:00', '2D', 220, 160, 300, 450, 200, 'available'),
(3, 1, 'Screen 2', CURDATE(), '15:00', '2D', 220, 50, 300, 450, 200, 'filling_fast'),
(3, 1, 'Screen 2', CURDATE(), '19:00', '2D', 220, 200, 300, 450, 200, 'available'),
-- Animal at PVR ICON
(4, 4, 'Screen 5', CURDATE(), '12:00', '4DX', 160, 100, 400, 600, 250, 'available'),
(4, 4, 'Screen 5', CURDATE(), '16:30', '4DX', 160, 40, 400, 600, 250, 'filling_fast'),
(4, 4, 'Screen 5', CURDATE(), '21:00', '4DX', 160, 120, 400, 600, 250, 'available'),
-- Interstellar at INOX
(5, 2, 'Screen 1', CURDATE(), '10:00', 'IMAX', 200, 170, 350, 500, 200, 'available'),
(5, 2, 'Screen 1', CURDATE(), '14:00', 'IMAX', 200, 60, 350, 500, 200, 'filling_fast'),
(5, 2, 'Screen 1', CURDATE(), '18:30', 'IMAX', 200, 190, 350, 500, 200, 'available'),
-- 12th Fail at Carnival
(6, 5, 'Screen 1', CURDATE(), '11:30', '2D', 180, 140, 250, 400, 180, 'available'),
(6, 5, 'Screen 1', CURDATE(), '15:30', '2D', 180, 110, 250, 400, 180, 'available'),
(6, 5, 'Screen 1', CURDATE(), '19:30', '2D', 180, 90, 250, 400, 180, 'available');

-- Shows for tomorrow
INSERT INTO shows (movie_id, venue_id, screen, show_date, show_time, format, total_seats, available_seats, price_standard, price_vip, price_economy, status) VALUES
(1, 1, 'Screen 1', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:30', 'IMAX', 200, 200, 350, 500, 200, 'available'),
(1, 1, 'Screen 1', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '14:00', 'IMAX', 200, 200, 350, 500, 200, 'available'),
(1, 1, 'Screen 1', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '18:30', 'IMAX', 200, 200, 350, 500, 200, 'available'),
(2, 1, 'Screen 4', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:00', 'IMAX', 200, 200, 300, 500, 200, 'available'),
(2, 1, 'Screen 4', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '14:30', 'IMAX', 200, 200, 300, 500, 200, 'available'),
(3, 3, 'Screen 1', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '11:00', '2D', 220, 220, 300, 450, 200, 'available'),
(3, 3, 'Screen 1', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '16:00', '2D', 220, 220, 300, 450, 200, 'available'),
(5, 2, 'Screen 1', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:00', 'IMAX', 200, 200, 350, 500, 200, 'available'),
(5, 2, 'Screen 1', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '18:30', 'IMAX', 200, 200, 350, 500, 200, 'available');

-- ── Sample Seats for Show 1 (Kalki 10:30 IMAX) ──
INSERT INTO seats (show_id, seat_label, row_label, seat_number, tier, status, price) VALUES
-- VIP Row A (8 seats)
(1, 'A1', 'A', 1, 'vip', 'available', 500), (1, 'A2', 'A', 2, 'vip', 'booked', 500),
(1, 'A3', 'A', 3, 'vip', 'available', 500), (1, 'A4', 'A', 4, 'vip', 'available', 500),
(1, 'A5', 'A', 5, 'vip', 'booked', 500), (1, 'A6', 'A', 6, 'vip', 'available', 500),
(1, 'A7', 'A', 7, 'vip', 'available', 500), (1, 'A8', 'A', 8, 'vip', 'available', 500),
-- Standard Row B (8 seats)
(1, 'B1', 'B', 1, 'standard', 'booked', 300), (1, 'B2', 'B', 2, 'standard', 'booked', 300),
(1, 'B3', 'B', 3, 'standard', 'available', 300), (1, 'B4', 'B', 4, 'standard', 'available', 300),
(1, 'B5', 'B', 5, 'standard', 'available', 300), (1, 'B6', 'B', 6, 'standard', 'available', 300),
(1, 'B7', 'B', 7, 'standard', 'available', 300), (1, 'B8', 'B', 8, 'standard', 'available', 300),
-- Standard Row C (9 seats)
(1, 'C1', 'C', 1, 'standard', 'available', 300), (1, 'C2', 'C', 2, 'standard', 'available', 300),
(1, 'C3', 'C', 3, 'standard', 'booked', 300), (1, 'C4', 'C', 4, 'standard', 'available', 300),
(1, 'C5', 'C', 5, 'standard', 'available', 300), (1, 'C6', 'C', 6, 'standard', 'available', 300),
(1, 'C7', 'C', 7, 'standard', 'available', 300), (1, 'C8', 'C', 8, 'standard', 'booked', 300),
(1, 'C9', 'C', 9, 'standard', 'available', 300),
-- Standard Row D (8 seats)
(1, 'D1', 'D', 1, 'standard', 'available', 300), (1, 'D2', 'D', 2, 'standard', 'available', 300),
(1, 'D3', 'D', 3, 'standard', 'available', 300), (1, 'D4', 'D', 4, 'standard', 'available', 300),
(1, 'D5', 'D', 5, 'standard', 'available', 300), (1, 'D6', 'D', 6, 'standard', 'booked', 300),
(1, 'D7', 'D', 7, 'standard', 'booked', 300), (1, 'D8', 'D', 8, 'standard', 'available', 300),
-- Standard Row E (10 seats)
(1, 'E1', 'E', 1, 'standard', 'available', 300), (1, 'E2', 'E', 2, 'standard', 'available', 300),
(1, 'E3', 'E', 3, 'standard', 'available', 300), (1, 'E4', 'E', 4, 'standard', 'booked', 300),
(1, 'E5', 'E', 5, 'standard', 'available', 300), (1, 'E6', 'E', 6, 'standard', 'available', 300),
(1, 'E7', 'E', 7, 'standard', 'available', 300), (1, 'E8', 'E', 8, 'standard', 'available', 300),
(1, 'E9', 'E', 9, 'standard', 'booked', 300), (1, 'E10', 'E', 10, 'standard', 'available', 300),
-- Economy Row F (12 seats)
(1, 'F1', 'F', 1, 'economy', 'available', 200), (1, 'F2', 'F', 2, 'economy', 'available', 200),
(1, 'F3', 'F', 3, 'economy', 'booked', 200), (1, 'F4', 'F', 4, 'economy', 'booked', 200),
(1, 'F5', 'F', 5, 'economy', 'available', 200), (1, 'F6', 'F', 6, 'economy', 'available', 200),
(1, 'F7', 'F', 7, 'economy', 'available', 200), (1, 'F8', 'F', 8, 'economy', 'booked', 200),
(1, 'F9', 'F', 9, 'economy', 'booked', 200), (1, 'F10', 'F', 10, 'economy', 'available', 200),
(1, 'F11', 'F', 11, 'economy', 'available', 200), (1, 'F12', 'F', 12, 'economy', 'available', 200);

-- ── Reviews ──────────────────────────────
INSERT INTO reviews (movie_id, user_id, rating, comment, created_at) VALUES
(1, 2, 5, 'Absolutely mind-blowing! The VFX and world-building are on another level. Prabhas and Amitabh deliver stellar performances.', NOW() - INTERVAL 3 DAY),
(1, 3, 4, 'Great sci-fi experience. The second half is a bit long but the climax makes up for it. Must watch in IMAX!', NOW() - INTERVAL 2 DAY),
(2, 2, 5, 'A masterpiece by Christopher Nolan. Cillian Murphy is phenomenal as Oppenheimer. The courtroom scenes are gripping.', NOW() - INTERVAL 10 DAY),
(2, 4, 4, 'Brilliant filmmaking but very dialogue-heavy. The non-linear narrative can be confusing at times.', NOW() - INTERVAL 5 DAY),
(3, 3, 4, 'Shah Rukh Khan is back with a bang! Mass entertainer with a strong social message. Interval block is fire!', NOW() - INTERVAL 15 DAY),
(5, 2, 5, 'Watching Interstellar in IMAX again was a surreal experience. The docking scene still gives goosebumps. Timeless classic.', NOW() - INTERVAL 1 DAY),
(6, 4, 5, 'One of the most inspiring films ever made. Vikrant Massey deserves every award. Raw, real, and deeply moving.', NOW() - INTERVAL 7 DAY);

-- ── Sample Bookings ──────────────────────
INSERT INTO bookings (booking_ref, user_id, show_id, movie_id, seats, total_amount, subtotal, service_fee, taxes, status) VALUES
('BK-20241024-001', 2, 1, 1, '["A3","A4"]', 1100.00, 1000.00, 50.00, 50.00, 'confirmed'),
('BK-20241024-002', 3, 8, 2, '["B3","B4","B5"]', 1050.00, 900.00, 50.00, 100.00, 'confirmed'),
('BK-20241023-003', 4, 13, 3, '["C1"]', 350.00, 300.00, 50.00, 0.00, 'cancelled');

-- ── Wishlist ─────────────────────────────
INSERT INTO wishlist (user_id, movie_id) VALUES
(2, 4), (2, 5), (2, 6),
(3, 1), (3, 5);
