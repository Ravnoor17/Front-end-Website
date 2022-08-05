import React from "react";
import "../Styles/Landingcard.css";
import Img from "../Assets/Landing/p3.jpg";

const landingcard = () => {
  var y = "Pangarchulla Adventure & Camps";
  var x =
    "he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested";
  return (
    <div>
      <div className="landing-card-div">
        <div
          className="landing-card-img"
          style={{ backgroundImage: `url({../Assests/Landing/p1.jpg})` }}
        >
          <img src={Img} />
        </div>
        <div className="landing-card-content">
          <ul>
            <li>{y.substring(0, 29)}</li>
            <li>Rs5,000</li>
          </ul>
          <div>
            <p>{x.substring(0, 70)} ...</p>
          </div>
          <div className="explore">
            <h5>Explore</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default landingcard;
