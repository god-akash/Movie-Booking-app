const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Bookings
router.post('/bookings', authMiddleware, BookingController.createBooking);
router.get('/bookings/summary', authMiddleware, BookingController.getBookingSummary);
router.post('/bookings/release', BookingController.releaseSeats);
router.delete('/bookings/:id', authMiddleware, BookingController.cancelBooking);
router.get('/bookings/:id/ticket-pdf', authMiddleware, BookingController.getTicketPdf);

// Payments
router.post('/payments/initiate', authMiddleware, BookingController.initiatePayment);
router.post('/payments/verify-promo', authMiddleware, BookingController.verifyPromo);
router.get('/payments/verify-upi', authMiddleware, BookingController.verifyUpi);

// User
router.get('/users/me', authMiddleware, BookingController.getUserProfile);
router.get('/users/me/stats', authMiddleware, BookingController.getUserStats);
router.get('/users/me/bookings', authMiddleware, BookingController.getUserBookings);
router.get('/users/me/wishlist', authMiddleware, BookingController.getWishlist);
router.delete('/users/me/wishlist/:movieId', authMiddleware, BookingController.removeWishlist);

module.exports = router;
