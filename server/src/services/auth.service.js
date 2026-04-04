const UserModel = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const { validateEmail, validatePassword } = require('../utils/validators');

const AuthService = {
  async register({ name, email, phone, password }) {
    if (!name || !email || !password) {
      throw { status: 400, message: 'Name, email, and password are required.' };
    }
    if (!validateEmail(email)) {
      throw { status: 400, message: 'Invalid email address.' };
    }
    if (!validatePassword(password)) {
      throw { status: 400, message: 'Password must be at least 6 characters.' };
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw { status: 409, message: 'An account with this email already exists.' };
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({ name, email, phone, password: hashedPassword });
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
    };
  },

  async login({ email, password }) {
    if (!email || !password) {
      throw { status: 400, message: 'Email and password are required.' };
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw { status: 401, message: 'Invalid email or password.' };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw { status: 401, message: 'Invalid email or password.' };
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return {
      token,
      user: {
        id: user.id, name: user.name, email: user.email,
        phone: user.phone, role: user.role,
        avatar_url: user.avatar_url, is_premium: user.is_premium
      }
    };
  }
};

module.exports = AuthService;
