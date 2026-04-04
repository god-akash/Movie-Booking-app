const AuthService = require('../services/auth.service');

const AuthController = {
  async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message || 'Registration failed.' });
    }
  },

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message || 'Login failed.' });
    }
  }
};

module.exports = AuthController;
