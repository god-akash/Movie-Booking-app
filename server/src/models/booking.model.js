const db = require('../config/db');

const BookingModel = {
  async create({ userId, showId, movieId, seats, subtotal, serviceFee, taxes, totalAmount, status = 'pending' }) {
    const bookingRef = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const [result] = await db.query(
      `INSERT INTO bookings (booking_ref, user_id, show_id, movie_id, seats, subtotal, service_fee, taxes, total_amount, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [bookingRef, userId, showId, movieId, JSON.stringify(seats), subtotal, serviceFee, taxes, totalAmount, status]
    );
    return { id: result.insertId, bookingId: bookingRef, bookingRef };
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ? OR booking_ref = ?', [id, id]);
    if (!rows[0]) return null;
    const b = rows[0];
    b.seats = typeof b.seats === 'string' ? JSON.parse(b.seats) : b.seats;
    return b;
  },

  async getUserBookings(userId, status) {
    let query = `
      SELECT b.booking_ref as booking_id, b.seats, b.total_amount as amount, b.status, b.created_at,
             m.title as movie_title, m.poster_url, m.id as movie_id,
             m.genres as genre,
             v.name as venue, s.show_date as date, s.show_time as time, s.format
      FROM bookings b
      JOIN shows s ON b.show_id = s.id
      JOIN movies m ON s.movie_id = m.id
      JOIN venues v ON s.venue_id = v.id
      WHERE b.user_id = ?`;
    const params = [userId];

    if (status === 'upcoming') {
      query += ` AND (s.show_date > CURDATE() OR (s.show_date = CURDATE() AND s.show_time > CURTIME())) AND b.status != 'cancelled'`;
    } else if (status === 'past') {
      query += ` AND (s.show_date < CURDATE() OR (s.show_date = CURDATE() AND s.show_time <= CURTIME()) OR b.status = 'cancelled')`;
    }

    query += ' ORDER BY s.show_date DESC, s.show_time DESC';

    const [rows] = await db.query(query, params);
    return rows.map(r => {
      r.seats = typeof r.seats === 'string' ? JSON.parse(r.seats) : r.seats;
      r.genre = typeof r.genre === 'string' ? JSON.parse(r.genre) : r.genre;
      if (Array.isArray(r.genre)) r.genre = r.genre.join(', ');
      if (status === 'past' && r.status === 'confirmed') r.status = 'watched';
      return r;
    });
  },

  async cancelBooking(bookingRef, userId) {
    const [result] = await db.query(
      `UPDATE bookings SET status = 'cancelled' WHERE (booking_ref = ? OR id = ?) AND user_id = ? AND status != 'cancelled'`,
      [bookingRef, bookingRef, userId]
    );
    return result.affectedRows > 0;
  },

  async getBookingSummary(showId, seats) {
    const [showRows] = await db.query(
      `SELECT s.*, m.title as movie_title, m.banner_url as movie_banner,
              v.name as venue_name, s.format
       FROM shows s
       JOIN movies m ON s.movie_id = m.id
       JOIN venues v ON s.venue_id = v.id
       WHERE s.id = ?`, [showId]
    );
    if (!showRows[0]) return null;
    const show = showRows[0];
    const seatArr = typeof seats === 'string' ? seats.split(',') : seats;
    const seatCount = seatArr.length;
    const ticketPrice = seatCount * show.price_standard;
    const convenienceFee = 50;
    const taxes = Math.round(ticketPrice * 0.05);
    return {
      movie_title: show.movie_title,
      movie_banner: show.movie_banner,
      venue_name: show.venue_name,
      format: show.format,
      date: show.show_date,
      time: show.show_time,
      seats: seatArr,
      seat_count: seatCount,
      ticket_price: ticketPrice,
      convenience_fee: convenienceFee,
      taxes,
      total: ticketPrice + convenienceFee + taxes
    };
  },

  async getAllBookings() {
    const [rows] = await db.query(
      `SELECT b.*, u.name as user_name, u.email as user_email,
              m.title as movie_title, v.name as venue_name
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN shows s ON b.show_id = s.id
       JOIN movies m ON s.movie_id = m.id
       JOIN venues v ON s.venue_id = v.id
       ORDER BY b.created_at DESC`
    );
    return rows.map(r => {
      r.seats = typeof r.seats === 'string' ? JSON.parse(r.seats) : r.seats;
      return r;
    });
  },

  async countToday() {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM bookings WHERE DATE(created_at) = CURDATE()');
    return rows[0].total;
  },

  async revenueTotal() {
    const [rows] = await db.query(
      `SELECT COALESCE(SUM(total_amount), 0) as total FROM bookings WHERE status = 'confirmed'`
    );
    return rows[0].total;
  }
};

module.exports = BookingModel;
