import React, { useState } from "react";
import "./Plan.css";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaTv } from "react-icons/fa";
import { BsLaptopFill } from "react-icons/bs";
import { TbDeviceIpadHorizontal } from "react-icons/tb";

const Plan = () => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="planScreen">
      <div className="planScreen__plan">
        <p className="planScreen__p">Premium 4K + HDR</p>
        <p className="planScreen__p">Standard 1080p</p>
        <p className="planScreen__p">Basic 720p</p>
        <p className="planScreen__p">Mobile 480p</p>
      </div>

      <div className="icons-container">
        <div className="icons">
          <div className="icons_first">
            <FaTv size={24} />
            <BsLaptopFill size={24} />
            <TbDeviceIpadHorizontal size={24} />
            <IoPhonePortraitOutline size={24} />
          </div>
        </div>

        <div className="icons">
          <div className="icons_first">
            <BsLaptopFill size={24} />
            <TbDeviceIpadHorizontal size={24} />
            <IoPhonePortraitOutline size={24} />
          </div>
        </div>

        <div className="icons">
          <div className="icons_first">
            <TbDeviceIpadHorizontal size={24} />
            <IoPhonePortraitOutline size={24} />
          </div>
        </div>

        <div className="icons">
          <div className="icons_first">
            <IoPhonePortraitOutline size={24} />
          </div>
        </div>
      </div>

      <div className="subscribe">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            className={`subscribe_btn ${
              clickedIndex === index ? "clicked" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {clickedIndex === index ? "Subscribed" : "Subscribe"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Plan;
