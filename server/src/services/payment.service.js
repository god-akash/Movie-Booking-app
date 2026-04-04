const PaymentModel = require('../models/payment.model');
const BookingModel = require('../models/booking.model');
const db = require('../config/db');

const PaymentService = {
  async initiatePayment({ bookingRef, method, totalAmount, cardLast4 }) {
    let booking = null;
    if (bookingRef) {
      booking = await BookingModel.findById(bookingRef);
    }

    const payment = await PaymentModel.create({
      bookingId: booking ? booking.id : 0,
      method,
      amount: totalAmount,
      status: 'success',
      cardLast4
    });

    if (booking) {
      await db.query('UPDATE bookings SET status = ? WHERE id = ?', ['confirmed', booking.id]);
    }

    return {
      success: true,
      booking_id: booking ? booking.booking_ref : `BK-${Date.now()}`,
      transaction_id: payment.transactionId,
      message: 'Payment successful!'
    };
  },

  async verifyPromo(code, showId, total) {
    const promos = {
      'FIRST50': { discount_percent: 10, max_discount: 200 },
      'CINEBOOK100': { discount_flat: 100 },
      'IMAX20': { discount_percent: 20, max_discount: 500 },
      'WELCOME': { discount_flat: 50 },
    };

    const promo = promos[code.toUpperCase()];
    if (!promo) {
      return { valid: false, message: 'Invalid or expired promo code.' };
    }

    let discount = 0;
    if (promo.discount_flat) {
      discount = promo.discount_flat;
    } else if (promo.discount_percent) {
      discount = Math.round(total * promo.discount_percent / 100);
      if (promo.max_discount) discount = Math.min(discount, promo.max_discount);
    }

    return { valid: true, discount_amount: discount, message: `Promo applied! You save ₹${discount}` };
  },

  async verifyUpi(upiId) {
    if (upiId && /^[\w.\-]+@[\w]+$/.test(upiId)) {
      return { valid: true, message: 'UPI ID verified.' };
    }
    return { valid: false, message: 'Invalid UPI ID.' };
  }
};

module.exports = PaymentService;
