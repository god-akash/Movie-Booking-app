const MovieModel = require('../models/movie.model');
const SeatModel = require('../models/seat.model');
const db = require('../config/db');

const MovieController = {
  async getFeatured(req, res) {
    try {
      const movies = await MovieModel.getFeatured();
      res.json(movies);
    } catch (err) {
      console.error('getFeatured error:', err);
      res.status(500).json({ message: 'Failed to load featured movies.' });
    }
  },

  async getMovies(req, res) {
    try {
      const { status = 'now_showing', type } = req.query;
      const movies = await MovieModel.getByStatus(status, type);
      res.json(movies);
    } catch (err) {
      console.error('getMovies error:', err);
      res.status(500).json({ message: 'Failed to load movies.' });
    }
  },

  async getTrending(req, res) {
    try {
      const movies = await MovieModel.getTrending();
      res.json(movies);
    } catch (err) {
      console.error('getTrending error:', err);
      res.status(500).json({ message: 'Failed to load trending movies.' });
    }
  },

  async getMovieById(req, res) {
    try {
      const movie = await MovieModel.getById(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found.' });
      res.json(movie);
    } catch (err) {
      console.error('getMovieById error:', err);
      res.status(500).json({ message: 'Failed to load movie.' });
    }
  },

  async getMovieBySlug(req, res) {
    try {
      const movie = await MovieModel.getBySlug(req.params.slug);
      if (!movie) return res.status(404).json({ message: 'Movie not found.' });
      res.json(movie);
    } catch (err) {
      console.error('getMovieBySlug error:', err);
      res.status(500).json({ message: 'Failed to load movie.' });
    }
  },

  async getShows(req, res) {
    try {
      const { date } = req.query;
      const movieId = req.params.id;
      if (!date) return res.status(400).json({ message: 'Date parameter required.' });
      const shows = await MovieModel.getShows(movieId, date);
      
      // Auto-generate seats for shows that don't have them
      for (const venue of shows) {
        for (const showtime of venue.showtimes) {
          await SeatModel.generateSeatsForShow(showtime.show_id);
        }
      }
      
      res.json(shows);
    } catch (err) {
      console.error('getShows error:', err);
      res.status(500).json({ message: 'Failed to load shows.' });
    }
  },

  async getReviews(req, res) {
    try {
      const data = await MovieModel.getReviews(req.params.id);
      res.json(data);
    } catch (err) {
      console.error('getReviews error:', err);
      res.status(500).json({ message: 'Failed to load reviews.' });
    }
  },

  async getShowSeats(req, res) {
    try {
      const showId = req.params.id;
      // Generate seats if needed
      await SeatModel.generateSeatsForShow(showId);
      const bookedSeats = await SeatModel.getBookedSeats(showId);
      res.json({ bookedSeats });
    } catch (err) {
      console.error('getShowSeats error:', err);
      res.status(500).json({ message: 'Failed to load seats.' });
    }
  },

  async getEvents(req, res) {
    try {
      const { status = 'upcoming' } = req.query;
      const [rows] = await db.query(
        'SELECT id, title, type, banner_url, event_date as date, time, venue, price, description FROM events WHERE status = ? ORDER BY event_date ASC',
        [status]
      );
      res.json(rows);
    } catch (err) {
      console.error('getEvents error:', err);
      res.status(500).json({ message: 'Failed to load events.' });
    }
  }
};

module.exports = MovieController;
