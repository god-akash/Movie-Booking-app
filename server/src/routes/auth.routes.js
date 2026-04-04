const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { authLimiter } = require('../middleware/rateLimit.middleware');

router.post('/register', authLimiter, AuthController.register);
router.post('/login', authLimiter, AuthController.login);

module.exports = router;
