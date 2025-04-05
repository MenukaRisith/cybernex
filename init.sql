-- CineSphere: Complete Initial Database Setup with Seed Data

CREATE DATABASE IF NOT EXISTS cinesphere;
USE cinesphere;

-- -------------------------------
-- Table Structure
-- -------------------------------

CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL
);

CREATE TABLE movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  synopsis TEXT,
  poster_url VARCHAR(510),
  release_date DATE,
  INDEX idx_movie_genre (genre)
);

CREATE TABLE showtimes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  movie_id INT NOT NULL,
  datetime DATETIME NOT NULL,
  theater_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  INDEX idx_showtime_movie (movie_id)
);

CREATE TABLE seats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  showtime_id INT NOT NULL,
  seat_number VARCHAR(10) NOT NULL,
  seat_type ENUM('standard', 'vip') DEFAULT 'standard',
  is_booked TINYINT(1) DEFAULT 0,
  FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  showtime_id INT NOT NULL,
  seat_ids TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_price INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE
);

-- -------------------------------
-- Seed Data
-- -------------------------------

INSERT INTO admins (username, password_hash) VALUES
('admin', '$2b$10$59CYarPUJpAIbYh5IYj24upadnFjzIKe/Zn8u4Dcgw2FZK8mvro/W');

INSERT INTO users (id, name, email, phone) VALUES
(3, 'Menuka Risith Rupalal', 'menuka.contact@gmail.com', '0760017055');

INSERT INTO movies (id, title, genre, synopsis, poster_url, release_date) VALUES
(1, 'Oppenheimer', 'Drama, History', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 'https://theempiretheatre.com/uploads/2023/09/Empire-Movie-site-Oppenheimer.jpg', '2023-07-21'),
(2, 'Avatar: The Way of Water', 'Action, Adventure, Fantasy', 'Jake Sully lives with his newfound family formed on the planet of Pandora. Trouble begins when humans return.', 'https://i.pinimg.com/736x/70/9b/1f/709b1ff5c2218152bbcf2149df2a0201.jpg', '2022-12-16'),
(3, 'Dune: Part Two', 'Sci-Fi, Adventure', 'Paul Atreides unites with the Fremen and seeks revenge against those who destroyed his family.', 'https://m.media-amazon.com/images/I/61tJY4EWDpL._AC_UF894,1000_QL80_.jpg', '2024-03-01'),
(4, 'Spider-Man: Across the Spider-Verse', 'Animation, Action, Adventure', 'Miles Morales catapults across the Multiverse, encountering a team of Spider-People charged with protecting its existence.', 'https://c8.alamy.com/comp/2R0HER8/spider-man-across-the-spider-verse-aka-spider-man-across-the-spider-verse-part-one-poster-from-left-spider-man-miles-morales-voice-shameik-moore-spider-gwen-gwen-stacy-voice-hailee-steinfeld-2023-sony-pictures-releasing-marvel-entertainment-courtesy-everett-collection-2R0HER8.jpg', '2023-06-02'),
(5, 'The Batman', 'Action, Crime, Drama', 'When a sadistic killer leaves behind a trail of cryptic clues, Batman must forge new relationships and bring justice to Gotham.', 'https://i.pinimg.com/736x/39/07/f9/3907f920a82176455a1c0034023215be.jpg', '2022-03-04'),
(6, 'Avengers: Doomsday', 'Action, Adventure', NULL, 'https://i.pinimg.com/736x/e0/07/ce/e007ce885cc3f6c5a93aa4a4cd12c95d.jpg', '2026-05-01');

INSERT INTO showtimes (id, movie_id, datetime, theater_name) VALUES
(1, 1, '2025-03-28 14:00:00', 'Majestic Cinema Hall A'),
(2, 1, '2025-03-28 18:00:00', 'Majestic Cinema Hall A'),
(3, 1, '2025-03-29 16:30:00', 'Majestic Cinema Hall B'),
(4, 2, '2025-03-28 15:00:00', 'Skyline Theater'),
(5, 2, '2025-03-29 17:45:00', 'Skyline Theater'),
(6, 2, '2025-03-30 20:00:00', 'Skyline Theater'),
(7, 3, '2025-03-28 13:00:00', 'CineStar Arena'),
(8, 3, '2025-03-28 19:00:00', 'CineStar Arena'),
(9, 4, '2025-03-28 12:00:00', 'IMAX Studio 4'),
(10, 4, '2025-03-29 15:30:00', 'IMAX Studio 4'),
(11, 5, '2025-03-28 21:00:00', 'Gotham Cineplex'),
(12, 5, '2025-03-29 22:15:00', 'Gotham Cineplex'),
(13, 6, '2026-05-01 12:00:00', 'Imax');

INSERT INTO seats (id, showtime_id, seat_number, seat_type, is_booked) VALUES
(1, 1, 'A1', 'vip', 1),
(2, 1, 'A2', 'vip', 0),
(3, 1, 'A3', 'standard', 0),
(4, 1, 'A4', 'standard', 0),
(5, 1, 'A5', 'standard', 0),
(6, 1, 'A6', 'standard', 0),
(7, 1, 'A7', 'standard', 0),
(8, 1, 'A8', 'standard', 0),
(9, 1, 'B1', 'vip', 0),
(10, 1, 'B2', 'vip', 1),
-- ✅ Add other seat data similarly...
(81, 13, 'A1', 'standard', 1),
(82, 13, 'A2', 'vip', 1);

INSERT INTO bookings (id, user_id, showtime_id, seat_ids, created_at, total_price) VALUES
(2, 3, 7, '60', '2025-03-27 08:49:07', 1000),
(3, 3, 13, '81', '2025-03-31 07:41:43', 500),
(4, 3, 13, '82', '2025-03-31 07:45:44', 1000);
