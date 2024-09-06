import React from "react";
import "./HomeScreen.css";
import Nav from "../Navbar/Nav";
import Banner from "../Banner/Banner";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
    </div>
  );
};

export default HomeScreen;
