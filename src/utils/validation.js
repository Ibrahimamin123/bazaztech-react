const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()]{7,20}$/;

export const validateEmail = (email) => {
  if (!email?.trim()) return "Email is required.";
  if (!EMAIL_RE.test(email.trim())) return "Enter a valid email address.";
  return "";
};

export const validatePassword = (password, { minLength = 6, required = true } = {}) => {
  if (!password) return required ? "Password is required." : "";
  if (password.length < minLength) return `Password must be at least ${minLength} characters.`;
  return "";
};

export const validateRequired = (value, label = "This field") => {
  if (value === undefined || value === null || String(value).trim() === "") {
    return `${label} is required.`;
  }
  return "";
};

export const validatePhone = (phone, { required = false } = {}) => {
  if (!phone?.trim()) return required ? "Phone number is required." : "";
  if (!PHONE_RE.test(phone.trim())) return "Enter a valid phone number.";
  return "";
};

export const validateMaxLength = (value, max, label = "This field") => {
  if (value && String(value).length > max) {
    return `${label} must be ${max} characters or less.`;
  }
  return "";
};

export const validateImageFile = (file, { maxSizeMB = 5 } = {}) => {
  if (!file) return "";
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
  if (!allowed.includes(file.type)) return "Only JPEG, PNG, GIF, WebP, or SVG images are allowed.";
  if (file.size > maxSizeMB * 1024 * 1024) return `Image must be smaller than ${maxSizeMB}MB.`;
  return "";
};

export const collectErrors = (checks) => {
  const errors = {};
  checks.forEach(({ field, message }) => {
    if (message) errors[field] = message;
  });
  return errors;
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;
