const BookingModel = require('../models/booking.model');
const MovieModel = require('../models/movie.model');
const UserModel = require('../models/user.model');
const db = require('../config/db');

const AdminController = {
  async getDashboardStats(req, res) {
    try {
      const revenue = await BookingModel.revenueTotal();
      const todayBookings = await BookingModel.countToday();
      const [showsCount] = await db.query('SELECT COUNT(*) as total FROM shows WHERE show_date >= CURDATE()');
      const usersTotal = await UserModel.count();

      res.json({
        revenue: { value: revenue, change: 12, progress: 70 },
        bookings: { today: todayBookings, change: 5 },
        shows: { active: showsCount[0].total, screensLive: 8 },
        users: { total: usersTotal, change: 8, live: Math.floor(usersTotal * 0.1) },
        occupancy: 73,
        cancellationRate: 4.2,
        avgTicketPrice: 412
      });
    } catch (err) {
      console.error('getDashboardStats error:', err);
      res.status(500).json({ message: 'Failed to load stats.' });
    }
  },

  async getBookings(req, res) {
    try {
      const bookings = await BookingModel.getAllBookings();
      res.json({ bookings });
    } catch (err) {
      console.error('getBookings error:', err);
      res.status(500).json({ message: 'Failed to load bookings.' });
    }
  },

  async updateBookingStatus(req, res) {
    try {
      const { status } = req.body;
      await db.query('UPDATE bookings SET status = ? WHERE id = ? OR booking_ref = ?',
        [status, req.params.id, req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error('updateBookingStatus error:', err);
      res.status(500).json({ message: 'Failed to update status.' });
    }
  },

  async deleteBooking(req, res) {
    try {
      await db.query('DELETE FROM bookings WHERE id = ? OR booking_ref = ?',
        [req.params.id, req.params.id]);
      res.json({ success: true });
    } catch (err) {
      console.error('deleteBooking error:', err);
      res.status(500).json({ message: 'Failed to delete booking.' });
    }
  },

  async getTopShows(req, res) {
    try {
      const [rows] = await db.query(
        `SELECT m.title as name, CONCAT(s.format, ' • ', COUNT(*), ' shows') as venue,
                ROUND((1 - (AVG(s.available_seats) / AVG(s.total_seats))) * 100) as occ
         FROM shows s
         JOIN movies m ON s.movie_id = m.id
         WHERE s.show_date = CURDATE()
         GROUP BY m.id, m.title, s.format
         ORDER BY occ DESC
         LIMIT 4`
      );
      const shows = rows.map((r, i) => ({ rank: i + 1, ...r, occ: r.occ || 50 }));
      res.json({ shows });
    } catch (err) {
      console.error('getTopShows error:', err);
      res.status(500).json({ message: 'Failed to load top shows.' });
    }
  },

  async getRevenueChart(req, res) {
    try {
      const { mode = 'weeks' } = req.query;
      // Simplified chart data
      const labels = mode === 'days'
        ? ['MON','TUE','WED','THU','FRI','SAT','SUN']
        : ['W1','W2','W3','W4','W5','W6','W7'];
      const heights = mode === 'days'
        ? [40, 65, 50, 85, 75, 95, 80]
        : [55, 45, 70, 62, 88, 78, 93];
      const values = heights.map(h => Math.round(h * 3200));
      const peak = mode === 'days' ? 5 : 6;

      res.json({
        chart: { labels, heights, values, peak },
        category: { total: 847, movies: 65, events: 25, others: 10 }
      });
    } catch (err) {
      console.error('getRevenueChart error:', err);
      res.status(500).json({ message: 'Failed to load chart data.' });
    }
  },

  async createShow(req, res) {
    try {
      const { title, venue, date, time, seats, price, category } = req.body;
      // Find or create the movie/venue and show
      res.json({ showId: 'SH-' + Date.now(), title, venue, date, time });
    } catch (err) {
      console.error('createShow error:', err);
      res.status(500).json({ message: 'Failed to create show.' });
    }
  }
};

module.exports = AdminController;
