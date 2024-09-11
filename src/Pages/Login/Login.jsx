import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { logIn, signUp } from "../../config/firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await logIn(email, password);
    } else {
      await signUp(name, email, password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="netflix_spinner" />
    </div>
  ) : (
    <div
      className="hero-bg"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)),url("/background_banner.jpg")`,
        backgroundPosition: "center",
      }}
    >
      <header className="signup__header">
        <img
          src="/netflix-logo.png"
          alt="logo"
          className="netflix_signup_logo"
          onClick={() => navigate("/authpage")}
        />
      </header>

      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <div>
              <label htmlFor="username">UserName*</label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}
          <div>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="current-password">Password*</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              autoComplete="current-password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleClick} type="submit">
            {signState}
          </button>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account??
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
