import React, { useEffect, useState } from "react";
import "./Nav.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import profile_img from "../../assets/profile_img.png";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { logOut } from "../../config/firebase";

const Nav = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <div className="nav-left">
          <Link to={"/"} className="nav-left">
            <img src={logo} alt="Netflix_logo" />
          </Link>
          <ul>
            <li>Home</li>
            <li>Tv Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>

        <div className="nav-right">
          <img src={search_icon} alt="search_icon" className="icons" />

          <div className="nav-profile">
            <img src={profile_img} alt="profile_img" className="profile" />
            <div className="hover">
              <LuLogOut
                onClick={() => {
                  logOut();
                }}
                className="nav-profile-logout-icon"
                size={25}
              />
              <p className="nav-profile-logout">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
