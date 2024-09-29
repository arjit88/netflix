import React, { useState } from "react";
import "./Login.css";
import { logIn, signUp } from "../../config/firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import AuthPage from "../AuthPage/AuthPage";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        await logIn(email, password);
      } else {
        await signUp(name, email, password);
      }
      // Handle successful sign-in or sign-up
    } catch (error) {
      console.error("Error during authentication:", error);
      // Handle error (show message to user, etc.)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      {signIn ? (
        <AuthPage />
      ) : (
        <>
          <header className="signup__header">
            <img
              src="/netflix-logo.png"
              alt="Netflix Logo"
              className="netflix_signup_logo"
              onClick={() => setSignIn(true)}
            />
          </header>

          <div className="login-form">
            <h1>{signState}</h1>
            <form onSubmit={handleClick}>
              {signState === "Sign Up" && (
                <div>
                  <label htmlFor="name">
                    Name<span className="form__span">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    value={name}
                    id="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label htmlFor="email">
                  Email<span className="form__span">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">
                  Password<span className="form__span">*</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">{signState}</button>
            </form>

            <div className="form-switch">
              {signState === "Sign In" ? (
                <p>
                  New to Netflix?
                  <span onClick={() => setSignState("Sign Up")}> Sign Up</span>
                </p>
              ) : (
                <p>
                  Already have an account?
                  <span onClick={() => setSignState("Sign In")}> Sign In</span>
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
