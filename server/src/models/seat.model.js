const db = require('../config/db');

const SeatModel = {
  async getByShowId(showId) {
    const [rows] = await db.query(
      'SELECT seat_label, row_label, seat_number, tier, status, price FROM seats WHERE show_id = ?',
      [showId]
    );
    return rows;
  },

  async getBookedSeats(showId) {
    const [rows] = await db.query(
      `SELECT seat_label FROM seats WHERE show_id = ? AND status = 'booked'`,
      [showId]
    );
    return rows.map(r => r.seat_label);
  },

  async bookSeats(showId, seatLabels) {
    if (!seatLabels.length) return;
    const placeholders = seatLabels.map(() => '?').join(',');
    await db.query(
      `UPDATE seats SET status = 'booked' WHERE show_id = ? AND seat_label IN (${placeholders}) AND status = 'available'`,
      [showId, ...seatLabels]
    );
  },

  async releaseSeats(showId, seatLabels) {
    if (!seatLabels.length) return;
    const placeholders = seatLabels.map(() => '?').join(',');
    await db.query(
      `UPDATE seats SET status = 'available' WHERE show_id = ? AND seat_label IN (${placeholders})`,
      [showId, ...seatLabels]
    );
  },

  async generateSeatsForShow(showId, rows) {
    const existing = await this.getByShowId(showId);
    if (existing.length > 0) return;

    const defaultRows = rows || [
      { id: 'A', type: 'vip', price: 500, seats: 8 },
      { id: 'B', type: 'standard', price: 300, seats: 8 },
      { id: 'C', type: 'standard', price: 300, seats: 9 },
      { id: 'D', type: 'standard', price: 300, seats: 8 },
      { id: 'E', type: 'standard', price: 300, seats: 10 },
      { id: 'F', type: 'economy', price: 200, seats: 12 }
    ];

    const values = [];
    for (const row of defaultRows) {
      for (let i = 1; i <= row.seats; i++) {
        values.push([showId, `${row.id}${i}`, row.id, i, row.type, 'available', row.price]);
      }
    }

    if (values.length) {
      await db.query(
        'INSERT INTO seats (show_id, seat_label, row_label, seat_number, tier, status, price) VALUES ?',
        [values]
      );
    }
  }
};

module.exports = SeatModel;
