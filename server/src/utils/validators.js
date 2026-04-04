function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\+?[\d\s\-]{7,15}$/.test(phone);
}

function validatePassword(password) {
  return password && password.length >= 6;
}

function validateRequired(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return { valid: false, message: `${key} is required.` };
    }
  }
  return { valid: true };
}

module.exports = { validateEmail, validatePhone, validatePassword, validateRequired };
