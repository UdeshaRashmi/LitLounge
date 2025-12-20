// Shared validation utilities
export function capitalizeWords(input = '') {
  return input
    .split(' ')
    .map(w => w.trim())
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function isFutureDate(dateString) {
  if (!dateString) return false;
  const d = new Date(dateString);
  const today = new Date();
  // Normalize time portion
  d.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  return d > today;
}

export function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone = '') {
  return /^[\+]?[1-9][\d\s\-\(\)\.]{8,}$/.test(phone);
}

export default {
  capitalizeWords,
  isFutureDate,
  isValidEmail,
  isValidPhone
};
