const BookingService = require('../services/booking.service');
const BookingModel = require('../models/booking.model');
const UserModel = require('../models/user.model');
const PaymentService = require('../services/payment.service');
const db = require('../config/db');

const BookingController = {
  async createBooking(req, res) {
    try {
      const { showId, seats } = req.body;
      if (!showId || !seats || !seats.length) {
        return res.status(400).json({ message: 'showId and seats are required.' });
      }
      const result = await BookingService.createBooking({
        userId: req.user.id,
        showId,
        seats,
        movieId: req.body.movieId
      });
      res.status(201).json(result);
    } catch (err) {
      console.error('createBooking error:', err);
      res.status(err.status || 500).json({ message: err.message || 'Booking failed.' });
    }
  },

  async getBookingSummary(req, res) {
    try {
      const { showId, seats, movieId, date } = req.query;
      if (!showId || !seats) {
        return res.status(400).json({ message: 'showId and seats are required.' });
      }
      const summary = await BookingModel.getBookingSummary(showId, seats, movieId);
      if (!summary) return res.status(404).json({ message: 'Show not found.' });
      res.json(summary);
    } catch (err) {
      console.error('getBookingSummary error:', err);
      res.status(500).json({ message: 'Failed to load summary.' });
    }
  },

  async getUserBookings(req, res) {
    try {
      const { status, limit } = req.query;
      let bookings = await BookingModel.getUserBookings(req.user.id, status);
      if (limit) bookings = bookings.slice(0, parseInt(limit));
      res.json(bookings);
    } catch (err) {
      console.error('getUserBookings error:', err);
      res.status(500).json({ message: 'Failed to load bookings.' });
    }
  },

  async cancelBooking(req, res) {
    try {
      const result = await BookingService.cancelBooking(req.params.id, req.user.id);
      res.json(result);
    } catch (err) {
      console.error('cancelBooking error:', err);
      res.status(err.status || 500).json({ message: err.message || 'Cancellation failed.' });
    }
  },

  async getUserStats(req, res) {
    try {
      const stats = await UserModel.getStats(req.user.id);
      res.json(stats);
    } catch (err) {
      console.error('getUserStats error:', err);
      res.status(500).json({ message: 'Failed to load stats.' });
    }
  },

  async getUserProfile(req, res) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found.' });
      res.json(user);
    } catch (err) {
      console.error('getUserProfile error:', err);
      res.status(500).json({ message: 'Failed to load profile.' });
    }
  },

  async getWishlist(req, res) {
    try {
      const { limit } = req.query;
      let query = `SELECT w.movie_id, m.title, m.poster_url
                   FROM wishlist w JOIN movies m ON w.movie_id = m.id
                   WHERE w.user_id = ? ORDER BY w.created_at DESC`;
      if (limit) query += ` LIMIT ${parseInt(limit)}`;
      const [rows] = await db.query(query, [req.user.id]);
      res.json(rows);
    } catch (err) {
      console.error('getWishlist error:', err);
      res.status(500).json({ message: 'Failed to load wishlist.' });
    }
  },

  async removeWishlist(req, res) {
    try {
      await db.query('DELETE FROM wishlist WHERE user_id = ? AND movie_id = ?', [req.user.id, req.params.movieId]);
      res.json({ message: 'Removed from wishlist.' });
    } catch (err) {
      console.error('removeWishlist error:', err);
      res.status(500).json({ message: 'Failed to remove from wishlist.' });
    }
  },

  async initiatePayment(req, res) {
    try {
      const result = await PaymentService.initiatePayment({
        ...req.body,
        totalAmount: req.body.total_amount
      });
      res.json(result);
    } catch (err) {
      console.error('initiatePayment error:', err);
      res.status(err.status || 500).json({ message: err.message || 'Payment failed.' });
    }
  },

  async verifyPromo(req, res) {
    try {
      const { code, showId, total } = req.body;
      const result = await PaymentService.verifyPromo(code, showId, total);
      res.json(result);
    } catch (err) {
      console.error('verifyPromo error:', err);
      res.status(500).json({ message: 'Promo verification failed.' });
    }
  },

  async verifyUpi(req, res) {
    try {
      const { upiId } = req.query;
      const result = await PaymentService.verifyUpi(upiId);
      res.json(result);
    } catch (err) {
      console.error('verifyUpi error:', err);
      res.status(500).json({ message: 'UPI verification failed.' });
    }
  },

  async releaseSeats(req, res) {
    // Called via sendBeacon when user leaves the page
    res.status(200).end();
  },

  async getTicketPdf(req, res) {
    // In production, generate a PDF ticket
    // For now, return a simple text response
    res.status(200).json({ message: 'Ticket download not yet implemented.' });
  }
};

module.exports = BookingController;
