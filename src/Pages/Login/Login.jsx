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
    <>
      {signIn ? (
        <AuthPage />
      ) : (
        <>
          <header className="signup__header">
            <img
              src="/netflix-logo.png"
              alt="logo"
              className="netflix_signup_logo"
              onClick={() => setSignIn(true)}
            />
          </header>

          <div className="login-form">
            <h1>{signState}</h1>
            <form>
              {signState === "Sign Up" ? (
                <div>
                  <input
                    type="text"
                    placeholder="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              ) : (
                <></>
              )}
              <div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
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
        </>
      )}
    </>
  );
};

export default Login;
