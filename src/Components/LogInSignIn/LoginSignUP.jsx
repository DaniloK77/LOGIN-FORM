import { useState, useEffect } from "react";
import userIcon from "../Assets/person.png";
import emailIcon from "../Assets/email.png";
import passwordIcon from "../Assets/password.png";
import "./LoginSignUP.css";

// ============================================================
// KONFIGURACIJA — promijeni URL kad deployas na produkciju
// ============================================================
const API_BASE = "http://localhost:4000/api";

// Helper funkcija za sve authenticated API pozive
// Koristi se poslije logina (npr. fetch podataka dashboarda)
export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("auth_token");
  return fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};

// ============================================================
// GLAVNA KOMPONENTA
// ============================================================
const LoginSignUP = ({ onAuthSuccess }) => {
  // --- UI state ---
  const [mode, setMode] = useState("signup");
  const [showUsername, setShowUsername] = useState(true);

  // --- Form polja ---
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- Validacijske greške ---
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // --- API state ---
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Sakrij/prikaži username polje pri promjeni moda
  useEffect(() => {
    setShowUsername(mode === "signup");
    // Resetuj greške kad se mijenja mod
    setServerError("");
    setSuccessMessage("");
    setEmailError("");
    setUsernameError("");
    setConfirmPasswordError("");
  }, [mode]);

  // ============================================================
  // VALIDACIJE (lokalne, bez API poziva)
  // ============================================================

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setEmailError("Unesite validan email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9]{0,8}$/;
    if (!regex.test(value)) {
      setUsernameError("Username može imati max 8 karaktera i samo slova i brojeve");
      return false;
    }
    if (value.length === 0) {
      setUsernameError("Username je obavezan");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError("Lozinke se ne poklapaju");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const checkPasswordStrength = (value) => {
    if (value.length < 6) setPasswordStrength("Slaba lozinka");
    else if (value.length <= 10) setPasswordStrength("Srednja lozinka");
    else if (value.length <= 15) setPasswordStrength("Jaka lozinka");
    else setPasswordStrength("Preduga lozinka (max 15 karaktera)");
  };

  // ============================================================
  // API POZIVI
  // ============================================================

  const registerUser = async () => {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Phoenix/Guardian vraća greške u obliku { error: "..." } ili { errors: {...} }
      throw new Error(data.error || data.message || "Registracija neuspješna");
    }

    return data; // { token: "eyJ...", user: { id, email, username } }
  };

  const loginUser = async () => {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Pogrešan email ili lozinka");
    }

    return data; // { token: "eyJ...", user: { id, email, username } }
  };

  // ============================================================
  // SUBMIT HANDLER — centralno mjesto za logiku
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    // 1. Lokalna validacija prije API poziva
    const emailOk = validateEmail(email);
    const usernameOk = mode === "signup" ? validateUsername(username) : true;
    const confirmOk = mode === "signup" ? validateConfirmPassword(confirmPassword) : true;

    if (!emailOk || !usernameOk || !confirmOk) return;

    if (password.length < 6) {
      setServerError("Lozinka mora imati najmanje 6 karaktera");
      return;
    }

    // 2. API poziv
    setLoading(true);
    try {
      let result;

      if (mode === "signup") {
        result = await registerUser();
        setSuccessMessage("Nalog uspješno kreiran! Preusmjeravamo vas...");
      } else {
        result = await loginUser();
        setSuccessMessage("Uspješno ste se prijavili!");
      }

      // 3. Sačuvaj token i podatke o useru
      localStorage.setItem("auth_token", result.token);
      localStorage.setItem("auth_user", JSON.stringify(result.user));

      // 4. Obavijesti parent komponentu (App.jsx) da je auth uspješan
      //    Parent može uraditi navigate("/dashboard") ili promijeniti state
      if (onAuthSuccess) {
        setTimeout(() => onAuthSuccess(result.user), 800);
      }

    } catch (err) {
      // Prikaži grešku sa servera korisniku
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // JSX
  // ============================================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {mode === "signup" ? "Sign Up" : "Login"}
        </h2>

        {/* Toggle Login / Sign Up */}
        <div className="flex mb-6 justify-center gap-4">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${mode === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${mode === "signup"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* Greška sa servera */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{serverError}</p>
          </div>
        )}

        {/* Poruka o uspjehu */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Username polje — samo za Sign Up */}
          {showUsername && (
            <>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition duration-500">
                <img src={userIcon} alt="User" className="w-6 h-6 mr-3" />
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    validateUsername(e.target.value);
                  }}
                />
              </div>
              {usernameError && (
                <p className="text-red-500 text-sm">{usernameError}</p>
              )}
            </>
          )}

          {/* Email polje */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
            <img src={emailIcon} alt="Email" className="w-6 h-6 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
          </div>
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          {/* Password polje */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
            <img src={passwordIcon} alt="Password" className="w-6 h-6 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
            />
          </div>

          {/* Indikator jačine lozinke */}
          {password && (
            <p
              className={`text-sm ${passwordStrength === "Slaba lozinka"
                  ? "text-red-500"
                  : passwordStrength === "Srednja lozinka"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
            >
              {passwordStrength}
            </p>
          )}

          {/* Potvrda lozinke — samo za Sign Up */}
          {showUsername && (
            <>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
                <img src={passwordIcon} alt="Confirm Password" className="w-6 h-6 mr-3" />
                <input
                  type="password"
                  placeholder="Potvrdi lozinku"
                  className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value);
                  }}
                />
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              )}
            </>
          )}

          {/* Submit dugme */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${loading
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {loading
              ? (mode === "signup" ? "Registrovanje..." : "Prijavljivanje...")
              : (mode === "signup" ? "Sign Up" : "Login")
            }
          </button>

          {/* Zaboravljena lozinka — samo za Login */}
          {mode === "login" && (
            <p className="text-center text-sm text-gray-500 mt-2">
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => alert("TODO: implementirati reset lozinke")}
              >
                Zaboravili ste lozinku?
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginSignUP;