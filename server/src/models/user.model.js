const db = require('../config/db');

const UserModel = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role, avatar_url, is_premium, created_at FROM users WHERE id = ?', [id]
    );
    return rows[0] || null;
  },

  async create({ name, email, phone, password, role = 'user' }) {
    const [result] = await db.query(
      'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, password, role]
    );
    return { id: result.insertId, name, email, phone, role };
  },

  async getStats(userId) {
    const [bookings] = await db.query(
      'SELECT COUNT(*) as total_bookings FROM bookings WHERE user_id = ?', [userId]
    );
    const [watched] = await db.query(
      `SELECT COUNT(*) as movies_watched FROM bookings
       WHERE user_id = ? AND status = 'confirmed'
       AND show_id IN (SELECT id FROM shows WHERE show_date < CURDATE())`, [userId]
    );
    const [saved] = await db.query(
      `SELECT COALESCE(SUM(service_fee), 0) as saved_amount
       FROM bookings WHERE user_id = ? AND status = 'confirmed'`, [userId]
    );
    return {
      total_bookings: bookings[0].total_bookings,
      movies_watched: watched[0].movies_watched,
      events_attended: 0,
      saved_amount: saved[0].saved_amount
    };
  },

  async count() {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM users');
    return rows[0].total;
  }
};

module.exports = UserModel;
