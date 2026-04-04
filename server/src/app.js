const express = require('express');
const cors = require('cors');
const path = require('path');
const { apiLimiter } = require('./middleware/rateLimit.middleware');

// Routes
const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes');
const bookingRoutes = require('./routes/booking.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// ── Middleware ────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api', apiLimiter);

// ── Static files — serve the frontend ──
app.use(express.static(path.join(__dirname, '../../client/public')));
app.use('/assets', express.static(path.join(__dirname, '../../client/assets')));

// ── API Routes ───────────────────────
app.use('/api/auth', authRoutes);
app.use('/api', movieRoutes);
app.use('/api', bookingRoutes);
app.use('/api/admin', adminRoutes);

// ── Health check ─────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── SPA fallback for HTML pages ──────
app.get('*.html', (req, res) => {
  const htmlFile = path.join(__dirname, '../../client/public', req.path);
  res.sendFile(htmlFile, (err) => {
    if (err) res.status(404).send('Page not found');
  });
});

// Root redirect to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

// ── Error handling ───────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

module.exports = app;
