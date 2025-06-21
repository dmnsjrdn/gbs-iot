import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import "../styles/LoginStyles.css";

function Login() {
  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-box">
        <h2>Garbage Monitoring System</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
