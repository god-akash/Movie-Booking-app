const db = require('../config/db');

const PaymentModel = {
  async create({ bookingId, method, amount, status = 'pending', transactionId, cardLast4 }) {
    const txnId = transactionId || `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const [result] = await db.query(
      'INSERT INTO payments (booking_id, method, amount, status, transaction_id, card_last4) VALUES (?, ?, ?, ?, ?, ?)',
      [bookingId, method, amount, status, txnId, cardLast4 || null]
    );
    return { id: result.insertId, transactionId: txnId };
  },

  async findByBookingId(bookingId) {
    const [rows] = await db.query('SELECT * FROM payments WHERE booking_id = ?', [bookingId]);
    return rows[0] || null;
  },

  async updateStatus(id, status) {
    await db.query('UPDATE payments SET status = ? WHERE id = ?', [status, id]);
  }
};

module.exports = PaymentModel;
