import React from "react";
import "./AuthPage.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../../components/Footer/Footer";

const AuthPage = () => {
  return (
    <div
      className="auth-bg"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)),url("/hero.png")`,
        backgroundPosition: "center",
      }}
    >
      <header className="auth__header">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="logo"
            className="netflix_signup_logo"
          />
        </Link>

        <Link to={"/login"} className="auth__link">
          Sign In
        </Link>
      </header>

      <div className="hero">
        <h1>Unlimited movies, Tv shows, and more</h1>
        <p className="hero__fist">Watch anywhere. Cancel anytime.</p>
        <p className="hero__sec">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form className="auth__form">
          <input type="email" placeholder="Email address" />
          <button>
            Get Started <IoIosArrowForward />
          </button>
        </form>
      </div>

      <div className="separator" aria-hidden="true" />

      <div className="first__section">
        <div className="first_section_container">
          <div className="first_section_left">
            <h2>Enjoy on your Tv</h2>
            <p>
              Watch pn Smart Tvs, PlayStation, Xbox, Chromecast, Apple Tv,
              Blu-ray players, and More.
            </p>
          </div>
          <div className="first_section_right">
            <img src="/tv.png" alt="tv_logo" className="first_section_img" />
            <video
              className="first_section_video"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="separator" aria-hidden="true" />

      <div className="second__section">
        <div className="first_section_container">
          <div className="left-side">
            <div className="left-side-div">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things Img"
                className="left-side-div-img"
              />
              <div className="stranger-sm">
                <img
                  src="/stranger-things-sm.png"
                  alt="image"
                  className="stranger-sm-img"
                />
                <div className="second__section__dwn">
                  <div className="second__section__dwn__child">
                    <span className="st">Stranger Things</span>
                    <span className="downloading">Downloading...</span>
                  </div>

                  <img
                    src="/download-icon.gif"
                    alt="dwnld-icon"
                    className="dwnld_gif"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right--side">
            <h2 className="right--side--h">
              Download your shows to watch offline
            </h2>
            <p className="right--side--p">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      <div className="separator" aria-hidden="true" />

      <div className="first__section">
        <div className="first_section_container">
          <div className="first_section_left">
            <h2>Watch everywhere</h2>
            <p>
              Stream unlimited movies and Tv shows on your phone, tablet,
              laptop, and Tv.
            </p>
          </div>
          <div className="first_section_right second--right">
            <img
              src="/device-pile.png"
              alt="Device_Image"
              className="first_section_img"
            />
            <video
              className="first_section_video second-video"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="separator" aria-hidden="true" />

      <div className="fourthSection">
        <div className="fourthSection__container">
          <div className="fourthSectionImg">
            <img
              src="/kids.png"
              alt="Enjoy on your Tv"
              className="fourthSectionImgs"
            />
          </div>

          <div className="fourthSection-right">
            <h2 className="fourthSection-h">Create profiles for kids</h2>
            <p className="fourthSection-p">
              Send kids on adventures with their favorite characters in a space
              made just for them-free with your membership
            </p>
          </div>
        </div>
      </div>

      <div className="separator" aria-hidden="true" />

      <div className="fivthFooter">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AuthPage;
