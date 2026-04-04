const db = require('../config/db');

const MovieModel = {
  async getFeatured() {
    const [rows] = await db.query(
      'SELECT id, title, genres, rating, poster_url, banner_url, trailer_url FROM movies WHERE is_featured = TRUE ORDER BY created_at DESC'
    );
    return rows.map(r => ({ ...r, genres: typeof r.genres === 'string' ? JSON.parse(r.genres) : r.genres }));
  },

  async getByStatus(status, type) {
    let query = 'SELECT id, title, genres, poster_url, price, rating FROM movies WHERE status = ?';
    const params = [status];
    if (type && type !== 'all') {
      query += ' AND JSON_CONTAINS(genres, ?, \'$\')';
      params.push(JSON.stringify(type.charAt(0).toUpperCase() + type.slice(1)));
    }
    query += ' ORDER BY created_at DESC';
    const [rows] = await db.query(query, params);
    return rows.map(r => ({ ...r, genres: typeof r.genres === 'string' ? JSON.parse(r.genres) : r.genres }));
  },

  async getTrending() {
    const [rows] = await db.query(
      'SELECT id, title, genres, duration, thumbnail_url, poster_url, trend FROM movies WHERE is_trending = TRUE ORDER BY rating DESC LIMIT 5'
    );
    return rows.map(r => ({ ...r, genres: typeof r.genres === 'string' ? JSON.parse(r.genres) : r.genres }));
  },

  async getById(id) {
    const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [id]);
    if (!rows[0]) return null;
    const m = rows[0];
    m.genres = typeof m.genres === 'string' ? JSON.parse(m.genres) : m.genres;
    m.cast = typeof m.cast_members === 'string' ? JSON.parse(m.cast_members) : m.cast_members;
    return m;
  },

  async getBySlug(slug) {
    const [rows] = await db.query('SELECT * FROM movies WHERE slug = ?', [slug]);
    if (!rows[0]) return null;
    const m = rows[0];
    m.genres = typeof m.genres === 'string' ? JSON.parse(m.genres) : m.genres;
    m.cast = typeof m.cast_members === 'string' ? JSON.parse(m.cast_members) : m.cast_members;
    return m;
  },

  async getShows(movieId, date) {
    const [rows] = await db.query(
      `SELECT s.id as show_id, s.show_time as time, s.format, s.price_standard as price,
              s.status, s.available_seats,
              v.id as venue_id, v.name as venue_name, v.address as venue_address
       FROM shows s
       JOIN venues v ON s.venue_id = v.id
       WHERE s.movie_id = ? AND s.show_date = ?
       ORDER BY v.name, s.show_time`,
      [movieId, date]
    );

    // Group by venue
    const venueMap = {};
    for (const row of rows) {
      if (!venueMap[row.venue_id]) {
        venueMap[row.venue_id] = {
          venue_id: row.venue_id,
          venue_name: row.venue_name,
          venue_address: row.venue_address,
          showtimes: []
        };
      }
      venueMap[row.venue_id].showtimes.push({
        show_id: row.show_id,
        time: row.time,
        format: row.format,
        price: row.price,
        status: row.status,
        available_seats: row.available_seats
      });
    }
    return Object.values(venueMap);
  },

  async getReviews(movieId) {
    const [avgRows] = await db.query(
      'SELECT AVG(rating) as avg_rating FROM reviews WHERE movie_id = ?', [movieId]
    );
    const [reviews] = await db.query(
      `SELECT r.id, r.rating, r.comment, r.created_at,
              u.name as user_name, u.avatar_url as user_avatar
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.movie_id = ?
       ORDER BY r.created_at DESC
       LIMIT 20`,
      [movieId]
    );
    return {
      avg_rating: avgRows[0].avg_rating || 0,
      reviews
    };
  },

  async count() {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM movies WHERE status = \'now_showing\'');
    return rows[0].total;
  }
};

module.exports = MovieModel;
