const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movie.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes (require auth since frontend checks token)
router.get('/movies/featured', authMiddleware, MovieController.getFeatured);
router.get('/movies/trending', authMiddleware, MovieController.getTrending);
router.get('/movies/slug/:slug', authMiddleware, MovieController.getMovieBySlug);
router.get('/movies/:id', authMiddleware, MovieController.getMovieById);
router.get('/movies/:id/shows', authMiddleware, MovieController.getShows);
router.get('/movies/:id/reviews', authMiddleware, MovieController.getReviews);
router.get('/movies', authMiddleware, MovieController.getMovies);

// Shows
router.get('/shows/:id/seats', authMiddleware, MovieController.getShowSeats);

// Events
router.get('/events', authMiddleware, MovieController.getEvents);

module.exports = router;
