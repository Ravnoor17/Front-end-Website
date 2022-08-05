import React from "react";
import Spinner from "react-bootstrap/Spinner";
import logo from "../Assets/kashti travels.png";

import "../Styles/LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="loading-screen-main">
      <img src={logo} alt="logo" />
      <p>Please wait, your requested data is being loaded.</p>
      <div className="loading-screen-spinners-div">
        <Spinner className="loading-screen-spinner" animation="grow" />
        <Spinner className="loading-screen-spinner" animation="grow" />
        <Spinner className="loading-screen-spinner" animation="grow" />
      </div>
    </div>
  );
}

export default LoadingScreen;
