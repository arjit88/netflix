import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="hero-bg"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)),url("hero.png")`,
        backgroundPosition: "center",
      }}
    >
      <header className="signup__header">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="logo"
            className="netflix_signup_logo"
          />
        </Link>
      </header>

      <div className="form__main__container">
        <div className="form__container">
          <h1 className="form__h">Login</h1>
          <form className="form">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="you@example.com" id="email" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="password" id="password" />
            </div>

            <button>Login</button>
          </form>

          <div className="sec-container">
            Don't have an account?{" "}
            <Link to={"/signup"} className="sec-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
