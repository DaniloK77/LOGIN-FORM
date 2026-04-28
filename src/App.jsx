import { useNavigate } from "react-router-dom";
import LoginSignUP from "./Components/LogInSignIn/LoginSignUP";

const App = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = (user) => {
    console.log("Ulogovan:", user);
    navigate("/dashboard");
  };

  return <LoginSignUP onAuthSuccess={handleAuthSuccess} />;
};