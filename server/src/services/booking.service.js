const BookingModel = require('../models/booking.model');
const SeatModel = require('../models/seat.model');
const db = require('../config/db');

const BookingService = {
  async createBooking({ userId, showId, seats, movieId }) {
    const [showRows] = await db.query('SELECT * FROM shows WHERE id = ?', [showId]);
    if (!showRows[0]) throw { status: 404, message: 'Show not found.' };
    const show = showRows[0];

    await SeatModel.generateSeatsForShow(showId);

    const bookedSeats = await SeatModel.getBookedSeats(showId);
    const unavailable = seats.filter(s => bookedSeats.includes(s));
    if (unavailable.length) {
      throw { status: 409, message: `Seats ${unavailable.join(', ')} are already booked.` };
    }

    const allSeats = await SeatModel.getByShowId(showId);
    let subtotal = 0;
    for (const seatLabel of seats) {
      const seat = allSeats.find(s => s.seat_label === seatLabel);
      subtotal += seat ? parseFloat(seat.price) : parseFloat(show.price_standard);
    }

    const serviceFee = 50;
    const taxes = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + serviceFee + taxes;

    await SeatModel.bookSeats(showId, seats);

    await db.query(
      'UPDATE shows SET available_seats = available_seats - ? WHERE id = ?',
      [seats.length, showId]
    );

    const booking = await BookingModel.create({
      userId, showId, movieId: movieId || show.movie_id,
      seats, subtotal, serviceFee, taxes, totalAmount,
      status: 'pending'
    });

    return {
      bookingId: booking.bookingRef,
      seats,
      subtotal,
      serviceFee,
      taxes,
      total: totalAmount,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    };
  },

  async cancelBooking(bookingRef, userId) {
    const booking = await BookingModel.findById(bookingRef);
    if (!booking) throw { status: 404, message: 'Booking not found.' };

    const success = await BookingModel.cancelBooking(bookingRef, userId);
    if (!success) throw { status: 400, message: 'Cannot cancel this booking.' };

    const seats = typeof booking.seats === 'string' ? JSON.parse(booking.seats) : booking.seats;
    await SeatModel.releaseSeats(booking.show_id, seats);

    await db.query(
      'UPDATE shows SET available_seats = available_seats + ? WHERE id = ?',
      [seats.length, booking.show_id]
    );

    return { message: 'Booking cancelled successfully. Refund will be processed in 5-7 business days.' };
  }
};

module.exports = BookingService;
