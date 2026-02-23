import { useState, useEffect } from "react";
import userIcon from "../Assets/person.png";
import emailIcon from "../Assets/email.png";
import passwordIcon from "../Assets/password.png";
import "./LoginSignUP.css";

const LoginSignUP = () => {
  const [mode, setMode] = useState("signup"); // signup ili login
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // Animacija za polje username
  const [showUsername, setShowUsername] = useState(true);
  useEffect(() => {
    setShowUsername(mode === "signup");
  }, [mode]);

  // Funkcija za validaciju emaila(provjera ispravnosti formata)
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setEmailError("Unesite validan email");
    } else {
      setEmailError("");
    }
  };

  
  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9]{0,8}$/; 
    if (!regex.test(value)) {
      setUsernameError(
        "Username može imati max 8 karaktera i samo slova i brojeve"
      );
    } else {
      setUsernameError("");
    }
  };

  
  const checkPasswordStrength = (value) => {
    if (value.length < 6) setPasswordStrength("Slaba lozinka");
    else if (value.length <= 10) setPasswordStrength("Srednja lozinka");
    else if (value.length <= 15) setPasswordStrength("Jaka lozinka");
    else setPasswordStrength("Preduga lozinka (max 15 karaktera)");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    validateEmail(email);
    if (mode === "signup") validateUsername(username);
    checkPasswordStrength(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {mode === "signup" ? "Sign Up" : "Login"}
        </h2>
 
        <div className="flex mb-6 justify-center gap-4">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              mode === "login"
                ? "bg-blue-600 text-black"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >Login
            
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              mode === "signup"
                ? "bg-blue-600 text-black"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >Sign Up</button>
        </div>

        
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {showUsername && (
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
          )}
          {usernameError && (
            <p className="text-red-500 text-sm">{usernameError}</p>
          )}

          
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>

          
          {password && (
            <p
              className={`text-sm mt-2 ${
                passwordStrength === "Slaba lozinka"
                  ? "text-red-500"
                  : passwordStrength === "Srednja lozinka"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {passwordStrength}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginSignUP;
