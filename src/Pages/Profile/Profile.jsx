import React, { useEffect, useState } from "react";
import "./Profile.css";
import logo from "../../assets/logo.png";
import profile_img from "../../assets/profile_img.png";
import avatar3 from "../../assets/avatar3.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="profileScreen">
      <div className="nav__contents">
        <div className="nav-left">
          <img src={logo} alt="Netflix_logo" onClick={() => navigate("/")} />
        </div>

        <div className="nav-right">
          <div className="nav-profile">
            <img src={profile_img} alt="profile_img" className="profile" />
          </div>
        </div>
      </div>

      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img src={avatar3} alt="" />
          <div className="profileScreen__details">
            {user ? (
              <h2>
                <span className="profileScreen__details__span">Hii</span>
                {user.email}
              </h2>
            ) : (
              <h2>you@example.com</h2>
            )}
            <div className="profileScreen__plans">
              <h3>Plans</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
