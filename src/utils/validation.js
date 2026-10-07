const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,16}$/;

// Minimum strength score required to create an account (0–4).
const MIN_SIGNUP_SCORE = 3;

export const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (value) => value.length >= 8 },
  { id: "case", label: "Upper & lowercase letters", test: (value) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { id: "number", label: "At least one number", test: (value) => /\d/.test(value) },
  { id: "symbol", label: "At least one symbol", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

/**
 * Scores a password from 0 to 4 based on how many rules it passes.
 * Length is a hard gate: a short password can never score above 1.
 */
export function getPasswordStrength(password) {
  const passed = PASSWORD_RULES.filter((rule) => rule.test(password)).map((rule) => rule.id);
  const score = passed.includes("length") ? passed.length : Math.min(passed.length, 1);

  return { score, passed };
}

/**
 * Returns an object with an error message for every invalid field.
 * Errors are derived from the current values on every render,
 * so they never need to be stored in state.
 */
export function validate(values, mode) {
  const errors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address, like name@example.com.";
  }

  if (mode === "login") {
    if (!values.password) errors.password = "Password is required.";
    return errors;
  }

  const username = values.username.trim();

  if (!username) {
    errors.username = "Username is required.";
  } else if (!USERNAME_PATTERN.test(username)) {
    errors.username = "Use 3–16 letters, numbers or underscores.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (getPasswordStrength(values.password).score < MIN_SIGNUP_SCORE) {
    errors.password = "Choose a stronger password — meet at least 3 of the requirements.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match.";
  }

  return errors;
}
