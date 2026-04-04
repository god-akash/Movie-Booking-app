const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.use(authMiddleware, adminMiddleware);

router.get('/stats', AdminController.getDashboardStats);
router.get('/bookings', AdminController.getBookings);
router.get('/top-shows', AdminController.getTopShows);
router.get('/revenue-chart', AdminController.getRevenueChart);
router.patch('/bookings/:id/status', AdminController.updateBookingStatus);
router.delete('/bookings/:id', AdminController.deleteBooking);
router.post('/shows', AdminController.createShow);

module.exports = router;
