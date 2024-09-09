import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
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
          <h1 className="form__h">Sign Up</h1>
          <form className="form">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="you@example.com" id="email" />
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="username" id="username" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="password" id="password" />
            </div>

            <button>Sign Up</button>
          </form>

          <div className="sec-container">
            Already a member?{" "}
            <Link to={"/login"} className="sec-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
