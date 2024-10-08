import { useEffect, useState } from "react";
import "./Nav.css";
import logo from "../../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import profile_img from "../../assets/profile_img.png";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { logOut } from "../../config/firebase";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleLogout = async () => {
    setLoading(true);
    logOut();
    setLoading(false);
  };

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <div className="nav-left">
          <img
            src={logo}
            alt="Netflix logo"
            onClick={() => navigate("/")}
            aria-label="Home"
          />
          <ul>
            <li onClick={() => navigate("/")} aria-label="Home">
              Home
            </li>
            <li onClick={() => navigate("/tvshows")} aria-label="TV Shows">
              Tv Shows
            </li>
            <li onClick={() => navigate("/movies")} aria-label="Movies">
              Movies
            </li>
            <li onClick={() => navigate("/popular")} aria-label="New & Popular">
              New & Popular
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <div className="nav-profile">
            <FiSearch
              className="search_icon"
              onClick={() => navigate("/search")}
              size={30}
              aria-label="Search"
            />
            <img
              src={profile_img}
              alt="Profile"
              className="profile"
              onClick={() => navigate("/profile")}
            />
            <div className="hover">
              <LuLogOut
                onClick={handleLogout}
                className="nav-profile-logout-icon"
                size={25}
                aria-label="Logout"
              />
              {loading ? (
                <p className="loading">Logging out...</p>
              ) : (
                <p className="nav-profile-logout">Logout</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
