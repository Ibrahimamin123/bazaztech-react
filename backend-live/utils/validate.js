const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-()]{7,20}$/;
const URL_RE =
  /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w\-./?%&=+#~:]*)?$/i;

export const sanitizeString = (value, maxLength = 500) => {
  if (value === undefined || value === null) return "";
  return String(value).trim().slice(0, maxLength);
};

export const validateEmail = (email) => {
  const value = sanitizeString(email, 120);
  if (!value) return { valid: false, message: "Email is required.", value };
  if (!EMAIL_RE.test(value)) return { valid: false, message: "Invalid email format.", value };
  return { valid: true, value };
};

export const validatePassword = (password, { minLength = 6, required = true } = {}) => {
  if (!password) {
    return required
      ? { valid: false, message: "Password is required." }
      : { valid: true };
  }
  if (password.length < minLength) {
    return { valid: false, message: `Password must be at least ${minLength} characters.` };
  }
  return { valid: true };
};

export const validatePhone = (phone, { required = false } = {}) => {
  const value = sanitizeString(phone, 30);
  if (!value) {
    return required
      ? { valid: false, message: "Phone number is required.", value: "" }
      : { valid: true, value: "" };
  }
  if (!PHONE_RE.test(value)) {
    return { valid: false, message: "Invalid phone number.", value };
  }
  return { valid: true, value };
};

export const validateRequired = (value, label, maxLength = 200) => {
  const sanitized = sanitizeString(value, maxLength);
  if (!sanitized) return { valid: false, message: `${label} is required.`, value: "" };
  return { valid: true, value: sanitized };
};

export const validateUrl = (value, label = "URL", { required = false } = {}) => {
  const sanitized = sanitizeString(value, 500);
  if (!sanitized) {
    return required
      ? { valid: false, message: `${label} is required.`, value: "" }
      : { valid: true, value: "" };
  }
  if (!URL_RE.test(sanitized)) {
    return { valid: false, message: `Invalid ${label.toLowerCase()}.`, value: sanitized };
  }
  return { valid: true, value: sanitized };
};

export const validateNumber = (
  value,
  label = "Value",
  { required = false, min, max, integer = false } = {}
) => {
  if (value === undefined || value === null || value === "") {
    return required
      ? { valid: false, message: `${label} is required.` }
      : { valid: true };
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return { valid: false, message: `${label} must be numeric.` };
  if (integer && !Number.isInteger(parsed)) {
    return { valid: false, message: `${label} must be a whole number.` };
  }
  if (min !== undefined && parsed < min) {
    return { valid: false, message: `${label} must be at least ${min}.` };
  }
  if (max !== undefined && parsed > max) {
    return { valid: false, message: `${label} must be ${max} or less.` };
  }
  return { valid: true, value: parsed };
};
